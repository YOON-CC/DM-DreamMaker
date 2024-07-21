import { fabric } from 'fabric';

export const applyShadow_0_0 = (canvas: fabric.Canvas | null) => {
  const activeObject = canvas?.getActiveObject();

    if (activeObject) {
        activeObject.set({
        shadow: new fabric.Shadow({
            color: '#000000',
            blur: 3,
            offsetX: -5,
            offsetY: -5,
        }),
        });
        canvas?.renderAll();
    }
};


export const applyShadow_0_1 = (canvas: fabric.Canvas | null) => {
    const activeObject = canvas?.getActiveObject();
  
    if (activeObject) {

      activeObject.set({
        shadow: new fabric.Shadow({
          color: '#000000', // 그림자 색상 (투명도 포함)
          blur: 3, // 그림자 블러 정도
          offsetX: 0, // 그림자 X축 이동
          offsetY: -4, // 그림자 Y축 이동
        }),
      });
      // 변경 사항을 캔버스에 적용
      canvas?.renderAll();
    }
};

export const applyShadow_0_2 = (canvas: fabric.Canvas | null) => {
    const activeObject = canvas?.getActiveObject();
  
    if (activeObject) {

      activeObject.set({
        shadow: new fabric.Shadow({
          color: '#000000', // 그림자 색상 (투명도 포함)
          blur: 3, // 그림자 블러 정도
          offsetX: 5, // 그림자 X축 이동
          offsetY: -5, // 그림자 Y축 이동
        }),
      });
      // 변경 사항을 캔버스에 적용
      canvas?.renderAll();
    }
};
export const applyShadow_1_0 = (canvas: fabric.Canvas | null) => {
    const activeObject = canvas?.getActiveObject();
  
    if (activeObject) {

      activeObject.set({
        shadow: new fabric.Shadow({
          color: '#000000', // 그림자 색상 (투명도 포함)
          blur: 3, // 그림자 블러 정도
          offsetX: -4, // 그림자 X축 이동
          offsetY: 0, // 그림자 Y축 이동
        }),
      });
      // 변경 사항을 캔버스에 적용
      canvas?.renderAll();
    }
};
export const applyShadow_1_1 = (canvas: fabric.Canvas | null) => {
    const activeObject = canvas?.getActiveObject();
  
    if (activeObject) {

      activeObject.set({
        shadow: new fabric.Shadow({
          color: '#000000', // 그림자 색상 (투명도 포함)
          blur: 10, // 그림자 블러 정도
          offsetX: 0, // 그림자 X축 이동
          offsetY: 0, // 그림자 Y축 이동
        }),
      });
      // 변경 사항을 캔버스에 적용
      canvas?.renderAll();
    }
};
export const applyShadow_1_2 = (canvas: fabric.Canvas | null) => {
    const activeObject = canvas?.getActiveObject();
  
    if (activeObject) {

      activeObject.set({
        shadow: new fabric.Shadow({
          color: '#000000', // 그림자 색상 (투명도 포함)
          blur: 3, // 그림자 블러 정도
          offsetX: 4, // 그림자 X축 이동
          offsetY: 0, // 그림자 Y축 이동
        }),
      });
      // 변경 사항을 캔버스에 적용
      canvas?.renderAll();
    }
};
export const applyShadow_2_0 = (canvas: fabric.Canvas | null) => {
    const activeObject = canvas?.getActiveObject();
  
    if (activeObject) {

      activeObject.set({
        shadow: new fabric.Shadow({
          color: '#000000', // 그림자 색상 (투명도 포함)
          blur: 3, // 그림자 블러 정도
          offsetX: -5, // 그림자 X축 이동
          offsetY: 5, // 그림자 Y축 이동
        }),
      });
      // 변경 사항을 캔버스에 적용
      canvas?.renderAll();
    }
};
export const applyShadow_2_1 = (canvas: fabric.Canvas | null) => {
    const activeObject = canvas?.getActiveObject();
  
    if (activeObject) {

      activeObject.set({
        shadow: new fabric.Shadow({
          color: '#000000', // 그림자 색상 (투명도 포함)
          blur: 3, // 그림자 블러 정도
          offsetX: 0, // 그림자 X축 이동
          offsetY: 4, // 그림자 Y축 이동
        }),
      });
      // 변경 사항을 캔버스에 적용
      canvas?.renderAll();
    }
}; 
export const applyShadow_2_2 = (canvas: fabric.Canvas | null) => {
    const activeObject = canvas?.getActiveObject();
  
    if (activeObject) {

      activeObject.set({
        shadow: new fabric.Shadow({
          color: '#000000', // 그림자 색상 (투명도 포함)
          blur: 3, // 그림자 블러 정도
          offsetX: 5, // 그림자 X축 이동
          offsetY: 5, // 그림자 Y축 이동
        }),
      });
      // 변경 사항을 캔버스에 적용
      canvas?.renderAll();
    }
}; 