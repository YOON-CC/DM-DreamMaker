import React from 'react';
import { fabric } from 'fabric';
import '../style/loadbutton.css';

interface LoadButtonProps {
    canvas: fabric.Canvas | null;
}

const LoadButton: React.FC<LoadButtonProps> = ({ canvas }) => {
    const handleLocalStorageToCanvas = () => {
        canvas?.clear();
        canvas?.discardActiveObject();
        canvas?.renderAll();

        const objectsJson = localStorage.getItem('canvasObjects');
        const backgroundColor = localStorage.getItem('canvasBackgroundColor');
        const canvasWidth = 1000;
        const canvasHeight = 2000;
        const grid = 10;
  
        //배경색 및 점선 정렬 불러오기
        for (let i = 0; i <= canvasHeight / grid; i++) {
          const isRedLine = (i % 50 === 0); // 50의 배수인 가로줄을 빨간색으로 설정
          const lineColor = isRedLine ? '#ff9e9e' : '#f1f1f1';
        
          canvas?.add(
            new fabric.Line([0, i * grid, canvasWidth, i * grid], {
              stroke: lineColor,
              selectable: false,
            })
          );
        }
  
        for (let i = 0; i <= canvasWidth / grid; i++) {
          canvas?.add(
            new fabric.Line([i * grid, 0, i * grid, canvasHeight], {
              stroke: '#f1f1f1',
              selectable: false,
            })
          );
        }

        if (backgroundColor) {
            canvas?.setBackgroundColor(backgroundColor as string, canvas.renderAll.bind(canvas));
          }

        if (objectsJson) {
            const parsedObjects = JSON.parse(objectsJson);


            parsedObjects.forEach((objInfo: any) => {
                let fabricObject;
                switch (objInfo.type) {
                    case 'rect':
                        fabricObject = new fabric.Rect(objInfo);
                        break;
                    case 'ellipse':
                        fabricObject = new fabric.Ellipse(objInfo);
                        break;
                    case 'triangle':
                        fabricObject = new fabric.Triangle(objInfo);
                        break;
                    case 'textbox':
                        fabricObject = new fabric.Textbox(objInfo.text, objInfo);
                        break;      
                    case 'image':
                        const imgElement = new Image();
                        imgElement.src = objInfo.src;
                        imgElement.onload = () => {
                            fabricObject = new fabric.Image(imgElement, objInfo);
                            if (canvas) {
                                canvas.add(fabricObject);
                            }
                        };
                        break;     
                    case 'group':
                        if (objInfo.objects && objInfo.objects.length > 0) {
                            const groupObjects: fabric.Object[] | undefined = [];
                            objInfo.objects.forEach((groupObjInfo: any) => {
                                switch (groupObjInfo.type) {
                                    case 'rect':
                                        groupObjects.push(new fabric.Rect(groupObjInfo));
                                        break;
                                    case 'ellipse':
                                        groupObjects.push(new fabric.Ellipse(groupObjInfo));
                                        break;
                                    case 'triangle':
                                        
                                        groupObjects.push(new fabric.Triangle(groupObjInfo));
                                        break;   
                                    case 'textbox':
                                        groupObjects.push(new fabric.Textbox(groupObjInfo.text, groupObjInfo));
                                        break;    
                                    case 'image':
                                        console.log(groupObjInfo.src)
                                        const imgElement = new Image();

                                        imgElement.src = groupObjInfo.src;
                                        groupObjects.push(new fabric.Image(imgElement, groupObjInfo)); // 그룹에 이미지를 push
                                        break;
                                    default:
                                        break;
                                }
                            });
            
                            fabricObject = new fabric.Group(groupObjects, objInfo);
                        }
                        break;
                    default:
                        break;
                }

                if (fabricObject && canvas) {
                    canvas.add(fabricObject);
                }
            });
        }
    }

    return (
        canvas ? (
            <button className='loadbutton' onClick={handleLocalStorageToCanvas}>불러오기</button>
        ) : null
    );
};

export default LoadButton;