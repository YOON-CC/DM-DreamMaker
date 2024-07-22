import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import "../styles/savebutton.css";
import Swal from "sweetalert2";

interface SaveButtonProps {
  canvas: fabric.Canvas | null;
}

const SaveButton: React.FC<SaveButtonProps> = ({ canvas }) => {
  // const [shapeObjects, setShapeObjects] = useState<fabric.Object[]>([]);

  const handleSaveToLocalStorage = () => {
    if (canvas) {
      // 캔버스에 있는 모든 도형 정보를 수집하여 배열에 저장
      const objectsOnCanvas = canvas.getObjects();
      // setShapeObjects(objectsOnCanvas);

      // 배열을 JSON 문자열로 직렬화하여 로컬 스토리지에 저장
      const objectsJson = JSON.stringify(objectsOnCanvas);
      localStorage.setItem("canvasObjects", objectsJson);

      //배경색상 바꾸기
      const backgroundColor = canvas.backgroundColor || "#ffffff";
      localStorage.setItem("canvasBackgroundColor", backgroundColor.toString());
    }
    Swal.fire({
      title: "임시저장 완료",
      text: "HTTP(S), 애니메이션을 제외하고 저장되었습니다.",
      icon: "success",
      confirmButtonText: "확인",
      customClass: {
        confirmButton: "custom-confirm-button-class",
      },
    });
  };

  return (
    <button className="savebutton" onClick={handleSaveToLocalStorage}>
      임시저장
    </button>
  );
};

export default SaveButton;
