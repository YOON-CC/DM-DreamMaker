import { fabric } from 'fabric';

type ObjectSize = {
    width?: number;
    height?: number;
    rx?: number;
    ry?: number;
    // 더 많은 프로퍼티를 여기에 추가
};

export function handleScalingRect(activeObject: fabric.Object | null, setObjectCoordinates: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>, setObjectSize: React.Dispatch<React.SetStateAction<ObjectSize>>, canvas: fabric.Canvas) {
    if (activeObject instanceof fabric.Rect) {
        const scaleX = activeObject.scaleX ?? 1;
        const scaleY = activeObject.scaleY ?? 1;
        const width = activeObject.width ?? 0;
        const height = activeObject.height ?? 0;
        const left = activeObject.left ?? 0;
        const top = activeObject.top ?? 0;

        activeObject.set({
            width: width * scaleX,
            height: height * scaleY,
            scaleX: 1,
            scaleY: 1
        });

        setObjectCoordinates({ x: left, y: top });
        setObjectSize({ width, height });

        canvas.renderAll();
    }
}

export function handleScalingCircle(activeObject: fabric.Object | null, setObjectCoordinates: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>, setObjectSize: React.Dispatch<React.SetStateAction<ObjectSize>>, canvas: fabric.Canvas) {
    if (activeObject instanceof fabric.Ellipse) {
        const scaleX = activeObject.scaleX ?? 1;
        const scaleY = activeObject.scaleY ?? 1;
        const width = activeObject.width ?? 0;
        const height = activeObject.height ?? 0;
        const rx = activeObject.rx ?? 0;
        const ry = activeObject.ry ?? 0;
        const left = activeObject.left ?? 0;
        const top = activeObject.top ?? 0;
    
        activeObject.set({
            width: width * scaleX,
            height: height * scaleY,
            rx : rx*scaleX,
            ry : ry*scaleY,
            scaleX: 1,
            scaleY: 1
        });
    
        setObjectCoordinates({ x: left, y: top });
        setObjectSize({ width, height , rx, ry});
    
        canvas.renderAll();
    }
}

export function handleScalingTriangle(activeObject: fabric.Object | null, setObjectCoordinates: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>, setObjectSize: React.Dispatch<React.SetStateAction<ObjectSize>>, canvas: fabric.Canvas) {
    if (activeObject instanceof fabric.Triangle) {
        const scaleX = activeObject.scaleX ?? 1;
        const scaleY = activeObject.scaleY ?? 1;
        const width = activeObject.width ?? 0;
        const height = activeObject.height ?? 0;
        const left = activeObject.left ?? 0;
        const top = activeObject.top ?? 0;

        activeObject.set({
            width: width * scaleX,
            height: height * scaleY,
            scaleX: 1,
            scaleY: 1
        });
    
        setObjectCoordinates({ x: left, y: top });
        setObjectSize({ width, height });
    
        canvas.renderAll();
    }
}

export function handleScalingTextbox(activeObject: fabric.Object | null, setObjectCoordinates: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>, setObjectSize: React.Dispatch<React.SetStateAction<ObjectSize>>, canvas: fabric.Canvas) {
    if (activeObject instanceof fabric.Textbox) {
        const scaleX = activeObject.scaleX ?? 1;
        const scaleY = activeObject.scaleY ?? 1;
        const width = activeObject.width ?? 0;
        const height = activeObject.height ?? 0;
        const left = activeObject.left ?? 0;
        const top = activeObject.top ?? 0;

        activeObject.set({
            width: width * scaleX,
            height: height * scaleY,
            scaleX: 1,
            scaleY: 1
        });
    
        setObjectCoordinates({ x: left, y: top });
        setObjectSize({ width, height });
    
        canvas.renderAll();
    }
}