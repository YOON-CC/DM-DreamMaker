import { fabric } from 'fabric';

export const addRectToCanvas = (canvas: fabric.Canvas) => {
    const newRect = new fabric.Rect({
        left: Math.random() * 400,
        top: Math.random() * 400,
        width: 100,
        height: 100,
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        strokeWidth: 0, 
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