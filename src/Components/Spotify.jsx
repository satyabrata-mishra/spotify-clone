import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Body from './Body';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useStateProvider } from '../Utils/StateProvider';
import { reducerCases } from '../Utils/Constants';


export default function Spotify() {
    const [{ token, select }, dispatch] = useStateProvider();
    const bodyRef = useRef();
    const [navBg, setnavBg] = useState(false);
    const [headerbg, setheaderbg] = useState(false);
    const bodyScroll = () => {
        bodyRef.current.scrollTop >= 30 ? setnavBg(true) : setnavBg(false);
        bodyRef.current.scrollTop >= 268 ? setheaderbg(true) : setheaderbg(false);
    };
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch("https://api.spotify.com/v1/me", {
                    meathod: "GET",
                    mode: "cors",
                    headers: {
                        Authorization: "Bearer " + token,
                        'Content-Type': "application/json"
                    }
                })
                const json = await response.json();
                const userInfo = {
                    id: json.id,
                    name: json.display_name
                };
                dispatch({ type: reducerCases.SET_USER, userInfo });
            } catch (error) {
                console.log(error.message);
            }
        }
        getUserInfo();
    }, [dispatch, token])

    return (
        <Container>
            <div className="spotifybody">
                <Sidebar />
                <div className="body" ref={bodyRef} onScroll={bodyScroll}>
                    <Navbar navBg={navBg} />
                    <div className="bodycontents">
                        <Body headerbg={headerbg} />
                    </div>
                </div>
            </div>
            <div className="spotifyfooter">
                <Footer />
            </div>
        </Container>
    )
}

const Container = styled.div`
max-width: 100vw;
max-height: 100vh;
overflow: hidden;
display: grid;
grid-template-rows:85vh 15vh ;
.spotifybody{
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgb(0,0,1));
    background-color: rgb(32,87,100);
    .body{
        height: 100%;
        width: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.7rem;
            &-thumb {
            background-color: rgba(255, 255, 255, 0.6);
      }
    }
    }
}
`;