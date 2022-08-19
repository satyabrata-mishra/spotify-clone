import React from 'react'
import styled from 'styled-components'
import {IoLibrary} from 'react-icons/io5';
import {MdHomeFilled,MdSearch} from 'react-icons/md';
import Playlist from './Playlist';
export default function Sidebar() {
  return (
    <Container>
      <div className="toplinks">
        <div className="logo">
          <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="spotify" />
        </div>
        <ul>
          <li><MdHomeFilled/><span>Home</span></li>
          <li><MdSearch/><span>Search</span></li>
          <li><IoLibrary/><span>Library</span></li>
        </ul>
      </div>
      <Playlist/>
    </Container>
  )
}

const Container = styled.div`
    background-color: black;
    color:#b3b3b3;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .toplinks{
      display: flex;
      flex-direction: column;
      .logo{
        text-align: center;
        margin: 1rem 0;
        img{
          max-inline-size: 80%;
          block-size: auto;
        }
      }
      ul{
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        li{
          display: flex;
          gap: 1rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          font-size: 1rem;
          &:hover{
            color: white;
          }
        }
      }
    }
`;