import React, { useEffect } from 'react'
import styled from 'styled-components'
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider';


export default function CurrentTrack() {
    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
    useEffect(() => {
        const getCurrentTrack = async () => {
            try {
                const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
                    headers: {
                        Authorization: "Bearer " + token,
                        'Content-Type': "application/json"
                    }
                })
                const json = await response.json();
                if (json !== null) {
                    const currentlyPlaying = {
                        id: json.item.id,
                        name: json.item.name,
                        artists: json.item.artists.map((artist) => artist.name),
                        image: json.item.album.images[2].url,
                    };
                    dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
                } else {
                    dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getCurrentTrack();
    }, [token, dispatch])
    return (
        <Container>

            {currentlyPlaying !== null ? (
                <div className="track">
                    <div className="trackimage">
                        <img src={currentlyPlaying.image} alt="currentPlaying" />
                    </div>
                    <div className="trackinfo">
                        <h4 className="trackinfotrackname">{currentlyPlaying.name}</h4>
                        <h6 className="trackinfotrackartists">
                            {currentlyPlaying.artists.join(", ")}
                        </h6>
                    </div>
                </div>
            ) : ""}
        </Container>
    )
}

const Container = styled.div`
    .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    .trackimage {
    }
    .trackinfo {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      .trackinfotrackname {
        color: white;
        font-size: 0.8rem;
      }
      .trackinfotrackartists {
        color: #b3b3b3;
      }
    }
  }
`;