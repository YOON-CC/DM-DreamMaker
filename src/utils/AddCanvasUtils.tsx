import { fabric } from 'fabric';

export const addRectToCanvas = (canvas: fabric.Canvas) => {
    const newRect = new fabric.Rect({
        left: Math.random() * 400,
        top: Math.random() * 400,
        width: 100,
        height: 100,
        fill: '#4370FB',
        strokeWidth: 0, 
        shadow: new fabric.Shadow({
            color: 'rgba(0, 0, 0, 0)', // 그림자의 색상
            offsetX: 0, // 그림자의 가로 오프셋
            offsetY: 0, // 그림자의 세로 오프셋
            blur: 0, // 그림자의 흐릿함 정도
        }),
    });
    canvas.add(newRect);
};

export const addCircleToCanvas = (canvas: fabric.Canvas) => {
    const newCircle = new fabric.Ellipse({
        left: Math.random() * 400,
        top: Math.random() * 400,
        rx: 50, // 가로 반지름
        ry: 50, // 세로 반지름
        fill: '#4370FB',
        strokeWidth: 0, 
        shadow: new fabric.Shadow({
            color: 'rgba(0, 0, 0, 0)', // 그림자의 색상
            offsetX: 0, // 그림자의 가로 오프셋
            offsetY: 0, // 그림자의 세로 오프셋
            blur: 0, // 그림자의 흐릿함 정도
        }),
    });

    canvas.add(newCircle);
};

export const addTriangleToCanvas = (canvas: fabric.Canvas) => {
    const newTriangle = new fabric.Triangle({
        left: Math.random() * 400,
        top: Math.random() * 400,
        width: 100,
        height: 100,
        fill: '#4370FB',
        shadow: new fabric.Shadow({
            color: 'rgba(0, 0, 0, 0)', // 그림자의 색상
            offsetX: 0, // 그림자의 가로 오프셋
            offsetY: 0, // 그림자의 세로 오프셋
            blur: 0, // 그림자의 흐릿함 정도
        }),
    });

    canvas.add(newTriangle);
};

export const addTextboxToCanvas = (canvas: fabric.Canvas) => {
    const newTextbox = new fabric.Textbox('DreamMaker', {
    left: Math.random() * 400,
    top: Math.random() * 400,
    width: 100, 
    fontSize: 20,
    fill: '#4370FB',
    editable: true, 
    fontFamily: 'Arial', 
    textAlign: 'center', 
    shadow: new fabric.Shadow({
        color: 'rgba(0, 0, 0, 0)', // 그림자의 색상
        offsetX: 0, // 그림자의 가로 오프셋
        offsetY: 0, // 그림자의 세로 오프셋
        blur: 0, // 그림자의 흐릿함 정도
    }),
  });

  canvas.add(newTextbox);
  console.log("생성생성생성")
}

export const addImageToCanvas = (canvas: fabric.Canvas | null) => {
    // 파일 입력(input) 엘리먼트를 동적으로 생성
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // 이미지 파일만 선택 가능하도록 설정
  
    // 파일 선택 이벤트 처리
    input.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;
  
        if (files && files.length > 0) {
            const file = files[0];
  
            const reader = new FileReader();
  
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
        
                // 선택한 이미지를 캔버스에 추가
                fabric.Image.fromURL(imageUrl, (img) => {
                    img.scaleToWidth(100); // 원하는 너비로 조절
                    img.scaleToHeight(100); // 원하는 높이로 조절
        
                    img.set({
                        left: Math.random() * 200,
                        top: Math.random() * 200,
                    });
        
                    if (canvas) {
                        canvas.add(img);
                    }
                });
            };
  
            reader.readAsDataURL(file);
        }
    });
  
    // 파일 선택 다이얼로그 열기
    input.click();
};

export const addITextToCanvas = (canvas: fabric.Canvas) => {
    const newTextName = `INPUT_${canvas.getObjects('i-text').length + 1}`;
  
    const newText = new fabric.IText(newTextName, {
      left: Math.random() * 400,
      top: Math.random() * 400,
      width: 150,
      fontSize: 16,
      fill: '#4370FB',
      fontFamily: 'Arial',
      textAlign: 'left',
      shadow: new fabric.Shadow({
        color: 'rgba(0, 0, 0, 0)',
        offsetX: 0,
        offsetY: 0,
        blur: 0,
      }),
    });
  
    canvas.add(newText);
};

export const addButtonToCanvas = (canvas: fabric.Canvas) => {
    const newRect = new fabric.Rect({
        left: Math.random() * 400,
        top: Math.random() * 400,
        width: 100,
        height: 30,
        fill: '#DFDFDF', // 안의 색상을 빨간색으로 설정
        strokeWidth: 2, // 경계선의 너비를 5px로 설정
        stroke: '#606060', // 경계선 색상을 aqua로 설정
        rx: 5, // x축 모서리 반지름을 5px로 설정
        ry: 5, // y축 모서리 반지름을 5px로 설정
        shadow: new fabric.Shadow({
            color: 'rgba(0, 0, 0, 0)', // 그림자의 색상
            offsetX: 0, // 그림자의 가로 오프셋
            offsetY: 0, // 그림자의 세로 오프셋
            blur: 0, // 그림자의 흐릿함 정도
        }),
    });

    canvas.add(newRect);
};
