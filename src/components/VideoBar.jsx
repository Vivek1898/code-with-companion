// import React, { Component } from "react";
// import Video from "./Video";
// import "../css/VideoBar.css";

// class VideoBar extends Component {
//   render() {
//     return (
//       <div className="scrollmenu">
//         {this.props.peersStream.map((peer) => {
//           return (
//             <Video
//               key={peer.userId}
//               media={peer.stream}
//               height={110}
//               width={160}
//               muted={this.props.userId === peer.userId ? true : false}
//             ></Video>
//           );
//         })}
//       </div>
//     );
//   }
// }
// export default VideoBar;


import React, { Component } from "react";
import Video from "./Video";
import "../css/VideoBar.css";

const VideoBar = ({peersStream,userId}) => {
  console.log("From VideoBar")
  console.log(peersStream)
  console.log("2")
  console.log(userId)
  return (
    <div className="scrollmenu">

      {peersStream.map((peer) => {
        return (
          <Video
            key={peer.userId}
            media={peer.stream}
            height={110}
            width={160}
            muted={userId === peer.userId ? true : false}
          ></Video>
        );
      })}
    </div>
  );
};
export default VideoBar;
