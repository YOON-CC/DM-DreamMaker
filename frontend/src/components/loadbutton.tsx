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