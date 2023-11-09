import React from 'react';
import { fabric } from 'fabric';
import '../style/animationbutton.css';


interface LoadButtonProps {
    canvas: fabric.Canvas | null;
}

const Animation: React.FC<LoadButtonProps> = ({ canvas }) => {
    const handleSetElementName1 = () => {// 제자리에서 사라졌다 나오는 애니메이션
        if (canvas) {
          const activeObject = canvas.getActiveObject();
      
          if (activeObject) {
            activeObject.set('name', 'animated-element1');
            canvas.renderAll();
          }
        }
    };
    const handleSetElementName2= () => { // 아래=>위 올라오며 사라졌다 나오는 애니메이션
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
    const handleSetElementName5 = () => {// 위=>아래 방향으로 사라졌다 나오는 애니메이션
      if (canvas) {
        const activeObject = canvas.getActiveObject();
    
        if (activeObject) {
          activeObject.set('name', 'animated-element5');
          canvas.renderAll();
        }
      }
    };
    const handleSetElementName6 = () => {// 점점 선명하게
      if (canvas) {
        const activeObject = canvas.getActiveObject();
    
        if (activeObject) {
          activeObject.set('name', 'animated-element6');
          canvas.renderAll();
        }
      }
    };
    const handleSetElementName7 = () => {// 점점 축소되며 선명하게
      if (canvas) {
        const activeObject = canvas.getActiveObject();
    
        if (activeObject) {
          activeObject.set('name', 'animated-element7');
          canvas.renderAll();
        }
      }
    };
    const handleSetElementName8 = () => {// 점점 크게
      if (canvas) {
        const activeObject = canvas.getActiveObject();
    
        if (activeObject) {
          activeObject.set('name', 'animated-element8');
          canvas.renderAll();
        }
      }
    };

    const handleSetElementName9 = () => {// 잠시고정
      if (canvas) {
        const activeObject = canvas.getActiveObject();
    
        if (activeObject) {
          activeObject.set('name', 'animated-element9');
          canvas.renderAll();
        }
      }
    };


    return (
        <div className='Animation_container'>
            <button onClick={handleSetElementName1}>점점 밝게</button>
            <button onClick={handleSetElementName2}>Down to Up(점점 밝게)</button>
            <button onClick={handleSetElementName3}>Left to Right(점점 밝게)</button>
            <button onClick={handleSetElementName4}>Right to Left(점점 밝게)</button>
            <button onClick={handleSetElementName5}>Up to Down(점점 밝게)</button>
            <button onClick={handleSetElementName6}>점점 선명하게</button>
            <button onClick={handleSetElementName7}>점점 축소되며 선명하게</button>
            <button onClick={handleSetElementName8}>점점 크게</button>
            <button onClick={handleSetElementName9}>잠시 고정</button>
        </div>
    );
};

export default Animation;