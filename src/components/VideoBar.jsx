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


import React, { Component, useEffect } from "react";
import Video from "./Video";
import "../css/VideoBar.css";

const VideoBar = ({peersStream,userId,username}) => {
  console.log("From VideoBar")
  console.log(peersStream)
  console.log("2")
  console.log(userId)
  const temp=[]
  const newData=[]
//   useEffect(() => {
//     console.log("From VideoBar")
// newData = peersStream.map(el => el.filter(({ date }) => date !== null));
//   }, [])
 
  return (
    <div className="scrollmenu">

      { peersStream.map((peer) => {
        return (
            <>
            <Video
            key={peer.userId}
            media={peer.stream}
            height={110}
            width={160}
            username={peer.user}
            muted={userId === peer.userId ? true : false}
          ></Video>

           
            </>
          
              
        
        );
      })}
    </div>
  );
};
export default VideoBar;
