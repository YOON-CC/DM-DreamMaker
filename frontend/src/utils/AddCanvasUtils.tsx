import { fabric } from 'fabric';

export const addRectToCanvas = (canvas: fabric.Canvas) => {
    const newRect = new fabric.Rect({
        left: Math.random() * 400,
        top: Math.random() * 400,
        width: 100,
        height: 100,
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
    });

    canvas.add(newRect);
};

export const addCircleToCanvas = (canvas: fabric.Canvas) => {
    const newCircle = new fabric.Ellipse({
        left: Math.random() * 400,
        top: Math.random() * 400,
        rx: 50, // 가로 반지름
        ry: 50, // 세로 반지름
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
    });

    canvas.add(newCircle);
};

export const addTriangleToCanvas = (canvas: fabric.Canvas) => {
    const newTriangle = new fabric.Triangle({
        left: Math.random() * 400,
        top: Math.random() * 400,
        width: 100,
        height: 100,
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
    });

    canvas.add(newTriangle);
};

export const addTextboxToCanvas = (canvas: fabric.Canvas) => {
    const newTextbox = new fabric.Textbox('Enter your text', {
    left: Math.random() * 400,
    top: Math.random() * 400,
    width: 150, 
    fontSize: 20,
    fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
    editable: true, 
  });

  canvas.add(newTextbox);
}