import { fabric } from "fabric";
import "@/styles/animation.css";
import { BUTTON_ANIMATION_TEXTS } from "@/constants/buttonAnimationText";

interface LoadButtonProps {
  canvas: fabric.Canvas | null;
}

export default function Animation({ canvas }: LoadButtonProps) {
  function setElementName(name: string) {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set("name", name);
        canvas.renderAll();
      }
    }
  }

  return (
    <div className="animation-container">
      {Object.entries(BUTTON_ANIMATION_TEXTS).map(([key, text], index) => (
        <button
          key={key}
          onClick={() => setElementName(`animated-element${index + 1}`)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
