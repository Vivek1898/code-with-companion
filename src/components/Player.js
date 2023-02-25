import React from "react";
function Player({ srcBlob, audio }) {
    if (!srcBlob) {
      return null;
    }
  
    if (audio) {
      return <audio src={URL.createObjectURL(srcBlob)} controls />;
    }
  
    return (
      <video
        src={URL.createObjectURL(srcBlob)}
        width={520}
        height={480}
        controls
      />
    );
  }

  export default Player;    