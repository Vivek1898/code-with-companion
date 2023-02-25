import React, { Component, useState } from "react";
import "../css/Header.css";
import { save } from "save-file";

const Header = ({
  onVideoToggle,
  onAudioToggle,
  userId,
  showBoard,
  setShowBoard,
  showEditor,
  setshowEditor,
  onChangeBoard,
  showProblemsPage,
  setShowProblemsPage,
  onProblemPageChange,
  setIsSideDrawerOpen,
  isSideDrawerOpen
}) => {
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
    setShowProblemsPage(false);
    setShowBoard(true);
    setshowEditor(false);
  };
  const handleProblems = () => {
    //
    setIsSideDrawerOpen(!isSideDrawerOpen);
    setShowBoard(false);
    setshowEditor(true);
    setShowProblemsPage(true);
  };

  const handleCode = () => {
    //  setShowProblemsPage(false);
    setshowEditor(true);
    setShowBoard(false);
  };
  return (
    <div className="header">
      <div href="#" className="logo">
        Code With Companion
      </div>
      <button
        className="copy-url"
        onClick={() => {
          // onChangeBoard(!showProblems)
          handleProblems();
        }}
      >
        Problems
      </button>
      <button
        className="copy-url"
        onClick={() => {
          onChangeBoard(!showBoard);
          handleBoard();
        }}
      >
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
          {/* //fa fa-video-camera */}
          <i className={video ? "fa fa-video-slash" : "fa fa-video-camera"}></i>
        </button>
        <button
          className={audio ? "buttonOn" : "buttonOff"}
          onClick={() => {
            onAudioToggle(userId);
            toggleAudioCss();
          }}
        >
          <i
            className={audio ? "fa fa-microphone-slash" : "fa fa-microphone"}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Header;
