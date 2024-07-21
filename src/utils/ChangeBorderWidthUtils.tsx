import { fabric } from 'fabric';

export const ChangeBorderWidthUtils = (
  canvas: fabric.Canvas | null,
  borderWidthValue: number,
) => {
  if (!canvas) {
    return;
  }

  const activeObject = canvas.getActiveObject();
  if (!activeObject) {
    return;
  }

  if (activeObject.type === 'rect') {
    console.log("사각형")
    activeObject.set('strokeWidth', borderWidthValue);

    const currentScaleX = activeObject.scaleX ?? 1;
    const currentScaleY = activeObject.scaleY ?? 1;
    const scaledWidth = activeObject.getScaledWidth();
    const scaledHeight = activeObject.getScaledHeight();

    activeObject.set('width', scaledWidth / currentScaleX);
    activeObject.set('height', scaledHeight / currentScaleY);

    canvas.renderAll();
  }

  if (activeObject.type === 'ellipse') {
    const left = activeObject.left;
    const top = activeObject.top;
    const rx = (activeObject.width ?? 0) / 2;
    const ry = (activeObject.height ?? 0) / 2;

    canvas.remove(activeObject);

    const newEllipse = new fabric.Ellipse({
      left: left,
      top: top,
      rx: rx + borderWidthValue / 2,
      ry: ry + borderWidthValue / 2,
      fill: activeObject.fill,
      strokeWidth: borderWidthValue,
      stroke: 'white',
    });

    canvas.add(newEllipse);
    canvas.renderAll();
  }

  if (activeObject.type === 'triangle') {
    activeObject.set('strokeWidth', borderWidthValue);

    const currentScaleX = activeObject.scaleX ?? 1;
    const currentScaleY = activeObject.scaleY ?? 1;
    const scaledWidth = activeObject.getScaledWidth();
    const scaledHeight = activeObject.getScaledHeight();

    activeObject.set('width', scaledWidth + borderWidthValue / currentScaleX);
    activeObject.set('height', scaledHeight + borderWidthValue / currentScaleY);

    canvas.renderAll();
  }
};
