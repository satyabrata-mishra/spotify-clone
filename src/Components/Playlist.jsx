import React, { useEffect } from 'react'
import styled from 'styled-components'
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider'

export default function Playlist() {
    const [{ token, playlists }, dispatch] = useStateProvider();
    useEffect(() => {
        const getPlayListData = async () => {
            try {
                const response = await fetch("https://api.spotify.com/v1/me/playlists", {
                    meathod: "GET",
                    headers:
                    {
                        Authorization: "Bearer "+token,
                        "Content-Type": "application/json"
                    }
                })
                const { items } = await response.json();
                console.log(items);
                const playlists = items.map(({ name, id }) => {
                    return { name, id }
                });
                dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
            } catch (error) {
                console.log(error.message);
            }
        };
        getPlayListData();
    }, [token, dispatch])
    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    };
    return (
        <Container>
            <ul>
                {
                    playlists.map(({ name, id }) => {
                        return (
                            <li key={id} onClick={() => changeCurrentPlaylist(id)}>{name}</li>
                        )
                    })
                }
            </ul>
        </Container>
    )
}

const Container = styled.div`
     color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;