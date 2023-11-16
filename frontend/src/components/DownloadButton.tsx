import React from 'react';
import { fabric } from 'fabric';
import '../style/downloadbutton.css';

interface DownloadButtonProps {
  canvas: fabric.Canvas | null;
  selectedHttpMethod: string;
  selectedHttpUrl: string;
  selectedHttpTransport: number;
  inputValues: string[];
}

interface Shadow {
  blur: number;
  color: string;
  offsetX: number;
  offsetY: number;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ canvas, selectedHttpMethod, selectedHttpUrl, selectedHttpTransport, inputValues }) => {
  console.log("HTTP 메서드:", selectedHttpMethod);
  console.log("URL:", selectedHttpUrl);
  console.log("전송방식:", selectedHttpTransport);
  console.log("KEY값:", inputValues);
  const apple = '사과';
  
  const handleDownloadCanvasAsHtml = () => {
    if (canvas) {
      const canvasObjects = canvas.getObjects();

      const group = canvasObjects.find(obj => obj.type === 'group');

      if (group) {
        console.log('Found Group:', group.toObject());
      } else {
        console.log('Group not found');
      }

      
    // Canvas 내용을 저장할 HTML 문자열 초기화
      let htmlContent = `<!DOCTYPE html><html><head><title>Canvas Content</title></head><body style="background:${canvas.backgroundColor}">`;
  
      // 각 객체를 순회하면서 HTML로 변환
      canvasObjects.forEach(object => {
        if (object instanceof fabric.Group) {
          console.log("그룹이름",object.name)
          const gw = object.width?? 0
          const gh = object.height?? 0
          const groupLeft = object.left?? 0; // 부모 태그로부터의 left
          const groupTop = object.top ?? 0; // 부모 태그로부터의 top
          
          const angleInDegrees = - (object.angle?? 0); // 회전 각도
          const angleInRadians = (angleInDegrees * Math.PI) / 180;
          // 회전 중심을 div 태그의 중심으로 설정
          const centerX = object.getCenterPoint().x;
          const centerY = object.getCenterPoint().y;
          // 회전 변환 후의 left와 top 계산
          const newX = centerX + (groupLeft - centerX) * Math.cos(angleInRadians) - (groupTop - centerY) * Math.sin(angleInRadians);
          const newY = centerY + (groupLeft - centerX) * Math.sin(angleInRadians) + (groupTop - centerY) * Math.cos(angleInRadians);

          const ow = ((object.width ?? 0)) / 1000 * 100
          const oh = ((object.height ?? 0)) / 500 * 100
          const ol = (newX ?? 0) / 1000 * 100
          const ot = (newY ?? 0) / 500 * 100
          
          htmlContent += `<div class=${object.name} style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; transform: rotate(${object.angle}deg);">`;
          if (object.name && object.name.startsWith('api_')){
            // 그룹의 이름이 "api_1"인 경우 alert 창 표시
            htmlContent +=`<form id="myForm">`;
            object.forEachObject((groupObject) => {
              if (groupObject instanceof fabric.IText) {
                const originalLeft = (groupObject.left?? 0)+(gw/2) // 부모 태그로부터의 left
                const originalTop = (groupObject.top ?? 0)+(gh/2); // 부모 태그로부터의 top

                const groupObjectLeft = originalLeft / gw * 100
                const groupObjectTop = originalTop / gh * 100
  //
                const groupObjectWidth = ((groupObject.width ?? 0) * (groupObject.scaleX?? 0)) / gw * 100
                const groupObjectHight = ((groupObject.height ?? 0) * (groupObject.scaleY?? 0)) / gh * 100

                const fontSize = groupObject.get('fontSize') as number;
                const newFontSize = fontSize*1.5;
                const fontFamily = groupObject.get('fontFamily');
                const fontColor = groupObject.fill;
                const fontShadow = (groupObject.shadow as unknown as Shadow).color

                htmlContent += `<input id="${groupObject.text}" style="position: absolute; width: ${groupObjectWidth}%; height: ${groupObjectHight}%; outline : none; border : none; text-shadow: 1.2px 1.2px ${fontShadow}; font-family : ${fontFamily}; font-weight : ${groupObject.fontWeight}; font-size : ${newFontSize}px; font-style : ${groupObject.fontStyle}; color : ${fontColor}; display : flex; justify-content : center; align-items : center; left: ${groupObjectLeft}%; top: ${groupObjectTop}%; color: ${groupObject.fill};"></input>`;
              }
              if (groupObject instanceof fabric.Rect) {
                const originalLeft = (groupObject.left?? 0)+(gw/2) // 부모 태그로부터의 left
                const originalTop = (groupObject.top ?? 0)+(gh/2); // 부모 태그로부터의 top

                const groupObjectLeft = originalLeft / gw * 100
                const groupObjectTop = originalTop / gh * 100

                const groupStrokeWidth = groupObject.strokeWidth ?? 0; // 두께
                const groupStrokeColor = groupObject.stroke ?? 'transparent'; // 색상 (기본값: 투명)

                const groupObjectWidth = (((groupObject.width ?? 0)+(groupStrokeWidth)) * (groupObject.scaleX?? 0)) / gw * 100
                const groupObjectHight = (((groupObject.height ?? 0)+(groupStrokeWidth)) * (groupObject.scaleY?? 0)) / gh * 100
                
                const oinnerw = (((groupObject.width ?? 0) - groupStrokeWidth*1.76))  / (groupObject.width ?? 0) * 100 // 경계선 있을시 내부 도형
                const oinnerh = (((groupObject.height ?? 0) - groupStrokeWidth*1.76)) / (groupObject.height ?? 0) * 100 // 경계선 있을시 내부 도형

                const obr =  ((groupObject.rx ?? 0)) * 1.5;
                const obrI =  ((groupObject.rx ?? 0));

                // const ow = ((object.width?? 0)*(object.scaleX?? 0)) / 1000 * 100
                // const oh = ((object.height?? 0) * (object.scaleY?? 0)) / 500 * 100

                const osx = ((groupObject.shadow as unknown as Shadow).offsetX)*2
                const osy = ((groupObject.shadow as unknown as Shadow).offsetY)*2
                const osb = ((groupObject.shadow as unknown as Shadow).blur) * 2
                const osc = (groupObject.shadow as unknown as Shadow).color
                if (groupStrokeWidth === 0){
                  htmlContent += `<button type="submit" style="position: absolute; left: ${groupObjectLeft}%; top: ${groupObjectTop}%; width: ${groupObjectWidth}%; height: ${groupObjectHight}%; box-shadow: ${osx}px ${osy}px ${osb}px ${osc}; border-radius: ${obr}px; background-color: ${groupObject.fill};"></button>`;
                }
                else{
                  htmlContent+=`
                  <div style="position: absolute; left: ${groupObjectLeft}%; top: ${groupObjectTop}%; width: ${groupObjectWidth}%; height: ${groupObjectHight}%;  box-shadow: ${osx}px ${osy}px ${osb}px ${osc}; border-radius: ${obr}px; background-color: ${groupStrokeColor}; ">
                    <button type="submit" style="
                    position: absolute; 
                    left: 50%; 
                    top: 50%;
                    transform : translate(-50%, -50%); 
                    width: ${oinnerw}%;
                    height: ${oinnerh}%;  
                    border-radius: ${obrI}px;
                    background-color: ${groupObject.fill}; 
                    ">
                    </button>
                  </div>`;     
                }   
              }
            })
            htmlContent +=`</form>`;
          } 
          
          
          else{
            object.forEachObject((groupObject) => {
              if (groupObject instanceof fabric.Rect) {

                const originalLeft = (groupObject.left?? 0)+(gw/2) // 부모 태그로부터의 left
                const originalTop = (groupObject.top ?? 0)+(gh/2); // 부모 태그로부터의 top

                const groupObjectLeft = originalLeft / gw * 100
                const groupObjectTop = originalTop / gh * 100

                const groupStrokeWidth = groupObject.strokeWidth ?? 0; // 두께
                const groupStrokeColor = groupObject.stroke ?? 'transparent'; // 색상 (기본값: 투명)

                const groupObjectWidth = (((groupObject.width ?? 0)+(groupStrokeWidth)) * (groupObject.scaleX?? 0)) / gw * 100
                const groupObjectHight = (((groupObject.height ?? 0)+(groupStrokeWidth)) * (groupObject.scaleY?? 0)) / gh * 100
                
                const oinnerw = (((groupObject.width ?? 0) - groupStrokeWidth*1.76))  / (groupObject.width ?? 0) * 100 // 경계선 있을시 내부 도형
                const oinnerh = (((groupObject.height ?? 0) - groupStrokeWidth*1.76)) / (groupObject.height ?? 0) * 100 // 경계선 있을시 내부 도형

                const obr =  ((groupObject.rx ?? 0)) * 1.5;
                const obrI =  ((groupObject.rx ?? 0));

                // const ow = ((object.width?? 0)*(object.scaleX?? 0)) / 1000 * 100
                // const oh = ((object.height?? 0) * (object.scaleY?? 0)) / 500 * 100

                const osx = ((groupObject.shadow as unknown as Shadow).offsetX)*2
                const osy = ((groupObject.shadow as unknown as Shadow).offsetY)*2
                const osb = ((groupObject.shadow as unknown as Shadow).blur) * 2
                const osc = (groupObject.shadow as unknown as Shadow).color
                if (groupStrokeWidth === 0){
                  htmlContent += `<div style="position: absolute; left: ${groupObjectLeft}%; top: ${groupObjectTop}%; width: ${groupObjectWidth}%; height: ${groupObjectHight}%; box-shadow: ${osx}px ${osy}px ${osb}px ${osc}; border-radius: ${obr}px; background-color: ${groupObject.fill};"></div>`;
                }
                else{
                  htmlContent+=`
                  <div style="position: absolute; left: ${groupObjectLeft}%; top: ${groupObjectTop}%; width: ${groupObjectWidth}%; height: ${groupObjectHight}%;  box-shadow: ${osx}px ${osy}px ${osb}px ${osc}; border-radius: ${obr}px; background-color: ${groupStrokeColor}; ">
                    <div style="
                    position: absolute; 
                    left: 50%; 
                    top: 50%;
                    transform : translate(-50%, -50%); 
                    width: ${oinnerw}%;
                    height: ${oinnerh}%;  
                    border-radius: ${obrI}px;
                    background-color: ${groupObject.fill}; 
                    ">
                    </div>
                  </div>`;     
                }
              }
              if (groupObject instanceof fabric.Ellipse) {
                console.log("원들어옴")
                const originalLeft = (groupObject.left?? 0)+(gw/2) // 부모 태그로부터의 left
                const originalTop = (groupObject.top ?? 0)+(gh/2); // 부모 태그로부터의 top

                const groupObjectLeft = originalLeft / gw * 100
                const groupObjectTop = originalTop / gh * 100

                const groupStrokeWidth = groupObject.strokeWidth ?? 0; // 두께
                const groupStrokeColor = groupObject.stroke ?? 'transparent'; // 색상 (기본값: 투명)

                const groupObjectWidth = (((groupObject.width ?? 0)+(groupStrokeWidth)) * (groupObject.scaleX?? 0)) / gw * 100
                const groupObjectHight = (((groupObject.height ?? 0)+(groupStrokeWidth)) * (groupObject.scaleY?? 0)) / gh * 100
                
                const oinnerw = (((groupObject.width ?? 0) - groupStrokeWidth*1.76))  / (groupObject.width ?? 0) * 100 // 경계선 있을시 내부 도형
                const oinnerh = (((groupObject.height ?? 0) - groupStrokeWidth*1.76)) / (groupObject.height ?? 0) * 100 // 경계선 있을시 내부 도형

                const obr =  ((groupObject.rx ?? 0)) * 1.5;
                const obrI =  ((groupObject.rx ?? 0));

                // const ow = ((object.width?? 0)*(object.scaleX?? 0)) / 1000 * 100
                // const oh = ((object.height?? 0) * (object.scaleY?? 0)) / 500 * 100

                const osx = ((groupObject.shadow as unknown as Shadow).offsetX)*2
                const osy = ((groupObject.shadow as unknown as Shadow).offsetY)*2
                const osb = ((groupObject.shadow as unknown as Shadow).blur) * 2
                const osc = (groupObject.shadow as unknown as Shadow).color
                if (groupStrokeWidth === 0){
                  htmlContent += `<div style="position: absolute; left: ${groupObjectLeft}%; top: ${groupObjectTop}%; width: ${groupObjectWidth}%; height: ${groupObjectHight}%; box-shadow: ${osx}px ${osy}px ${osb}px ${osc}; border-radius: 50%; background-color: ${groupObject.fill};"></div>`;
                }
                else{
                  htmlContent+=`
                  <div style="position: absolute; left: ${groupObjectLeft}%; top: ${groupObjectTop}%; width: ${groupObjectWidth}%; height: ${groupObjectHight}%;  box-shadow: ${osx}px ${osy}px ${osb}px ${osc}; border-radius: 50%; background-color: ${groupStrokeColor}; ">
                    <div style="
                    position: absolute; 
                    left: 50%; 
                    top: 50%;
                    transform : translate(-50%, -50%); 
                    width: ${oinnerw}%;
                    height: ${oinnerh}%;  
                    border-radius: 50%;
                    background-color: ${groupObject.fill}; 
                    ">
                    </div>
                  </div>`;     
                }
              }
              if (groupObject instanceof fabric.Textbox) {
                console.log("글자들옴")
                const originalLeft = (groupObject.left?? 0)+(gw/2) // 부모 태그로부터의 left
                const originalTop = (groupObject.top ?? 0)+(gh/2); // 부모 태그로부터의 top

                const groupObjectLeft = originalLeft / gw * 100
                const groupObjectTop = originalTop / gh * 100
  //
                const groupObjectWidth = ((groupObject.width ?? 0) * (groupObject.scaleX?? 0)) / gw * 100
                const groupObjectHight = ((groupObject.height ?? 0) * (groupObject.scaleY?? 0)) / gh * 100

                const fontSize = groupObject.get('fontSize') as number;
                const newFontSize = fontSize*1.5;
                const fontFamily = groupObject.get('fontFamily');
                const fontColor = groupObject.fill;
                const fontShadow = (groupObject.shadow as unknown as Shadow).color

                htmlContent += `<div style="position: absolute; width: ${groupObjectWidth}%; height: ${groupObjectHight}%; text-shadow: 1.2px 1.2px ${fontShadow}; font-family : ${fontFamily}; font-weight : ${groupObject.fontWeight}; font-size : ${newFontSize}px; font-style : ${groupObject.fontStyle}; color : ${fontColor}; display : flex; justify-content : center; align-items : center; left: ${groupObjectLeft}%; top: ${groupObjectTop}%; color: ${groupObject.fill};">${groupObject.text}</div>`;
              }
              if (groupObject instanceof fabric.Image) {
                // Fabric.js에서 image 객체인 경우
                const imageUrl = groupObject.getSrc(); // 이미지 URL 가져오기
      
                const originalLeft = (groupObject.left?? 0)+(gw/2) // 부모 태그로부터의 left
                const originalTop = (groupObject.top ?? 0)+(gh/2); // 부모 태그로부터의 top

                const groupObjectLeft = originalLeft / gw * 100
                const groupObjectTop = originalTop / gh * 100

                const groupObjectWidth = ((groupObject.width ?? 0) * (groupObject.scaleX?? 0)) / gw * 100
                const groupObjectHight = ((groupObject.height ?? 0) * (groupObject.scaleY?? 0)) / gh * 100
      
                const ImgHtml = `<img src="${imageUrl}" alt="Fabric.js Image" style="position: absolute; left: ${groupObjectLeft}%; top: ${groupObjectTop}%; width: ${groupObjectWidth}%; height: ${groupObjectHight}%; "></img>`;
                htmlContent += ImgHtml;
              }   
            });
          }
          // 그룹 닫기
          htmlContent += `</div>`;
  
        }

        if (object instanceof fabric.Rect) {
          console.log("이름 부여했습니다.", object.name)
          // Fabric.js에서 사각형 객체인 경우'
          const originalLeft = object.left?? 0; // 부모 태그로부터의 left
          const originalTop = object.top ?? 0; // 부모 태그로부터의 top
          
          const angleInDegrees = - (object.angle?? 0); // 회전 각도
          const angleInRadians = (angleInDegrees * Math.PI) / 180;

          const strokeWidth = object.strokeWidth ?? 0; // 두께
          console.log("경계선 두께",strokeWidth, "높이 넓이", object.width, object.height)
          const strokeColor = object.stroke ?? 'transparent'; // 색상 (기본값: 투명)
          // 회전 중심을 div 태그의 중심으로 설정
          const centerX = object.getCenterPoint().x;
          const centerY = object.getCenterPoint().y;
          // 회전 변환 후의 left와 top 계산
          const newX = centerX + (originalLeft - centerX) * Math.cos(angleInRadians) - (originalTop - centerY) * Math.sin(angleInRadians);
          const newY = centerY + (originalLeft - centerX) * Math.sin(angleInRadians) + (originalTop - centerY) * Math.cos(angleInRadians);

          const ol = (newX ?? 0) / 1000 * 100
          const ot = (newY ?? 0) / 500 * 100
          
          const ow = ((object.width ?? 0) + strokeWidth) / 1000 * 100
          const oh = ((object.height ?? 0) + strokeWidth) / 500 * 100
          const obr =  ((object.rx ?? 0)) * 1.5;
          const obrI =  ((object.rx ?? 0));

          const oinnerw = ((object.width ?? 0) - strokeWidth*1.76) / (object.width ?? 0) * 100 // 경계선 있을시 내부 도형
          const oinnerh = ((object.height ?? 0) - strokeWidth*1.76) / (object.height ?? 0) * 100 // 경계선 있을시 내부 도형
          const osx = ((object.shadow as unknown as Shadow).offsetX)*2
          const osy = ((object.shadow as unknown as Shadow).offsetY)*2
          const osb = ((object.shadow as unknown as Shadow).blur) * 2
          const osc = (object.shadow as unknown as Shadow).color

          //색상 오류 해결
          if (typeof object.fill === 'string') {
            if (object.fill.length < 7){
              object.fill = '#000000';
            }
          }

          if (strokeWidth === 0){
            const rectHtml = `<div class=${object.name} style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; box-shadow: ${osx}px ${osy}px ${osb}px ${osc};  border-radius: ${obr}px; background-color: ${object.fill}; transform: rotate(${object.angle}deg);"></div>`;          
            htmlContent += rectHtml;
          }else{
            const rectHtml = `
              <div class=${object.name} style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%;  box-shadow: ${osx}px ${osy}px ${osb}px ${osc}; border-radius: ${obr}px; background-color: ${strokeColor}; transform: rotate(${object.angle}deg);">
                <div style="
                position: absolute; 
                left: 50%; 
                top: 50%;
                transform : translate(-50%, -50%); 
                width: ${oinnerw}%;
                height: ${oinnerh}%;  
                border-radius: ${obrI}px;
                background-color: ${object.fill}; 
                rotate(${object.angle}deg)">
                </div>
              </div>`;          
            htmlContent += rectHtml;
          }

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
          // const ow = (object.width ?? 0) / 1000 * 100
          // const oh = (object.height ?? 0) / 500 * 100

          const strokeWidth = object.strokeWidth ?? 0; // 두께
          console.log("경계선 두께",strokeWidth, "높이 넓이", object.width, object.height)
          const strokeColor = object.stroke ?? 'transparent'; // 색상 (기본값: 투명)

          const ow = ((object.width ?? 0) + strokeWidth) / 1000 * 100
          const oh = ((object.height ?? 0) + strokeWidth) / 500 * 100
          const oinnerw = ((object.width ?? 0) - strokeWidth*1.76) / (object.width ?? 0) * 100 // 경계선 있을시 내부 도형
          const oinnerh = ((object.height ?? 0) - strokeWidth*1.76) / (object.height ?? 0) * 100 // 경계선 있을시 내부 도형
          const osw = (strokeWidth ?? 0) / 500 * 100

          const osx = ((object.shadow as unknown as Shadow).offsetX)*2
          const osy = ((object.shadow as unknown as Shadow).offsetY)*2
          const osb = ((object.shadow as unknown as Shadow).blur) * 2
          const osc = (object.shadow as unknown as Shadow).color

          console.log(object.width, object.height, strokeWidth)

          //색상 오류 해결
          if (typeof object.fill === 'string') {
            if (object.fill.length < 7){
              object.fill = '#000000';
            }
          }

          if (strokeWidth === 0){
            const rectHtml = `<div style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; box-shadow: ${osx}px ${osy}px ${osb}px ${osc}; background-color: ${object.fill}; border-radius: 50%;" transform: rotate(${object.angle}deg);"></div>`;          
            htmlContent += rectHtml;
          }else{
            const rectHtml = `
              <div style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%;  box-shadow: ${osx}px ${osy}px ${osb}px ${osc}; border-radius: 50%; background-color: ${strokeColor}; transform: rotate(${object.angle}deg);">
                <div style="
                position: absolute; 
                left: 50%; 
                top: 50%;
                transform : translate(-50%, -50%); 
                width: ${oinnerw}%;
                height: ${oinnerh}%;  
                border-radius: 50%;
                background-color: ${object.fill}; 
                rotate(${object.angle}deg)">
                </div>
              </div>`;          
            htmlContent += rectHtml;
          }
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

          const osx = ((object.shadow as unknown as Shadow).offsetX)*2
          const osy = ((object.shadow as unknown as Shadow).offsetY)*2
          const osb = ((object.shadow as unknown as Shadow).blur)
          const osc = (object.shadow as unknown as Shadow).color
          
          console.log("삼각형", originalLeft, originalTop)
          console.log("삼각형의 중심", centerX, centerY)
          console.log("삼각형의 각도", angleInDegrees)
          //색상 오류 해결
          if (typeof object.fill === 'string') {
            if (object.fill.length < 7){
              object.fill = '#000000';
            }
          }

          const TriangleHtml = `
          <div style = "position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; filter: drop-shadow(${osx}px ${osy}px ${osb}px ${osc});">
          <div style=" width: 100%; height: 100%; box-shadow: ${osx}px ${osy}px ${osb}px ${osc}; background-color: ${object.fill}; clip-path: polygon(50% 0%, 0% 100%, 100% 100%); transform: rotate(${object.angle}deg);"></div>
          </div>
          `;
          htmlContent += TriangleHtml;
        }
        if (object instanceof fabric.Textbox) {
          console.log("텍스트 박스")

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

          const fontSize = object.get('fontSize') as number;
          const newFontSize = fontSize*1.5;
          const fontFamily = object.get('fontFamily');
          const fontColor = object.fill;
          const fontShadow = (object.shadow as unknown as Shadow).color
          console.log(fontSize, fontFamily, object.fontSize)

          //색상 오류 해결
          if (typeof object.fill === 'string') {
            if (object.fill.length < 7){
              object.fill = '#000000';
            }
          }
          
          const TextboxHtml = `<div class=${object.name} style="position: absolute; text-shadow: 1.2px 1.2px ${fontShadow};
          left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; display : flex; justify-content : center; align-items : center; font-family : ${fontFamily}; font-weight : ${object.fontWeight}; font-size : ${newFontSize}px; font-style : ${object.fontStyle};color : ${fontColor};  transform: rotate(${object.angle}deg);">${object.text}</div>`;
          htmlContent += TextboxHtml;
        }       
        if (object instanceof fabric.Image) {
          // Fabric.js에서 image 객체인 경우
          const imageUrl = object.getSrc(); // 이미지 URL 가져오기

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
          const ow = ((object.width?? 0)*(object.scaleX?? 0)) / 1000 * 100
          const oh = ((object.height?? 0) * (object.scaleY?? 0)) / 500 * 100

          console.log("dd", (object.width?? 0)*(object.scaleX?? 0), (object.height?? 0) * (object.scaleY?? 0))

          const ImgHtml = `<img class=${object.name} src="${imageUrl}" alt="Fabric.js Image" style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; transform: rotate(${object.angle}deg);"></img>`;
          htmlContent += ImgHtml;
        }   
        if (object instanceof fabric.IText) {

          if (object.type === 'i-text') {
              console.log("아이 텍스트")
              console.log("이름 부여했습니다.", object.name)


              // Fabric.js에서 사각형 객체인 경우'
              const originalLeft = object.left?? 0; // 부모 태그로부터의 left
              const originalTop = object.top ?? 0; // 부모 태그로부터의 top
              
              const angleInDegrees = - (object.angle?? 0); // 회전 각도
              const angleInRadians = (angleInDegrees * Math.PI) / 180;

              const strokeWidth = object.strokeWidth ?? 0; // 두께
              console.log("경계선 두께",strokeWidth, "높이 넓이", object.width, object.height)
              const strokeColor = object.stroke ?? 'transparent'; // 색상 (기본값: 투명)
              // 회전 중심을 div 태그의 중심으로 설정
              const centerX = object.getCenterPoint().x;
              const centerY = object.getCenterPoint().y;
              // 회전 변환 후의 left와 top 계산
              const newX = centerX + (originalLeft - centerX) * Math.cos(angleInRadians) - (originalTop - centerY) * Math.sin(angleInRadians);
              const newY = centerY + (originalLeft - centerX) * Math.sin(angleInRadians) + (originalTop - centerY) * Math.cos(angleInRadians);

              const ol = (newX ?? 0) / 1000 * 100
              const ot = (newY ?? 0) / 500 * 100
              
              const ow = ((object.width ?? 0) + strokeWidth) / 1000 * 100
              const oh = ((object.height ?? 0) + strokeWidth) / 500 * 100

              const osx = ((object.shadow as unknown as Shadow).offsetX)*2
              const osy = ((object.shadow as unknown as Shadow).offsetY)*2
              const osb = ((object.shadow as unknown as Shadow).blur) * 2
              const osc = (object.shadow as unknown as Shadow).color

              const rectHtml = `<input id="${object.text} style="position: absolute; left: ${ol}%; top: ${ot}%; width: ${ow}%; height: ${oh}%; color: ${object.fill}; transform: rotate(${object.angle}deg);"></input>`;          
              htmlContent += rectHtml;
          }

        }
        // 다른 객체 유형처리 ▼▼▼▼
        
      });

      //애니메이션 처리 부분
      htmlContent += `
      <script>
        const animatedElements1 = document.querySelectorAll('.animated-element1');
        const animatedElements2 = document.querySelectorAll('.animated-element2');
        const animatedElements3 = document.querySelectorAll('.animated-element3');
        const animatedElements4 = document.querySelectorAll('.animated-element4');
        const animatedElements5 = document.querySelectorAll('.animated-element5');
        const animatedElements6 = document.querySelectorAll('.animated-element6');
        const animatedElements7 = document.querySelectorAll('.animated-element7');
        const animatedElements8 = document.querySelectorAll('.animated-element8');
        const animatedElements9 = document.querySelectorAll('.animated-element9');


        animatedElements1.forEach((animatedElement) => {
          animatedElement.style.opacity = 0;
          animatedElement.style.transition = 'opacity 2s';
        });

        animatedElements2.forEach((animatedElement) => {
          animatedElement.style.opacity = 0;
          animatedElement.style.transform = 'translateY(100%)'; 
          animatedElement.style.transition = 'opacity 2s, transform 2s';
        });
      
        animatedElements3.forEach((animatedElement) => {
          animatedElement.style.opacity = 0;
          animatedElement.style.transform = 'translateX(-100%)';
          animatedElement.style.transition = 'opacity 2s, transform 2s';
        });

        animatedElements4.forEach((animatedElement) => {
          animatedElement.style.opacity = 0;
          animatedElement.style.transform = 'translateX(100%)';
          animatedElement.style.transition = 'opacity 2s, transform 2s';
        });

        animatedElements5.forEach((animatedElement) => {
          animatedElement.style.opacity = 0;
          animatedElement.style.transform = 'translateY(-100%)'; 
          animatedElement.style.transition = 'opacity 2s, transform 2s';
        });

        animatedElements6.forEach((animatedElement) => {
          animatedElement.style.opacity = 0;
          animatedElement.style.filter = 'blur(10px)'; // 초기 블러 효과 적용
          animatedElement.style.transition = 'opacity 2s, filter 2s';
        });

        animatedElements7.forEach((animatedElement) => {
          animatedElement.style.opacity = 0;
          animatedElement.style.transform = 'scaleX(2)';
          animatedElement.style.filter = 'blur(10px)'; // 초기 블러 효과 적용
          animatedElement.style.transition = 'opacity 2s, transform 2s, filter 2s';
        });

        animatedElements8.forEach((animatedElement) => {
          animatedElement.style.opacity = 0;
          animatedElement.style.transform = 'scale(0.5)'; /* 초기에 전체적으로 축소된 상태로 시작 */
          animatedElement.style.transition = 'opacity 2s, transform 2s';
        });


        //animatedElements9의 옵션
        let state = false;
        let Yindex = window.innerHeight;
        console.log(Yindex)
        let temp = Yindex;
        let originalPosition;
        animatedElements9.forEach((animatedElement) => {
          originalPosition = animatedElement.style.top;
        });


        window.addEventListener('scroll', () => {

          animatedElements1.forEach((animatedElement) => {
            const elementTop = animatedElement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
      
            if (elementTop < windowHeight) {
              animatedElement.style.opacity = 1;
            }
          });

          animatedElements2.forEach((animatedElement) => {
            const elementTop = animatedElement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
      
            if (elementTop < windowHeight) {
              animatedElement.style.opacity = 1;
              animatedElement.style.transform = 'translateY(0)'; 
            } else {
              animatedElement.style.opacity = 0;
              animatedElement.style.transform = 'translateY(100%)';
            }
          });
      
          animatedElements3.forEach((animatedElement) => {
            const elementTop = animatedElement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
      
            if (elementTop < windowHeight) {
              animatedElement.style.opacity = 1;
              animatedElement.style.transform = 'translateX(0)'; 
            } else {
              animatedElement.style.opacity = 0;
              animatedElement.style.transform = 'translateX(-100%)';
            }
          });

          animatedElements4.forEach((animatedElement) => {
            const elementTop = animatedElement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
      
            if (elementTop < windowHeight) {
              animatedElement.style.opacity = 1;
              animatedElement.style.transform = 'translateX(0)'; 
            } else {
              animatedElement.style.opacity = 0;
              animatedElement.style.transform = 'translateX(100%)';
            }
          });

          animatedElements5.forEach((animatedElement) => {
            const elementTop = animatedElement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
      
            if (elementTop < windowHeight) {
              animatedElement.style.opacity = 1;
              animatedElement.style.transform = 'translateY(0)'; 
            } else {
              animatedElement.style.opacity = 0;
              animatedElement.style.transform = 'translateY(-100%)';
            }
          });

          animatedElements6.forEach((animatedElement) => {
            const elementTop = animatedElement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
      
            if (elementTop < windowHeight) {
              animatedElement.style.opacity = 1;
              animatedElement.style.filter = 'blur(0)'; // 블러 효과 해제
            } else {
              animatedElement.style.opacity = 0;
              animatedElement.style.filter = 'blur(30px)'; // 다시 블러 효과 적용
            }
          });

          animatedElements7.forEach((animatedElement) => {
            const elementTop = animatedElement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
      
            if (elementTop < windowHeight) {
              animatedElement.style.opacity = 1;
              animatedElement.style.filter = 'blur(0)'; 
              animatedElement.style.transform = 'scaleX(1)';
            } else {
              animatedElement.style.opacity = 0;
              animatedElement.style.filter = 'blur(10px)'; 
              animatedElement.style.transform = 'scaleX(2)'; 
            }
          });

          animatedElements8.forEach((animatedElement) => {
            const elementTop = animatedElement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
      
            if (elementTop < windowHeight) {
              animatedElement.style.opacity = 1;
              animatedElement.style.transform = 'scale(1)'; 
            } else {
              animatedElement.style.opacity = 0;
              animatedElement.style.transform = 'scale(0.5)';
            }
          });

          animatedElements9.forEach((animatedElement) => {
            const elementTop = animatedElement.getBoundingClientRect().top;
            const elementBottom = animatedElement.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
      
      
            if (!state && elementTop <= windowHeight / 2 && window.scrollY - Yindex < 1000) {
              animatedElement.style.position = 'absolute';
              animatedElement.style.opacity = 1;
              animatedElement.style.top = \`\${window.scrollY + windowHeight / 2}px\`;
            } else if (window.scrollY - Yindex > 1000) {
              animatedElement.style.opacity = 1;
              animatedElement.style.top = \`\${originalPosition}%\`;
              Yindex = temp;
              state = true;
            } else {
              state = false;
            }
          });

        });
      </script>
      `

      if (selectedHttpMethod === 'GET') {
        const box = [];
        box.push(...inputValues);
        const params = new URLSearchParams();
      
        for (const key of box) {
          params.append(key, ''); 
        }
      
        const queryString = params.toString();
      
        const apiUrl = `${selectedHttpUrl}?${queryString}`;
      
        htmlContent += `
        <script>
          const apiUrl = "${apiUrl}";
          const apiMethod = "${selectedHttpMethod}";
      
          // 폼 요소를 가져오고 제출 이벤트를 처리
          const form = document.getElementById("myForm");
      
          form.addEventListener("submit", function(event) {
            event.preventDefault(); // 기본 폼 제출 동작을 막음
      
            // Authorization 헤더에 추가할 토큰 또는 값
      
            // GET 요청을 보내는 함수
            fetch(apiUrl, {
              method: apiMethod,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(response => response.json())
            .then(data => console.log("데이터 결과", data))
            .catch(error => console.error("에러 발생", error));
          });
        </script>
        `;
      }
      
      
      if (selectedHttpMethod === 'POST'){
        const box = [];
        box.push(...inputValues)
        const jsonObject: Record<string, string> = {}; 
        
        for (const key of box) {
          jsonObject[key] = '';
        }
        
        // 객체를 JSON 문자열로 변환합니다.
        const jsonString = JSON.stringify(jsonObject, null, 2); // 세 번째 인수 (2)는 예쁘게 출력하기 위한 것입니다.
        
        console.log(jsonString);

        htmlContent += `
        <script>
  
  
          const apiUrl = "${selectedHttpUrl}";
          const apiMethod = "${selectedHttpMethod}";
        
          // 폼 요소를 가져오고 제출 이벤트를 처리
          const form = document.getElementById("myForm");
        
          form.addEventListener("submit", function(event) {
            event.preventDefault(); // 기본 폼 제출 동작을 막음
        
            // JSON 데이터 만들기
            const dataKeys = ${JSON.stringify(inputValues)};
            let jsonData = {}; // 빈 객체 생성
        
            for (let i = 0; i < dataKeys.length; i++) {
              const inputId = \`INPUT_\${i + 1}\`; // 동적으로 INPUT_1, INPUT_2, ... 생성
              const key = dataKeys[i];
              const inputValue = document.getElementById(inputId).value;
              jsonData[key] = inputValue; // JSON 데이터 객체에 키-값 쌍 추가
            }
            
            console.log(jsonData)
        
            // POST 요청을 보내는 함수
            fetch(apiUrl, { 
              method: apiMethod,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonData),
            })
            .then((data) => console.log("데이터 결과", data))
          });
        </script>
        `;
      }

      
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