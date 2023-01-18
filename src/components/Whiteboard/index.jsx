// import { useEffect, useState, useLayoutEffect } from "react";
// //import rough from "roughjs";
// import rough from 'roughjs/bundled/rough.esm';
// const roughGenerator = rough.generator();

// const WhiteBoard = ({
//   canvasRef,
//   ctxRef,
//   elements,
//   setElements,
//   tool,
//   color,
//   user,
//   socket,
// }) => {
//   const [img, setImg] = useState(null);

//   useEffect(() => {
//     socket.on("whiteBoardDataResponse", (data) => {
//       setImg(data.imgURL);
//     });
//   }, []);

 
//   const [isDrawing, setIsDrawing] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.height = window.innerHeight * 2;
//     canvas.width = window.innerWidth * 2;
//     const ctx = canvas.getContext("2d");

//     ctx.strokeStyle = color;
//     ctx.lineWidth = 2;
//     ctx.lineCap = "round";

//     ctxRef.current = ctx;
//   }, []);

//   useEffect(() => {
//     ctxRef.current.strokeStyle = color;
//   }, [color]);

//   useLayoutEffect(() => {
//     if (canvasRef) {
//       const roughCanvas = rough.canvas(canvasRef.current);

//       if (elements.length > 0) {
//         ctxRef.current.clearRect(
//           0,
//           0,
//           canvasRef.current.width,
//           canvasRef.current.height
//         );
//       }

//       elements.forEach((element) => {
//         if (element.type === "rect") {
//           roughCanvas.draw(
//             roughGenerator.rectangle(
//               element.offsetX,
//               element.offsetY,
//               element.width,
//               element.height,
//               {
//                 stroke: element.stroke,
//                 strokeWidth: 5,
//                 roughness: 0,
//               }
//             )
//           );
//         } else if (element.type === "line") {
//           roughCanvas.draw(
//             roughGenerator.line(
//               element.offsetX,
//               element.offsetY,
//               element.width,
//               element.height,
//               {
//                 stroke: element.stroke,
//                 strokeWidth: 5,
//                 roughness: 0,
//               }
//             )
//           );
//         } else if (element.type === "pencil") {
//           roughCanvas.linearPath(element.path, {
//             stroke: element.stroke,
//             strokeWidth: 5,
//             roughness: 0,
//           });
//         }
//       });

//       const canvasImage = canvasRef.current.toDataURL();
//       socket.emit("whiteboardData", canvasImage);
//     }
//   }, [elements]);

//   const handleMouseDown = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;

//     if (tool === "pencil") {
//       setElements((prevElements) => [
//         ...prevElements,
//         {
//           type: "pencil",
//           offsetX,
//           offsetY,
//           path: [[offsetX, offsetY]],
//           stroke: color,
//         },
//       ]);
//     } else if (tool === "line") {
//       setElements((prevElements) => [
//         ...prevElements,
//         {
//           type: "line",
//           offsetX,
//           offsetY,
//           width: offsetX,
//           height: offsetY,
//           stroke: color,
//         },
//       ]);
//     } else if (tool === "rect") {
//       setElements((prevElements) => [
//         ...prevElements,
//         {
//           type: "rect",
//           offsetX,
//           offsetY,
//           width: 0,
//           height: 0,
//           stroke: color,
//         },
//       ]);
//     }

//     setIsDrawing(true);
//   };

//   const handleMouseMove = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;

//     if (isDrawing) {
//       if (tool === "pencil") {
//         const { path } = elements[elements.length - 1];
//         const newPath = [...path, [offsetX, offsetY]];
//         setElements((prevElements) =>
//           prevElements.map((ele, index) => {
//             if (index === elements.length - 1) {
//               return {
//                 ...ele,
//                 path: newPath,
//               };
//             } else {
//               return ele;
//             }
//           })
//         );
//       } else if (tool === "line") {
//         setElements((prevElements) =>
//           prevElements.map((ele, index) => {
//             if (index === elements.length - 1) {
//               return {
//                 ...ele,
//                 width: offsetX,
//                 height: offsetY,
//               };
//             } else {
//               return ele;
//             }
//           })
//         );
//       } else if (tool === "rect") {
//         setElements((prevElements) =>
//           prevElements.map((ele, index) => {
//             if (index === elements.length - 1) {
//               return {
//                 ...ele,
//                 width: offsetX - ele.offsetX,
//                 height: offsetY - ele.offsetY,
//               };
//             } else {
//               return ele;
//             }
//           })
//         );
//       }
//     }
//   };

//   const handleMouseUp = (e) => {
//     setIsDrawing(false);
//   };

//   return (
    
//     <div
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       className="border border-dark border-3 h-100 w-100 overflow-hidden"
//     >
//       <canvas ref={canvasRef} />
//     </div>
//   );
// };

// export default WhiteBoard;



import React from 'react';

import "./index.css";


class Board extends React.Component {

    timeout;
    socket = this.props.socket;

    ctx;
    isDrawing = false;

    constructor(props) {
        super(props);

        this.socket.on("canvas-data", function(data){

            var root = this;
            var interval = setInterval(function(){
                if(root.isDrawing) return;
                root.isDrawing = true;
                clearInterval(interval);
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                image.onload = function() {
                    ctx.drawImage(image, 0, 0);

                    root.isDrawing = false;
                };
                image.src = data;
            }, 200)
        })
    }

    componentDidMount() {
        this.drawOnCanvas();
    }

    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    drawOnCanvas() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            if(root.timeout != undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function(){
                var base64ImageData = canvas.toDataURL("image/png");
                root.socket.emit("canvas-data", base64ImageData);
            }, 1000)
        };
    }

    render() {
        return (
            <div class="sketch" id="sketch">
                <canvas className="board" id="board"></canvas>
            </div>
        )
    }
}

export default Board