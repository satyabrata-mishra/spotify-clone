import React from 'react'
import styled from 'styled-components'
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import { useStateProvider } from '../Utils/StateProvider'
import { reducerCases } from '../Utils/Constants'


export default function PlayerControls() {
    const [{ token, playerState }, dispatch] = useStateProvider();
    const changeTrack = async (type) => {
        try {
            const response1 = await fetch(`https://api.spotify.com/v1/me/player/${type}`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({})
            });
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
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
                console.log(currentlyPlaying);
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
            } else {
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        console.log(state);
        const response1 = await fetch(`https://api.spotify.com/v1/me/player/${state}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': "application/json"
            },
        });
        const json = await response1.json();
        console.log(json);
        dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: !playerState,
        });
    };
    return (
        <Container>
            <div className="shuffle">
                <BsShuffle />
            </div>
            <div className="previous" onClick={() => changeTrack("previous")}>
                <CgPlayTrackPrev />
            </div>
            <div className="state">
                {playerState ? <BsFillPauseCircleFill onClick={changeState} /> : <BsFillPlayCircleFill onClick={changeState} />}
            </div>
            <div className="next" onClick={() => changeTrack("next")}>
                <CgPlayTrackNext />
            </div>
            <div className="repeat">
                <FiRepeat />
            </div>
        </Container>
    )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;