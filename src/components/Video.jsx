import PropTypes from "prop-types";
import React from "react";
import "../css/Video.css";

const Video = ({ media, width, height, muted, children,username }) => {
  let videoRef = React.createRef();
  React.useEffect(() => {
    videoRef.current.srcObject = media;
  }, [media]);

  // check for media not null
  // shouldComponentUpdate(props) {
  //   return this.props.media !== props.media;
  // }

  // componentDidUpdate() {
  //   this.video.srcObject = this.props.media;
  // }

  






  return (
    <>
     <video
      height={height}
      width={width}
      muted={muted}
      autoPlay
      ref={videoRef}
      // ref={(video) => {
      //   video = video;
      // }}
    >
      {children}
     
    </video>
    {username}
    
    </>
     
   
  );
};

Video.defaultProps = {
  children: null,
  height: 110,
  width: 160,
  muted: false,
  media: null,
};

Video.propTypes = {
  children: PropTypes.element,
  media: PropTypes.shape({
    active: PropTypes.bool,
    ended: PropTypes.bool,
    id: PropTypes.string,
  }),
  height: PropTypes.number,
  width: PropTypes.number,
  muted: PropTypes.bool,
};

export default Video;
