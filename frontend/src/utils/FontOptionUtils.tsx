import { fabric } from 'fabric';

export const handleChangeFontSizeInput = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;

  const fontSizeInput = document.getElementById("fontsize-input") as HTMLInputElement;
  const newSize = parseInt(fontSizeInput.value);
  
  const activeObject = canvas.getActiveObject();
  if (activeObject instanceof fabric.Textbox) {
    activeObject.set('fontSize', newSize);
    canvas.renderAll();
  }
  if (activeObject instanceof fabric.IText) {
    activeObject.set('fontSize', newSize);
    canvas.renderAll();
  }
};

export const handleFontWeightChange = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;

  const activeObject = canvas.getActiveObject();
  if (activeObject instanceof fabric.Textbox) {
    const currentFontWeight = activeObject.get('fontWeight');
    const newFontWeight = currentFontWeight === 'bold' ? 'normal' : 'bold';
    activeObject.set('fontWeight', newFontWeight);
    canvas.renderAll();
  }
  if (activeObject instanceof fabric.IText) {
    const currentFontWeight = activeObject.get('fontWeight');
    const newFontWeight = currentFontWeight === 'bold' ? 'normal' : 'bold';
    activeObject.set('fontWeight', newFontWeight);
    canvas.renderAll();
  }
};

export const handleFontToItalicChange = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;

  const activeObject = canvas.getActiveObject();
  if (activeObject instanceof fabric.Textbox) {
    const currentFontStyle = activeObject.get('fontStyle');
    const newFontStyle = currentFontStyle === 'italic' ? 'normal' : 'italic';
    activeObject.set('fontStyle', newFontStyle);
    canvas.renderAll();
  }
  if (activeObject instanceof fabric.IText) {
    const currentFontStyle = activeObject.get('fontStyle');
    const newFontStyle = currentFontStyle === 'italic' ? 'normal' : 'italic';
    activeObject.set('fontStyle', newFontStyle);
    canvas.renderAll();
  }
};

export const handleFontShadowChange = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;

  const activeObject = canvas.getActiveObject();
  if (activeObject instanceof fabric.Textbox) {
    const existingShadow = activeObject.get('shadow');

    if (existingShadow) {
      // 이미 그림자가 적용된 경우 그림자 제거
      activeObject.set({ shadow: undefined }); // 여기서 null 대신 undefined를 사용
    } else {
      // 그림자가 없는 경우 그림자 적용
      activeObject.set({
        shadow: new fabric.Shadow({
          color: 'rgba(0, 0, 0, 0.8)',
          offsetX: 1, 
          offsetY: 1, 
        }),
      });
    }

    canvas.renderAll();
  }
  if (activeObject instanceof fabric.IText) {
    const existingShadow = activeObject.get('shadow');

    if (existingShadow) {
      // 이미 그림자가 적용된 경우 그림자 제거
      activeObject.set({ shadow: undefined }); // 여기서 null 대신 undefined를 사용
    } else {
      // 그림자가 없는 경우 그림자 적용
      activeObject.set({
        shadow: new fabric.Shadow({
          color: 'rgba(0, 0, 0, 0.8)',
          offsetX: 1, 
          offsetY: 1, 
        }),
      });
    }

    canvas.renderAll();
  }
};