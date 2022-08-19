import React from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../Utils/StateProvider';

export default function Volume() {
    const [{ token }] = useStateProvider();
    const setVolume = async (e) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/volume`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': "application/json"
                },
                params: {
                    volume_perecent: parseInt(e.target.value)
                },
                body: JSON.stringify({})
            });
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <Container>
            <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    /* justify-content: flex-end; */
    align-content: center;
    input{
        width: 15rem;
        height: 0.5rem;
        border-radius: 2rem;
    }
`;