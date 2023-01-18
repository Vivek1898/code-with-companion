import React, { Component, useState } from "react";
import "../css/Header.css";
import { save } from "save-file";

const Header = ({ onVideoToggle, onAudioToggle, userId ,showBoard,setShowBoard,showEditor,setshowEditor,onChangeBoard}) => {
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);

  const toggleAudioCss = () => {
    setAudio(!audio);
  };
  const toggleVideoCss = () => {
    setVideo(!video);
  };
  const handleClick = () => {
    window.prompt("ROOM URL", window.location.href);
  };

  const handleBoard = () => {
    // 
    setShowBoard(true);
    setshowEditor(false);

  }

  const handleCode = () => {
    setshowEditor(true);
    setShowBoard(false);
  }
  return (
    <div className="header">
      <div href="#" className="logo">
       Code With Companion
      </div>
      <button className="copy-url" onClick={() =>{
        onChangeBoard(!showBoard)
      handleBoard();
      } }>
        Board
      </button>
      <button className="copy-url" onClick={() => handleCode()}>
      Editor
      </button>
      <button className="copy-url" onClick={() => handleClick()}>
        ROOM URL
      </button>
      <div className="header-right">
        <button
          className={video ? "buttonOn" : "buttonOff"}
          onClick={() => {
            onVideoToggle(userId);
            toggleVideoCss();
          }}
        >
          <i className={video ? "fa fa-video-camera" : "fa fa-video-slash"}></i>
        </button>
        <button
          className={audio ? "buttonOn" : "buttonOff"}
          onClick={() => {
            onAudioToggle(userId);
            toggleAudioCss();
          }}
        >
          <i
            className={audio ? "fa fa-microphone" : "fa fa-microphone-slash"}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Header;
