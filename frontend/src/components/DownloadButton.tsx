import React from 'react';
import { fabric } from 'fabric';
import '../style/downloadbutton.css';

interface DownloadButtonProps {
  canvas: fabric.Canvas | null;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ canvas }) => {
  const handleDownloadCanvasAsHtml = () => {
    if (canvas) {
      const canvasObjects = canvas.getObjects();
    // console.log(canvasWidth, canvasHeight)

    // Canvas 내용을 저장할 HTML 문자열 초기화
      let htmlContent = '<!DOCTYPE html><html><head><title>Canvas Content</title></head><body>';
  
      // 각 객체를 순회하면서 HTML로 변환
      canvasObjects.forEach(object => {
        if (object instanceof fabric.Rect) {
          // Fabric.js에서 사각형 객체인 경우

          const originalLeft = object.left?? 0; // 부모 태그로부터의 left
          const originalTop = object.top ?? 0; // 부모 태그로부터의 top
          
          const angleInDegrees = - (object.angle?? 0); // 회전 각도
          const angleInRadians = (angleInDegrees * Math.PI) / 180;
          
          // 회전 중심을 div 태그의 중심으로 설정
          const centerX = object.getCenterPoint().x;
          const centerY = object.getCenterPoint().y;
          
          // 회전 변환 후의 left와 top 계산
          const newX = centerX + (originalLeft - centerX) * Math.cos(angleInRadians) - (originalTop - centerY) * Math.sin(angleInRadians);
          const newY = centerY + (originalLeft - centerX) * Math.sin(angleInRadians) + (originalTop - centerY) * Math.cos(angleInRadians);
          
          console.log(`회전 후의 left: ${newX}, top: ${newY}`);
          const ol = (newX ?? 0) / 1000 * 100
          const ot = (newY ?? 0) / 500 * 100
          const ow = (object.width ?? 0) / 1000 * 100
          const oh = (object.height ?? 0) / 500 * 100

          console.log("사각형", originalLeft, originalTop)

          const rectHtml = `<div style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; background-color: ${object.fill}; transform: rotate(${object.angle}deg);"></div>`;          
          htmlContent += rectHtml;
        }
        if (object instanceof fabric.Ellipse && typeof object.rx !== 'undefined' && typeof object.ry !== 'undefined') {
          // Fabric.js에서 원 객체인 경우
          const originalLeft = object.left?? 0; // 부모 태그로부터의 left
          const originalTop = object.top ?? 0; // 부모 태그로부터의 top
          
          const angleInDegrees = - (object.angle?? 0); // 회전 각도
          const angleInRadians = (angleInDegrees * Math.PI) / 180;

          const centerX = object.getCenterPoint().x;
          const centerY = object.getCenterPoint().y;
          
          // 회전 변환 후의 left와 top 계산
          const newX = centerX + (originalLeft - centerX) * Math.cos(angleInRadians) - (originalTop - centerY) * Math.sin(angleInRadians);
          const newY = centerY + (originalLeft - centerX) * Math.sin(angleInRadians) + (originalTop - centerY) * Math.cos(angleInRadians);
          
          const ol = (newX ?? 0) / 1000 * 100
          const ot = (newY ?? 0) / 500 * 100
          const ow = (object.width ?? 0) / 1000 * 100
          const oh = (object.height ?? 0) / 500 * 100

          const circleHtml = `<div style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; background-color: ${object.fill}; border-radius: 50%;" transform: rotate(${object.angle}deg);"></div>`;
          htmlContent += circleHtml;
        }
        if (object instanceof fabric.Triangle) {
          // Fabric.js에서 원 객체인 경우
          const originalLeft = object.left?? 0; // 부모 태그로부터의 left
          const originalTop = object.top ?? 0; // 부모 태그로부터의 top
          
          const angleInDegrees = - (object.angle?? 0); // 회전 각도
          const angleInRadians = (angleInDegrees * Math.PI) / 180;

          const centerX = object.getCenterPoint().x;
          const centerY = object.getCenterPoint().y;
          
          // 회전 변환 후의 left와 top 계산
          const newX = centerX + (originalLeft - centerX) * Math.cos(angleInRadians) - (originalTop - centerY) * Math.sin(angleInRadians);
          const newY = centerY + (originalLeft - centerX) * Math.sin(angleInRadians) + (originalTop - centerY) * Math.cos(angleInRadians);
          
          const ol = (newX ?? 0) / 1000 * 100
          const ot = (newY ?? 0) / 500 * 100
          const ow = (object.width ?? 0) / 1000 * 100
          const oh = (object.height ?? 0) / 500 * 100

          console.log("삼각형", originalLeft, originalTop)
          console.log("삼각형의 중심", centerX, centerY)
          console.log("삼각형의 각도", angleInDegrees)

          const TriangleHtml = `<div style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; background-color: ${object.fill}; clip-path: polygon(50% 0%, 0% 100%, 100% 100%); transform: rotate(${object.angle}deg);"></div>`;
          htmlContent += TriangleHtml;
        }
        if (object instanceof fabric.Textbox) {
          // Fabric.js에서 원 객체인 경우
          const originalLeft = object.left?? 0; // 부모 태그로부터의 left
          const originalTop = object.top ?? 0; // 부모 태그로부터의 top
          
          const angleInDegrees = - (object.angle?? 0); // 회전 각도
          const angleInRadians = (angleInDegrees * Math.PI) / 180;

          const centerX = object.getCenterPoint().x;
          const centerY = object.getCenterPoint().y;
          
          // 회전 변환 후의 left와 top 계산
          const newX = centerX + (originalLeft - centerX) * Math.cos(angleInRadians) - (originalTop - centerY) * Math.sin(angleInRadians);
          const newY = centerY + (originalLeft - centerX) * Math.sin(angleInRadians) + (originalTop - centerY) * Math.cos(angleInRadians);
          
          const ol = (newX ?? 0) / 1000 * 100
          const ot = (newY ?? 0) / 500 * 100
          const ow = (object.width ?? 0) / 1000 * 100
          const oh = (object.height ?? 0) / 500 * 100

          const TextboxHtml = `<div style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; transform: rotate(${object.angle}deg);">${object.text}</div>`;
          htmlContent += TextboxHtml;
        }       
        // 다른 객체 유형처리 ▼▼▼▼
      });
  
      htmlContent += '</body></html>';
  
      // HTML 파일로 저장
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
  
      // 다운로드 링크 생성, 클릭 이벤트 발생
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'canvas_content.html';
      downloadLink.click();
  
      // URL 객체 해제
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button className='downloadbutton' onClick={handleDownloadCanvasAsHtml}>다운로드</button>
  );
};

export default DownloadButton;