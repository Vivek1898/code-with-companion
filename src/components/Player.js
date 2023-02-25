import React from "react";
import { useState } from "react";
import Modal from 'react-modal';
function Player({ srcBlob, audio ,handleSaveVideo}) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
    if (!srcBlob) {
      return null;
    }
  
    if (audio) {
      return <audio src={URL.createObjectURL(srcBlob)} controls />;
    }
 

    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    console.log("Do")
    }
  
    function closeModal() {
      setIsOpen(false);
    }
   
    return (
      <>
      <button onClick={openModal}>Open Modal</button>
      
       <Modal
       isOpen={modalIsOpen}
       onAfterOpen={afterOpenModal}
       onRequestClose={closeModal}
       style={customStyles}
       contentLabel="Example Modal"
     >
           <video
          src={URL.createObjectURL(srcBlob)}
          width={520}
          height={480}
          controls
        />

        <button  onClick={handleSaveVideo}>Save video</button>

        </Modal>
   
      </>
      
    
     
    );
  }

  export default Player;    