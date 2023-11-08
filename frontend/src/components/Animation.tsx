import React from 'react';
import { fabric } from 'fabric';
import '../style/animationbutton.css';


interface LoadButtonProps {
    canvas: fabric.Canvas | null;
}

const Animation: React.FC<LoadButtonProps> = ({ canvas }) => {
    const handleSetElementName1 = () => { // 위에서 올라오며 사라졌다 나오는 애니메이션
        if (canvas) {
          const activeObject = canvas.getActiveObject();
      
          if (activeObject) {
            activeObject.set('name', 'animated-element1');
            canvas.renderAll();
          }
        }
    };
    const handleSetElementName2 = () => {// 제자리에서 사라졌다 나오는 애니메이션
        if (canvas) {
          const activeObject = canvas.getActiveObject();
      
          if (activeObject) {
            activeObject.set('name', 'animated-element2');
            canvas.renderAll();
          }
        }
    };
    const handleSetElementName3 = () => {// 왼=>오 방향에서 사라졌다 나오는 애니메이션
        if (canvas) {
          const activeObject = canvas.getActiveObject();
      
          if (activeObject) {
            activeObject.set('name', 'animated-element3');
            canvas.renderAll();
          }
        }
    };
    const handleSetElementName4 = () => {// 오=>왼 방향에서 사라졌다 나오는 애니메이션
        if (canvas) {
          const activeObject = canvas.getActiveObject();
      
          if (activeObject) {
            activeObject.set('name', 'animated-element4');
            canvas.renderAll();
          }
        }
    };
    const handleSetElementName5 = () => {// 오=>왼 방향에서 사라졌다 나오는 애니메이션
        if (canvas) {
          const activeObject = canvas.getActiveObject();
      
          if (activeObject) {
            activeObject.set('name', 'animated-element5');
            canvas.renderAll();
          }
        }
    };


    return (
        <div className='Animation_container'>
            <button onClick={handleSetElementName1}>Down to Up(점점 밝게)</button>
            <button onClick={handleSetElementName2}>점점 밝게</button>
            <button onClick={handleSetElementName3}>Left to Right(점점 밝게)</button>
            <button onClick={handleSetElementName4}>Right to Left(점점 밝게)</button>
            <button onClick={handleSetElementName5}>Up to Down(점점 밝게)</button>
        </div>
    );
};

export default Animation;