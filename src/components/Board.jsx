import React, { useState, useRef, useEffect } from "react";


import Board2 from "./Whiteboard";
// const Board=({socket,user})=>{
//     const canvasRef = useRef(null);
//     const ctxRef = useRef(null);
  
//     const [tool, setTool] = useState("pencil");
//     const [color, setColor] = useState("black"); 
//     //dd
//     const [elements, setElements] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [openedUserTab, setOpenedUserTab] = useState(false);
//     const [openedChatTab, setOpenedChatTab] = useState(false);
//     const [stream, setStream] = useState(null);
  
//     const handleClearCanvas = () => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       ctx.fillRect = "white";
//       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//       setElements([]);
//     };
  
//     const undo = () => {
//       setHistory((prevHistory) => [
//         ...prevHistory,
//         elements[elements.length - 1],
//       ]);
//       setElements((prevElements) =>
//         prevElements.slice(0, prevElements.length - 1)
//       );
//     };
  
//     const redo = () => {
//       setElements((prevElements) => [
//         ...prevElements,
//         history[history.length - 1],
//       ]);
//       setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
//     };
//     return(
// <React.Fragment>

//         <div className="col-md-10 mx-auto px-5 mb-3 d-flex align-items-center jusitfy-content-center">
//           <div className="d-flex col-md-2 justify-content-center gap-1">
//             <div className="d-flex gap-1 align-items-center">
//               <label htmlFor="pencil">Pencil</label>
//               <input
//                 type="radio"
//                 name="tool"
//                 id="pencil"
//                 checked={tool === "pencil"}
//                 value="pencil"
//                 className="mt-1"
//                 onChange={(e) => setTool(e.target.value)}
//               />
//             </div>
//             <div className="d-flex gap-1 align-items-center">
//               <label htmlFor="line">Line</label>
//               <input
//                 type="radio"
//                 id="line"
//                 name="tool"
//                 value="line"
//                 checked={tool === "line"}
//                 className="mt-1"
//                 onChange={(e) => setTool(e.target.value)}
//               />
//             </div>
//             <div className="d-flex  gap-1 align-items-center">
//               <label htmlFor="rect">Rectangle</label>
//               <input
//                 type="radio"
//                 name="tool"
//                 id="rect"
//                 checked={tool === "rect"}
//                 value="rect"
//                 className="mt-1"
//                 onChange={(e) => setTool(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="col-md-3 mx-auto ">
//             <div className="d-flex align-items-center justify-content-center">
//               <label htmlFor="color">Select Color: </label>
//               <input
//                 type="color"
//                 id="color"
//                 className="mt-1 ms-3"
//                 value={color}
//                 onChange={(e) => setColor(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="col-md-3 d-flex gap-2">
//             <button
//               className="btn btn-primary mt-1"
//               disabled={elements.length === 0}
//               onClick={() => undo()}
//             >
//               Undo
//             </button>
//             <button
//               className="btn btn-outline-primary mt-1"
//               disabled={history.length < 1}
//               onClick={() => redo()}
//             >
//               Redo
//             </button>
//           </div>
//           <div className="col-md-2">
//             <button className="btn btn-danger" onClick={handleClearCanvas}>
//               Clear Canvas
//             </button>
//           </div>
//         </div>
   
// <div className="col-md-10 mx-auto mt-4 canvas-box">
//         <WhiteBoard
//           canvasRef={canvasRef}
//           ctxRef={ctxRef}
//           elements={elements}
//           setElements={setElements}
//           color={color}
//           tool={tool}
//           user={user}
//           socket={socket}
//         />
//       </div>
// </React.Fragment>


       
//     )

// }

import "./Board.css"
class Board extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            color: "#000000",
            size: "5"
        }
    }

    changeColor(params) {
        this.setState({
            color: params.target.value
        })
    }

    changeSize(params) {
        this.setState({
            size: params.target.value
        })
    }

    render() {

        return (
            <div className="container">
                <div class="tools-section">
                    <div className="color-picker-container">
                        Select Brush Color : &nbsp; 
                        <input type="color" value={this.state.color} onChange={this.changeColor.bind(this)}/>
                    </div>

                    <div className="brushsize-container">
                        Select Brush Size : &nbsp; 
                        <select value={this.state.size} onChange={this.changeSize.bind(this)}>
                            <option> 5 </option>
                            <option> 10 </option>
                            <option> 15 </option>
                            <option> 20 </option>
                            <option> 25 </option>
                            <option> 30 </option>
                        </select>
                    </div>

                </div>

                <div class="board-container col-md-10 mx-auto mt-4 canvas-box">
                    <Board2 color={this.state.color} size={this.state.size} socket={this.props.socket}></Board2>
                </div>
            </div>
        )
    }
}


export default Board;