import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AiFillClockCircle } from 'react-icons/ai'
import { useStateProvider } from '../Utils/StateProvider'
import { reducerCases } from '../Utils/Constants'


export default function Body({ headerbg }) {
  const [{ token, selectedPlaylistId, selectedPlayList }, dispatch] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
          meathod: "GET",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + token,
            'Content-Type': "application/json"
          }
        })
        const json = await response.json();
        const selectedPlayList = {
          id: json.id,
          name: json.name,
          description: json.description.startsWith("<a") ? "" : json.description,
          image: json.images[0].url,
          tracks: json.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[0].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number
          }))
        };
        dispatch({ type: reducerCases.SET_PlAYLIST, selectedPlayList });
      } catch (error) {
        console.log(error.message);
      }
    }
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId])
  const timeConvert = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = ((ms % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? "00" : "" + sec);
  };
  const playTrack = async (id, name, artists, image, context_uri, track_number) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          'Content-Type': "application/json"
        },
      });
      if (response.status === 204) {
        const currentlyPlaying = {
          id, name, artists, image
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {

    }
  };
  return (
    <Container headerbg={headerbg}>
      {
        selectedPlayList && (
          <>
            <div className="playlist">
              <div className="image">
                <img src={selectedPlayList.image} alt="" />
              </div>
              <div className="details">
                <span className='type'>PLAYLISTS</span>
                <h1 className='title'>{selectedPlayList.name}</h1>
                <p className='desc'>{selectedPlayList.description}</p>
              </div>
            </div>
            <div className="list">
              <div className="headerrow">
                <div className="col">
                  <span>#</span>
                </div>
                <div className="col">
                  <span>Title</span>
                </div>
                <div className="col">
                  <span>Album</span>
                </div>
                <div className="col">
                  <span>
                    <AiFillClockCircle />
                  </span>
                </div>
              </div>
              <div className="tracks">
                {
                  selectedPlayList.tracks.map(({ id, name, artists, image, duration, album, context_uri, track_number }, index) => {
                    return (
                      <div className="row" key={id} onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}>
                        <div className="col">
                          <span>{index + 1}</span>
                        </div>
                        <div className="col details">
                          <div className="image">
                            <img src={image} alt="track" />
                          </div>
                          <div className="info">
                            <span className="name">{name}</span>
                            <span className='artistname'>{artists}</span>
                          </div>
                        </div>
                        <div className="col">
                          <span>{album}</span>
                        </div>
                        <div className="col">
                          <span>{timeConvert(duration)}</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </>
        )
      }
    </Container>
  )
}

const Container = styled.div`
  .playlist{
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image{
      img{
        height: 15rem;
        box-shadow: rgba(0,0,0,3) 0px 25px 50px -12px;
      }
    }
    .details{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title{
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list{
    .headerrow{
      display: grid;
      grid-template-columns:  0.3fr 3fr 2fr 0.1fr;
      color: #ddccdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 17vh;
      padding:1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerbg }) =>
    headerbg ? "#000000dc" : "none"};
    }
    .tracks{
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row{
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        border-radius: 10px;
        &:hover{
          background-color: rgba(0,0,0,0.7);
        }
      }
      .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
        .details {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
            .artistname{
              font-size: 0.8rem;
              color: rgba(255, 255, 255,0.6);
            }
          }
        }
    }
  }
`;