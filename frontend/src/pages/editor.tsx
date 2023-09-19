import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import '../style/editor.css';
import SaveButton from '../components/savebutton';
import LoadButton from '../components/loadbutton';
import DownloadButton from '../components/DownloadButton';
import { addRectToCanvas, addCircleToCanvas, addTriangleToCanvas, addTextboxToCanvas, addImageToCanvas } from '../utils/AddCanvasUtils'; 
import { handleScalingRect, handleScalingCircle, handleScalingTriangle, handleScalingTextbox, handleScalingImage } from '../utils/ScalingCanvasUtils';

type ObjectSize = {
  width?: number;
  height?: number;
  rx?: number;
  ry?: number;
  // 더 많은 프로퍼티를 여기에 추가
};

const Editor = () => {

  //도형 툴바
  const [showTool, setShowTool] = useState(true);

  const [objectCoordinates, setObjectCoordinates] = useState({ x: 0, y: 0 });
  const [objectSize, setObjectSize] = useState<ObjectSize>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => { 
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      
      //도형 생성
      const handleAddRect = () => {if (canvas) {addRectToCanvas(canvas);}};
      const handleAddCircle = () => {if (canvas) { addCircleToCanvas(canvas);}};
      const handleAddTriangle = () => {if (canvas) {addTriangleToCanvas(canvas);}};
      const handleAddTextbox = () => {if (canvas) {addTextboxToCanvas(canvas);}};
      const handleAddImageShape = () => { if(canvas) {addImageToCanvas(canvas);}};
      
      //도형 스케일링
      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Rect;
        handleScalingRect(activeObject, setObjectCoordinates, setObjectSize, canvas);
      });

      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Ellipse;
        handleScalingCircle(activeObject, setObjectCoordinates, setObjectSize, canvas);
      });

      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Triangle;
        handleScalingTriangle(activeObject, setObjectCoordinates, setObjectSize, canvas); 
      });
      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Textbox;
        handleScalingTextbox(activeObject, setObjectCoordinates, setObjectSize, canvas);
      });
      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Image;
        handleScalingImage(activeObject, setObjectCoordinates, setObjectSize, canvas);
      });

      const handleChangeColor = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          const newColor = prompt('Enter RGB color (e.g. "255, 0, 0"):');
          if (newColor) {
            activeObject.set('fill', `rgb(${newColor})`);
            canvas.renderAll();
          }
        }
      };

      const handleDeleteSelectedObjects = () => {
        const selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length > 0) {
          selectedObjects.forEach(object => {
            canvas.remove(object);
          });
          canvas.discardActiveObject(); 
          canvas.renderAll(); 
        }
      };

      const handleKeyboardDelete = (event: KeyboardEvent) => {
        if (event.key === 'Delete') {
          handleDeleteSelectedObjects();
        }
      };
      const handleSendBackwards = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.sendBackwards(activeObject);
        }
      };

      const handleBringForward = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.bringForward(activeObject);
        }
      };
   
      const handleChangeRadiusInput = () => {
        const borderRadiusInput = prompt('Enter border-radius value:');
        const borderRadius = borderRadiusInput !== null ? parseFloat(borderRadiusInput) : 0;
      
        const activeObject = canvas.getActiveObject();
        if (activeObject instanceof fabric.Rect) {
          const scaleX = activeObject.scaleX ?? 1;
          const scaleY = activeObject.scaleY ?? 1;
      
          const scaledWidth = activeObject.getScaledWidth();
          const scaledHeight = activeObject.getScaledHeight();

          console.log("맞아?", scaledWidth)
          const newRx = Math.min(borderRadius * scaleX, scaledWidth / 2);
          const newRy = Math.min(borderRadius * scaleY, scaledHeight / 2);

          console.log("최종 rx, ry", newRx,)
          activeObject.set('rx', newRx);
          activeObject.set('ry', newRy);
          canvas.renderAll();
        }
        
      };
      const changeRadiusInputButton = document.getElementById('change-radius-input-button');
      changeRadiusInputButton?.addEventListener('click', handleChangeRadiusInput);
    

      
      document.addEventListener('keydown', handleKeyboardDelete);

      const addButton = document.getElementById('add-button');
      addButton?.addEventListener('click', handleAddRect);


      const addCircleButton = document.getElementById('add-circle-button');
      addCircleButton?.addEventListener('click', handleAddCircle);

      const addTriangleButton = document.getElementById('add-triangle-button');
      addTriangleButton?.addEventListener('click', handleAddTriangle);

      const changeColorButton = document.getElementById('change-color-button');
      changeColorButton?.addEventListener('click', handleChangeColor);

      const addTextboxButton = document.getElementById('add-textbox-button');
      addTextboxButton?.addEventListener('click', handleAddTextbox);

      const deleteButton = document.getElementById('delete-button');
      deleteButton?.addEventListener('click', handleDeleteSelectedObjects);

      const sendBackwardsButton = document.getElementById('send-backwards-button');
      sendBackwardsButton?.addEventListener('click', handleSendBackwards);

      const bringForwardButton = document.getElementById('bring-forward-button');
      bringForwardButton?.addEventListener('click', handleBringForward);

      const addImageShapeButton = document.getElementById('add-image-shape-button');
      addImageShapeButton?.addEventListener('click', handleAddImageShape);


      setCanvas(canvas);


      return () => {
        canvas.dispose();
        canvas.off('object:moving');
        addImageShapeButton?.removeEventListener('click', handleAddImageShape);

        document.removeEventListener('keydown', handleKeyboardDelete);
        addButton?.removeEventListener('click', handleAddRect);        
        addCircleButton?.removeEventListener('click', handleAddCircle);
        addTriangleButton?.removeEventListener('click', handleAddTriangle);
        changeColorButton?.removeEventListener('click', handleChangeColor);
        addTextboxButton?.removeEventListener('click', handleAddTextbox);
        deleteButton?.removeEventListener('click', handleDeleteSelectedObjects);
        sendBackwardsButton?.removeEventListener('click', handleSendBackwards);
        bringForwardButton?.removeEventListener('click', handleBringForward);

      };
    }
  }, []);

  return (
    <div className='body'>
      <div className='editor_header'>
        <div className='editor_header_logo_container'></div>
        <div className='editor_header_tool_container'>
          <div className='editor_header_tool_container_btn' onClick={() =>setShowTool(!showTool)}>
            <img src="../images/figures.png" style={{ width: "60%", height: "80%", marginTop:"8%", marginLeft:"19%"}} />
          </div>
          <div id="add-textbox-button" onClick={() => !showTool && setShowTool(true)}>
            <img src="../images/text.png" style={{ width: "67%", height: "80%", marginTop:"8.2%", marginLeft:"17%"}} />
          </div>
          <div id='add-image-shape-button'>
            <img src="../images/photo.png" style={{ width: "67%", height: "80%", marginTop:"8%", marginLeft:"16%"}} />
          </div>
        </div>
          {/* <button id="change-color-button">Change Color</button>
          <button id="delete-button">Delete Selected Objects</button>
          <button id="send-backwards-button">Send Backwards</button>
          <button id="bring-forward-button">Bring Forward</button>
          <button id="change-radius-input-button">Change Radius (Input)</button>
          <div>Object Coordinates: X: {objectCoordinates.x.toFixed(2)}, Y: {objectCoordinates.y.toFixed(2)}</div>
          <div> Object size: Width: {objectSize.width !== undefined ? objectSize.width.toFixed(2) : "N/A"}, Height: {objectSize.height !== undefined ? objectSize.height.toFixed(2) : "N/A"}</div> */}
        <div className='editor_header_button_container'>
          <LoadButton canvas={canvas}></LoadButton>
          <SaveButton canvas={canvas}></SaveButton>
          <DownloadButton canvas={canvas}></DownloadButton>
        </div>
      </div>
      <div className='editor_body'>
        <div className='editor_body_toolbox'>
          <button id="add-button"></button>
          <button id="add-circle-button"></button>
          <img id="add-triangle-button"  src="../images/triangle.png"/>
        </div>
        {showTool && (<div className='editor_body_toolbox_cover'></div>)}
        <div className='editor_body_left'>
          
        </div>
        <div className='editor_body_center'>
          <div className='canvas_container'>
            <canvas ref={canvasRef}  width={1000} height={500}></canvas>
          </div>
        </div>
        <div className='editor_body_right'></div>
      </div>
    </div>
  );
};

export default Editor;