import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { HexColorPicker, HexColorInput   } from 'react-colorful';

import '../styles/editor.css';
import SaveButton from '../components/savebutton';
import LoadButton from '../components/loadbutton';
import DownloadButton from '../components/DownloadButton';
import Animation from '../components/Animation';
import { addRectToCanvas, addCircleToCanvas, addTriangleToCanvas, addTextboxToCanvas, addImageToCanvas, addITextToCanvas, addButtonToCanvas } from '../utils/AddCanvasUtils'; 
import { handleScalingRect, handleScalingCircle, handleScalingTriangle, handleScalingTextbox, handleScalingImage, handleScalingGroup } from '../utils/ScalingCanvasUtils';
import { handleChangeFontSizeInput, handleFontWeightChange, handleFontToItalicChange, handleFontShadowChange } from '../utils/FontOptionUtils';
import { applyShadow_0_0, applyShadow_0_1, applyShadow_0_2, applyShadow_1_0, applyShadow_1_1, applyShadow_1_2, applyShadow_2_0, applyShadow_2_1, applyShadow_2_2} from '../utils/ShadowUtils';
import { ChangeBorderWidthUtils } from '../utils/ChangeBorderWidthUtils';
import Swal from "sweetalert2";


type ObjectSize = {
  width?: number;
  height?: number;
  rx?: number;
  ry?: number;
  // 더 많은 프로퍼티를 여기에 추가
};

const Editor = () => {

  const copiedObjectRef = useRef<fabric.Object | null>(null);

  const [backgroundColorToggleBtn, setBackgroundColorToggleBtn] = useState(false); // 초기 배경색 설정

  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // 초기 배경색 설정

  
  const handleSetElementName = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
  
      if (activeObject) {
        // 선택된 객체의 이름을 "animated-element"로 설정
        activeObject.set('name', 'animated-element');
        canvas.renderAll();
      }
    }
  };

  const handleBackgroundColorChange = (newBackgroundColor: string) => {
    setBackgroundColor(newBackgroundColor);
    if (canvas) {
      canvas.setBackgroundColor(newBackgroundColor, canvas.renderAll.bind(canvas));
    }
  };

  //애니메이션 관련
  const [showAnimation, setShowAnimation] = useState(false);

  //api 관련
  const [selectedHttpMethod, setSelectedHttpMethod] = useState('');
  const [selectedHttpUrl, setSelectedHttpUrl] = useState('');
  const [selectedHttpTransport, setSelectedHttpTransport] = useState(-1);
  const [inputValues, setInputValues] = useState<string[]>([]); // 배열 추가

  console.log(inputValues)
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHttpUrl(event.target.value);
  };
  const handleKeyInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedTitles = [...inputValues];
    updatedTitles[index] = event.target.value;
    setInputValues(updatedTitles);
  };

  const [divCount, setDivCount] = useState(0);
  const generatedDivs = [];
  console.log("반복문", divCount)

  const addITextAndDiv = () => {
    if (divCount === 10){
      Swal.fire({
        title: '생성불가',
        text: '최대 10개까지만 생성 가능합니다!',
        icon: 'warning',
        confirmButtonText: '확인',
        customClass: {
          confirmButton: 'custom-confirm-button-class'
        }
      });
    }
    else{
      setDivCount(divCount + 1);
    }
  };

  const addITextAndDivDelete = () => {
    if (divCount > 0) {
      setDivCount(divCount - 1);
      setInputValues(inputValues.slice(0, -1)); // 마지막 원소 제거
    }
  };

  for (let i = 0; i < divCount; i++) {
    const keyName = `KEY NAME_${i + 1}`;
    generatedDivs.push(
      <div key={i} id='editor_body_left_input_container_info_container_frame'>
        <div id='editor_body_left_input_container_info_container_frame_title'>{keyName}</div>
        <input id='editor_body_left_input_container_info_container_frame_input' onChange={(event) => handleKeyInputChange(event, i)}></input>
      </div>
    );
  }

  const [showComplete, setShowComplete] = useState(false);

  const handleResetApiLogic = () => {
    setSelectedHttpMethod('');
    setSelectedHttpUrl('');
    setInputValues([]);
    setDivCount(0);
    setShowComplete(false);
    
    const inputElement = document.getElementById('urlInput')  as HTMLInputElement;
    if (inputElement && inputElement.value) {
      inputElement.value = '';
    }

  
    if (canvas) {
      canvas.forEachObject((object) => {
        if (object.type === 'group' && object.name && object.name.startsWith('api_')) {
          console.log("여기들어왔음");
          canvas.remove(object);
        }
      });
  
      canvas.requestRenderAll();
    }

    Swal.fire({
      title: '초기화 되었습니다.',
      text: 'api객체가 초기화 되었습니다.',
      icon: 'success',
      confirmButtonText: '확인',
      customClass: {
        confirmButton: 'custom-confirm-button-class'
      }
    });
  };
  
  
  
  //api 관련 끝
  

  const [shadowOptionToggle, setShadowOptionToggle] = useState(false);

  const [shadowColor, setShadowColor] = useState<string>('#000'); // Initial shadow color

  const handleShadowColorChange = (newShadowColor: string) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      setShadowColor(newShadowColor);
  
      // Check if there is a shadow applied to the object
      if (activeObject.shadow instanceof fabric.Shadow) {
        // Get the current blur value
        const currentBlur = activeObject.shadow.blur;
        const currentoffsetX = activeObject.shadow.offsetX;
        const currentoffsetY = activeObject.shadow.offsetY;
        activeObject.set({
          shadow: new fabric.Shadow({
            color: newShadowColor, // 그림자 색상 (투명도 포함)
            blur: currentBlur, // 그림자 블러 정도
            offsetX: currentoffsetX, // 그림자 X축 이동
            offsetY: currentoffsetY, // 그림자 Y축 이동
          }),
        });
      }
      canvas?.renderAll();
    }
  };
  
  
  const handleApplyShadow_0_0 = () => {
    applyShadow_0_0(canvas);
  };

  const handleApplyShadow_0_1 = () => {
    applyShadow_0_1(canvas);
  };
  const handleApplyShadow_0_2 = () => {
    applyShadow_0_2(canvas);
  };
  const handleApplyShadow_1_0 = () => {
    applyShadow_1_0(canvas);

  };
  const handleApplyShadow_1_1 = () => {
    applyShadow_1_1(canvas);
  };
  const handleApplyShadow_1_2 = () => {
    applyShadow_1_2(canvas);
  };
  const handleApplyShadow_2_0 = () => {
    applyShadow_2_0(canvas);
  };
  const handleApplyShadow_2_1 = () => {
    applyShadow_2_1(canvas);

  };
  const handleApplyShadow_2_2 = () => {
    applyShadow_2_2(canvas);
  };

  /*조정*/
  const [shadowSize, setShadowSize] = useState<number>(10); // Initial shadow size
  const [shadowOffsetX, setShadowOffsetX] = useState<number>(0); // Initial offsetX
  const [shadowOffsetY, setShadowOffsetY] = useState<number>(0); // Initial offsetY
  const handleShadowSizeChange = (newShadowSize: number) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      setShadowSize(newShadowSize);

      // Check if there is a shadow applied to the object
      if (activeObject.shadow instanceof fabric.Shadow) {
        activeObject.set({
          shadow: new fabric.Shadow({
            color: activeObject.shadow.color, // 그림자 색상 (투명도 포함)
            blur: newShadowSize, // 그림자 블러 정도를 새로운 값으로 설정
            offsetX: activeObject.shadow.offsetX, // 그림자 X축 이동
            offsetY: activeObject.shadow.offsetY, // 그림자 Y축 이동
          }),
        });
        canvas?.renderAll();
      }
    }
  };
  const handleShadowOffsetXChange = (newShadowOffsetX: number) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      setShadowOffsetX(newShadowOffsetX);

      // Check if there is a shadow applied to the object
      if (activeObject.shadow instanceof fabric.Shadow) {
        activeObject.set({
          shadow: new fabric.Shadow({
            color: activeObject.shadow.color, // 그림자 색상 (투명도 포함)
            blur: activeObject.shadow.blur, // 그림자 블러 정도
            offsetX: newShadowOffsetX, // 새로운 offsetX 값 설정
            offsetY: activeObject.shadow.offsetY, // 그림자 Y축 이동
          }),
        });
        canvas?.renderAll();
      }
    }
  };

  const handleShadowOffsetYChange = (newShadowOffsetY: number) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      setShadowOffsetY(newShadowOffsetY);

      // Check if there is a shadow applied to the object
      if (activeObject.shadow instanceof fabric.Shadow) {
        activeObject.set({
          shadow: new fabric.Shadow({
            color: activeObject.shadow.color, // 그림자 색상 (투명도 포함)
            blur: activeObject.shadow.blur, // 그림자 블러 정도
            offsetX: activeObject.shadow.offsetX, // 그림자 X축 이동
            offsetY: newShadowOffsetY, // 새로운 offsetY 값 설정
          }),
        });
        canvas?.renderAll();
      }
    }
  };


  //도형 shadow 버튼
  const [shadowToggle, setShadowToggle] = useState(false);


  const [fontFamily, setFontFamily] = useState('Arial'); // 초기 글꼴 설정
  const handleFontChange = (newFontFamily: string) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject instanceof fabric.Textbox) {
      setFontFamily(newFontFamily);
      activeObject.set('fontFamily', newFontFamily);
      canvas?.renderAll();
    }
    if (activeObject instanceof fabric.IText) {
      setFontFamily(newFontFamily);
      activeObject.set('fontFamily', newFontFamily);
      canvas?.renderAll();
    }
  };
  const [color, setColor] = useState('#000');
  const [borderColor, setBorderColor] = useState('#000');


  const [backgroundColorToggle, setBackgroundColorToggle] = useState(false);
  const [borderColorToggle, setBorderColorToggle] = useState(false);
  const [shadowColorToggle, setShadowColorToggle] = useState(false);
  console.log(color)
  //도형 툴바
  const [showTool, setShowTool] = useState(true);

  const [objectCoordinates, setObjectCoordinates] = useState({ x: 0, y: 0 });
  const [objectCoordinates_center, setObjectCoordinates_center] = useState({ center_x: 0, center_y: 0 });

  const [objectSize, setObjectSize] = useState<ObjectSize>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  
  // 토글 닫기
  canvas?.on('mouse:up', (options) => {
    if (showTool === false){
      setShowTool(!showTool)
    }
    if (showAnimation === true){
      setShowAnimation(!showAnimation)
    }
    if (backgroundColorToggleBtn === true){
      setBackgroundColorToggleBtn(!backgroundColorToggleBtn)
    }
    if (backgroundColorToggle === true){
      setBackgroundColorToggle(!backgroundColorToggle)
    }
    if (borderColorToggle === true){
      setBorderColorToggle(!borderColorToggle)
    }
    if (shadowToggle === true){
      setShadowToggle(!shadowToggle)
    }
    if (shadowOptionToggle === true){
      setShadowOptionToggle(!shadowOptionToggle)
    }
    if (shadowColorToggle === true){
      setShadowColorToggle(!shadowColorToggle)
    }
  });
  
  const handleChangeComplete = (newColor: string) => {
    const activeObject = canvas?.getActiveObject();
  
    if (activeObject) {
      setColor(newColor);
      activeObject.set('fill', newColor);
      canvas?.renderAll();
    }
  };

  const handleChangeBorderColor = (newBorderColor: string) => {
    const activeObject = canvas?.getActiveObject();
  
    if (activeObject) {
      setBorderColor(newBorderColor)
      activeObject.set('stroke', newBorderColor);
      canvas?.renderAll();
    }
  };
  

  useEffect(() => { 
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      canvas.setBackgroundColor('#ffffff', canvas.renderAll.bind(canvas));
      const canvasWidth = 1000;
      const canvasHeight = 2000;
      const grid = 10;

      
      for (let i = 0; i <= canvasHeight / grid; i++) {
        const isRedLine = (i % 50 === 0); // 50의 배수인 가로줄을 빨간색으로 설정
        const lineColor = isRedLine ? '#ff9e9e' : '#f1f1f1';
      
        canvas.add(
          new fabric.Line([0, i * grid, canvasWidth, i * grid], {
            stroke: lineColor,
            selectable: false,
          })
        );
      }

      for (let i = 0; i <= canvasWidth / grid; i++) {
        canvas.add(
          new fabric.Line([i * grid, 0, i * grid, canvasHeight], {
            stroke: '#f1f1f1',
            selectable: false,
          })
        );
      }

      //변경
      canvas.on('mouse:up', (options) => {

        const activeObject = canvas.getActiveObject();

        //기존에 미리 다 보이게 
        const Elements1 = document.getElementsByClassName('editor_body_right_style_container_1_info_container') as HTMLCollectionOf<HTMLElement>;
        const Elements2 = document.getElementsByClassName('editor_body_right_style_container_2_info_container') as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < Elements1.length; i++) {
            Elements1[i].style.display = 'flex';
        }

        for (let i = 0; i < Elements2.length; i++) {
          Elements2[i].style.display = 'flex'; 
        }


        //객체
        if (activeObject && activeObject.type === 'textbox') {
          for (let i = 0; i < Elements1.length; i++) {
            if (i === 0 || i === 1 || i === 2 || i === 3)
            Elements1[i].style.display = 'none';
          }
          for (let i = 0; i < Elements2.length; i++) {
            if (i === 1 || i === 2)
            Elements2[i].style.display = 'none';
          }
          canvas.renderAll(); 
        }
        else if (activeObject && activeObject.type === 'i-text') {
          for (let i = 0; i < Elements1.length; i++) {
            if (i === 0 || i === 1 || i === 2 || i === 3)
            Elements1[i].style.display = 'none';
          }
          for (let i = 0; i < Elements2.length; i++) {
            if (i === 1 || i === 2)
            Elements2[i].style.display = 'none';
          }
          canvas.renderAll(); 
        }
        else if (activeObject && (activeObject.type === 'image' || activeObject.type === 'group')) {
          for (let i = 0; i < Elements1.length; i++) {
            Elements1[i].style.display = 'none';
          }
          for (let i = 0; i < Elements2.length; i++) {
            Elements2[i].style.display = 'none';
          }
          canvas.renderAll(); 
        }
        else if (activeObject && (activeObject.type === 'rect')) {

          for (let i = 0; i < Elements1.length; i++) {
            if (i === 4 || i === 5){
              Elements1[i].style.display = 'none'; 
            }
          }

          for (let i = 0; i < Elements2.length; i++) {
            if (i === 3){
              Elements2[i].style.display = 'none'; 
            }
          }
          canvas.renderAll(); 
        }
        else if (activeObject && (activeObject.type === 'ellipse')) {

          for (let i = 0; i < Elements1.length; i++) {
            if (i === 0 || i === 4 || i === 5){
              Elements1[i].style.display = 'none'; 
            }
          }

          for (let i = 0; i < Elements2.length; i++) {
            if (i === 3){
              Elements2[i].style.display = 'none'; 
            }
          }
          canvas.renderAll(); 
        }
        else if (activeObject && (activeObject.type === 'triangle')) {

          for (let i = 0; i < Elements1.length; i++) {
            if (i === 0 || i === 1 || i === 4 || i === 5){
              Elements1[i].style.display = 'none'; 
            }
          }

          for (let i = 0; i < Elements2.length; i++) {
            if (i === 1 ||i === 3){
              Elements2[i].style.display = 'none'; 
            }
          }
          canvas.renderAll(); 
        }
      });
      
      

      canvas.on('object:moving', (options) => {
        const target = options.target as fabric.Object;
        target.set({
          left: Math.round(target.left! / grid) * grid,
          top: Math.round(target.top! / grid) * grid,
        });
      });


      canvas.on('object:moving', (e: fabric.IEvent) => {
        const movedObject = e.target as fabric.Object;
        const x = movedObject.left ?? 0;
        const y = movedObject.top ?? 0;
        const centerX = (movedObject.left ?? 0) + (movedObject.width ?? 0) / 2;
        const centerY = (movedObject.top ?? 0) + (movedObject.height ?? 0) / 2;
        setObjectCoordinates({ x, y });
        setObjectCoordinates_center({ center_x: centerX, center_y: centerY });
        console.log(centerX, centerY);
      });
      

      //도형 생성
      const handleAddRect = () => {if (canvas) {addRectToCanvas(canvas);}};
      const handleAddCircle = () => {if (canvas) { addCircleToCanvas(canvas);}};
      const handleAddTriangle = () => {if (canvas) {addTriangleToCanvas(canvas);}};
      const handleAddTextbox = () => {if (canvas) {addTextboxToCanvas(canvas);}};
      const handleAddImageShape = () => { if(canvas) {addImageToCanvas(canvas);}};
      const handleAddITextShape = () => { if(canvas) {addITextToCanvas(canvas);}};
      const handleAddButtonShape = () => { if(canvas) {addButtonToCanvas(canvas);}};
      
      //도형 스케일링
      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Rect;
        handleScalingRect(activeObject, setObjectCoordinates, setObjectSize, canvas, grid);
      });

      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Ellipse;
        handleScalingCircle(activeObject, setObjectCoordinates, setObjectSize, canvas, grid);
      });

      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Triangle;
        handleScalingTriangle(activeObject, setObjectCoordinates, setObjectSize, canvas, grid); 
      });
      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Textbox;
        handleScalingTextbox(activeObject, setObjectCoordinates, setObjectSize, canvas, grid);
      });
      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Image;
        handleScalingImage(activeObject, setObjectCoordinates, setObjectSize, canvas, grid);
      });
      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Group;
        handleScalingGroup(activeObject, setObjectCoordinates, setObjectSize, canvas, grid);
      });

      const handleDeleteSelectedObjects = () => {
        const selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length > 0) {
          selectedObjects.forEach(object => {
            if (!(object instanceof fabric.IText)) {
              // 선택된 객체가 IText가 아닌 경우에만 삭제
              canvas.remove(object);
            }
            if ((object instanceof fabric.Textbox)) {
              // 선택된 객체가 IText가 아닌 경우에만 삭제
              canvas.remove(object);
            }
          });
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      };
      

      const handleKeyboardDelete = (event: KeyboardEvent) => {
        if (event.key === 'Delete') {
          handleDeleteSelectedObjects();
        }
      };

      const handleSendBackwards = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.sendBackwards(activeObject);
        }
      };

      const handleBringForward = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.bringForward(activeObject);
        }
      };
   
      const handleChangeRadiusInput = () => {
        const radiusInput = document.getElementById("radius-input") as HTMLInputElement;
        const borderRadiusInput = radiusInput.value;
        const borderRadius = parseFloat(borderRadiusInput) || 0;
      
        const activeObject = canvas.getActiveObject();
        if (activeObject instanceof fabric.Rect) {
          const scaleX = activeObject.scaleX ?? 1;
          const scaleY = activeObject.scaleY ?? 1;
      
          const scaledWidth = activeObject.getScaledWidth();
          const scaledHeight = activeObject.getScaledHeight();
      
          const newRx = Math.min(borderRadius * scaleX, scaledWidth / 2);
          const newRy = Math.min(borderRadius * scaleY, scaledHeight / 2);
      
          activeObject.set('rx', newRx);
          activeObject.set('ry', newRy);
          canvas.renderAll();
        }
      };

      const handleChangeBorderWidthInput = () => {
        const borderWidthInput = document.getElementById("borderwidth-input") as HTMLInputElement;
        const borderWidthValue = parseInt(borderWidthInput.value);
        if (isNaN(borderWidthValue)) {
          console.log("유효하지 않은 경계선 두께입니다.");
          return;
        }
        ChangeBorderWidthUtils(canvas, borderWidthValue); // 함수 호출
      };

      //폰트 컨트롤
      const handleChangeFontSize = () => {
        handleChangeFontSizeInput(canvas);
      };
    
      const handleFontWeight = () => {
        handleFontWeightChange(canvas);
      };
    
      const handleFontToItalic = () => {
        handleFontToItalicChange(canvas);
      };
    
      const handleFontShadow = () => {
        handleFontShadowChange(canvas);
      };
      
      //복사 붙여넣기
      const handleCopyObject = () => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject?.type === 'activeSelection'){ // activeSelection인 객체는 복사 안되도록하는 로직
          return;
        }
        console.log(activeObject?.type)
        if (activeObject) {
          activeObject.clone((clonedObject: fabric.Object) => {
            clonedObject.set({
              left: (activeObject.left?? 0)+20, // 복사된 도형의 위치를 이동하여 겹치지 않게 함
              top: (activeObject.top ?? 0)+0,
            });
            copiedObjectRef.current = clonedObject; // 복사된 객체를 저장
          });
        }
      };

      const handlePasteObject = () => {
        const copiedObject = copiedObjectRef.current;
        if (copiedObject) {
          canvas?.add(copiedObject); // 복사된 도형을 캔버스에 추가
          canvas?.setActiveObject(copiedObject); // 복사된 도형을 선택 상태로 설정
          canvas?.renderAll(); // 캔버스 업데이트
          copiedObjectRef.current = null; // 붙여넣기 후에 초기화
        }
      };
      const handleCopy = (event: KeyboardEvent) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
          handleCopyObject()
          console.log("복사")
        }
      };
      const handlePaste = (event: KeyboardEvent) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
          handlePasteObject()
          console.log("붙여넣기")
        }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        const activeObject = canvas?.getActiveObject();



        if (activeObject) {
          const moveDistance = 2;
          const centerX = (activeObject.left ?? 0) + (activeObject.width ?? 0) / 2;
          const centerY = (activeObject.top ?? 0) + (activeObject.height ?? 0) / 2;
          setObjectCoordinates({ x : activeObject.left??0 , y : activeObject.top??0});
          setObjectCoordinates_center({ center_x: centerX, center_y: centerY });
          switch (event.key) {
            case 'ArrowUp':
              activeObject.set('top', (activeObject.top ?? 0) - moveDistance);
              break;
            case 'ArrowDown':
              activeObject.set('top', (activeObject.top ?? 0) + moveDistance);
              break;
            case 'ArrowLeft':
              activeObject.set('left', (activeObject.left ?? 0) - moveDistance);
              break;
            case 'ArrowRight':
              activeObject.set('left', (activeObject.left ?? 0) + moveDistance);
              break;
            default:
              return; 
          }
          canvas?.renderAll();
        }
      };
      
      const handleObjectToGroup = () => {
        const activeObject = canvas.getActiveObject() as fabric.ActiveSelection;

        if (!activeObject) {
          return;
        }
  
        if (activeObject.type !== 'activeSelection') {
          return;
        }

        if (activeObject) {
          const groupNum = activeObject.getObjects().filter(obj => obj?.type === 'group').length;
    
          if (groupNum > 0) {
            Swal.fire({
              title: '그룹설정 실패',
              text: '기존의 그룹은 다른 그룹으로 묶일 수 없습니다.',
              icon: 'warning',
              confirmButtonText: '확인',
              customClass: {
                confirmButton: 'custom-confirm-button-class'
              }
            });
            return;
          }
        }

        (activeObject as fabric.ActiveSelection).toGroup();
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      };
      

      const handleObjectUngroup = () => {
        const activeObject = canvas.getActiveObject();
      
        if (!activeObject || activeObject.type !== 'group') {
          return;
        }
      
        const group = activeObject as fabric.Group;
        const objectsInGroup = group.getObjects();
      
        const groupLeft = group?.left ?? 0;
        const groupTop = group?.top ?? 0;
      
        objectsInGroup.forEach((object) => {
          const objectLeft = object?.left ?? 0;
          const objectTop = object?.top ?? 0;
          
          const originalWidth = (object.scaleX??0)*100;
          const originalHeight = (object.scaleY??0)*100;
      
          console.log((object.scaleX??0)*100, (object.scaleY??0)*100,"크기 입니다")

          console.log("위치",group.top, group.left, "객체", object.left, object.top)
          const relativePosition = {
            left: objectLeft + groupLeft,
            top: objectTop + groupTop,
          };
      
      
          console.log("원래 그룹의 위치", group.left, group.top)
          if (object.type == 'ellipse'){
            object.set({
              left: relativePosition.left,
              top: relativePosition.top,
              rx: originalWidth/2,
              ry: originalHeight/2,
              scaleX: 1,
              scaleY: 1,
            } as fabric.Ellipse);
          }
          else{
            object.set({
              left: relativePosition.left,
              top: relativePosition.top,
              width: originalWidth,
              height: originalHeight,
              scaleX: 1,
              scaleY: 1,
            });
          }

          console.log(object)
          canvas.add(object);
        });
      
        canvas.remove(group);
      
        canvas.setActiveObject(new fabric.ActiveSelection(objectsInGroup, {
          canvas: canvas,
        }));
        canvas.requestRenderAll();
      };
      

      

      let nameCounter = 1; // 이름 카운터 변수

      const handleObjectToApi = () => {
        try {
          const activeObject = canvas.getActiveObject() as fabric.ActiveSelection;
          console.log(activeObject)
          
          if (!activeObject) {
            return;
          }
      
          if (activeObject) {
            const numIText = activeObject.getObjects().filter(obj => obj?.type === 'i-text').length;
            const numRect = activeObject.getObjects().filter(obj => obj?.type === 'rect').length;
      
            if (numIText < 1 || numRect !== 1) {
              throw new Error();
            }
          }
      
          if (activeObject.type === 'activeSelection') {
            const group = (activeObject as fabric.ActiveSelection).toGroup();
            group.set('name', `api_${nameCounter}`);
            canvas.discardActiveObject();
            canvas.requestRenderAll();
      
            // 이름 카운터 증가
            nameCounter++;
            Swal.fire({
              title: 'api객체 생성',
              text: 'api객체가 생성되었습니다.',
              icon: 'success',
              confirmButtonText: '확인',
              customClass: {
                confirmButton: 'custom-confirm-button-class'
              }
            });
            setShowComplete(!showComplete);
          }
        } catch (error) {
          Swal.fire({
            title: '생성실패',
            text: '생성조건 : 입력요소 1개 이상 / 버튼 1개만',
            icon: 'error',
            confirmButtonText: '확인',
            customClass: {
              confirmButton: 'custom-confirm-button-class'
            }
          });
        }
      };
      

      const handleDeleteITextShape = () => {
        if (canvas instanceof fabric.Canvas) {
          const iTextObjects = canvas.getObjects('i-text');
      
          const sortedITextObjects = [...iTextObjects].reverse();
      
          if (sortedITextObjects.length > 0) {
            const latestIText = sortedITextObjects[0];
            canvas.remove(latestIText);
            canvas.renderAll();
          }
        }
      };
      

      document.addEventListener('keydown', handleCopy);
      document.addEventListener('keydown', handlePaste);
      document.addEventListener('keydown', handleKeyDown);

      const changeFontSizeInputButton = document.getElementById('change-fontsize-input-button');
      changeFontSizeInputButton?.addEventListener('click', handleChangeFontSize);

      const changeRadiusInputButton = document.getElementById('change-radius-input-button');
      changeRadiusInputButton?.addEventListener('click', handleChangeRadiusInput);

      const changeBorderWidthInputButton = document.getElementById('change-borderwidth-input-button');
      changeBorderWidthInputButton?.addEventListener('click', handleChangeBorderWidthInput);
    

      
      document.addEventListener('keydown', handleKeyboardDelete);

      const addButton = document.getElementById('add-button');
      addButton?.addEventListener('click', handleAddRect);


      const addCircleButton = document.getElementById('add-circle-button');
      addCircleButton?.addEventListener('click', handleAddCircle);

      const addTriangleButton = document.getElementById('add-triangle-button');
      addTriangleButton?.addEventListener('click', handleAddTriangle);

      const addTextboxButton = document.getElementById('add-textbox-button');
      addTextboxButton?.addEventListener('click', handleAddTextbox);

      const deleteButton = document.getElementById('delete-button');
      deleteButton?.addEventListener('click', handleDeleteSelectedObjects);

      const sendBackwardsButton = document.getElementById('send-backwards-button');
      sendBackwardsButton?.addEventListener('click', handleSendBackwards);

      const bringForwardButton = document.getElementById('bring-forward-button');
      bringForwardButton?.addEventListener('click', handleBringForward);

      const addImageShapeButton = document.getElementById('add-image-shape-button');
      addImageShapeButton?.addEventListener('click', handleAddImageShape);

      const addITextShapeButton = document.getElementById('add-IText-shape-button');
      addITextShapeButton?.addEventListener('click', handleAddITextShape);

      const deleteITextShapeButton = document.getElementById('delete-IText-shape-button');
      deleteITextShapeButton?.addEventListener('click', handleDeleteITextShape);

      const addButtonShapeButton = document.getElementById('add-Button-shape-button');
      addButtonShapeButton?.addEventListener('click', handleAddButtonShape);

      const objectToGroup = document.getElementById('add-group-button');
      objectToGroup?.addEventListener('click', handleObjectToGroup);

      const objectforapi = document.getElementById('for_api');
      objectforapi?.addEventListener('click', handleObjectToApi);

      const objectUnGroup = document.getElementById('add-ungroup-button');
      objectUnGroup?.addEventListener('click', handleObjectUngroup);

      const fontWeightButton = document.getElementById('change-fontWeight-button');
      fontWeightButton?.addEventListener('click', handleFontWeight);

      const fontItalicButton = document.getElementById('change-fontItalic-button');
      fontItalicButton?.addEventListener('click', handleFontToItalic);

      const fontShadowButton = document.getElementById('change-fontShadow-button');
      fontShadowButton?.addEventListener('click', handleFontShadow);



      setCanvas(canvas);


      return () => {
        canvas.dispose();
        canvas.off('object:moving');
        addImageShapeButton?.removeEventListener('click', handleAddImageShape);

        document.removeEventListener('keydown', handleKeyboardDelete);
        document.removeEventListener('keydown', handleCopy);
        document.removeEventListener('keydown', handlePaste);
        document.removeEventListener('keydown', handleKeyDown);

        addButton?.removeEventListener('click', handleAddRect);        
        addCircleButton?.removeEventListener('click', handleAddCircle);
        addTriangleButton?.removeEventListener('click', handleAddTriangle);
        addTextboxButton?.removeEventListener('click', handleAddTextbox);
        addITextShapeButton?.removeEventListener('click', handleAddITextShape);
        addITextShapeButton?.removeEventListener('click', handleDeleteITextShape);
        addButtonShapeButton?.removeEventListener('click', handleAddButtonShape);
        deleteButton?.removeEventListener('click', handleDeleteSelectedObjects);
        sendBackwardsButton?.removeEventListener('click', handleSendBackwards);
        bringForwardButton?.removeEventListener('click', handleBringForward);
        fontWeightButton?.removeEventListener('click', handleFontWeight);
        fontItalicButton?.removeEventListener('click', handleFontToItalic);
        fontShadowButton?.removeEventListener('click', handleFontShadow);
        // applyShadowButton_2_2?.removeEventListener('click', handleApplyShadow_2_2);
      };
    }
  }, []);

  return (
    <div className='body'>
      <div className='body_cover'>
        <img className = "body_cover_logo" src="../images/logo.png"/>
        <div className="body_cover_text">전체화면 그리고 화면비율을 🔍축소해서 사용해주세요.</div>
      </div>
      {showAnimation && (<Animation canvas={canvas}></Animation>)}
      <div className='editor_header'>
        <div className='editor_header_logo_container'>
          <img src="../images/dreammakerLogo.png" style={{ width: "70%", height: "80%" , marginLeft: "5%", marginTop:'1.5%'}} />
        </div>
        <div className='editor_header_tool_container'>
          <div className='editor_header_tool_container_btn' onClick={() =>setShowTool(!showTool)}>
            <img src="../images/figures.png" style={{ width: "60%", height: "80%", marginTop:"8%", marginLeft:"19%"}} />
          </div>
          <div id="add-textbox-button" onClick={() => !showTool && setShowTool(true)}>
            <img src="../images/text.png" style={{ width: "67%", height: "80%", marginTop:"8.2%", marginLeft:"17%"}} />
          </div>
          <div id='add-image-shape-button'>
            <img src="../images/photo.png" style={{ width: "67%", height: "80%", marginTop:"8%", marginLeft:"16%"}} />
          </div>
          <div id='add-animation-button' onClick={() => setShowAnimation(!showAnimation)}>
            <img src="../images/animation.png" style={{ width: "67%", height: "80%", marginTop:"6%", marginLeft:"16%"}} />
          </div>
          <div id='add-group-button'>
            <img src="../images/group.png" style={{ width: "67%", height: "80%", marginTop:"8%", marginLeft:"16%"}} />
          </div>
          <div id='add-ungroup-button'>
            <img src="../images/ungroup.png" style={{ width: "67%", height: "80%", marginTop:"8%", marginLeft:"16%"}} />
          </div>
        </div>

          
        <div className='editor_header_button_container'>
          <LoadButton canvas={canvas}></LoadButton>
          <SaveButton canvas={canvas}></SaveButton>
          <DownloadButton canvas={canvas}
                          selectedHttpMethod={selectedHttpMethod}
                          selectedHttpUrl={selectedHttpUrl}
                          selectedHttpTransport={selectedHttpTransport}
                          inputValues={inputValues}
          />
           
        </div>
      </div>

      <div className='editor_body'>
        <div className='editor_body_toolbox'>
          <button id="add-button"></button>
          <button id="add-circle-button"></button>
          <img id="add-triangle-button"  src="../images/triangle.png"/>
        </div>
        {showTool && (<div className='editor_body_toolbox_cover'></div>)}

        <div className='editor_body_left'>
          {showComplete && (
            <div className="apiComplete">
              <div className="apiComplete_title">API객체 생성완료</div>
              <div className="apiComplete_HttpMethod">
                <div className='apiComplete_HttpMethod_icon'></div>
                <div className='apiComplete_HttpMethod_text'>Method</div>
              </div>
              <div className='apiComplete_HttpMethod_content'>
                <div>{selectedHttpMethod}</div>
              </div>
              
              
              <div className="apiComplete_URL">
                <div className='apiComplete_URL_icon'></div>
                <div className='apiComplete_URL_text'>Url</div>
              </div>
              <div className='apiComplete_URL_content'>
                <div>{selectedHttpUrl}</div>
              </div>

              <div className="apiComplete_inputValue">
                <div className='apiComplete_inputValue_icon'></div>
                <div className='apiComplete_inputValue_text'>Key</div>
              </div>
              <div className='apiComplete_inputValue_list'>
                  {inputValues.map((value, index) => (
                    <div key={index}>{value}</div>
                  ))}
              </div>
              <div className='apiCompleteToClear' onClick={handleResetApiLogic}>초기화</div>
            </div>
          )}
          
          <div className='editor_body_left_http_container'>
            <div className='editor_body_left_http_container_title'>HTTP(S) 메서드</div>
            <div className='editor_body_left_http_container_info_container'>
              <button className='editor_body_left_http_container_info_container_title_1' onClick={()=> setSelectedHttpMethod('GET')} style={{backgroundColor: selectedHttpMethod === 'GET' ? '#4370FB' : 'rgb(63, 63, 63)'}}>GET</button>
              <button className='editor_body_left_http_container_info_container_title_2' onClick={()=> setSelectedHttpMethod('POST')} style={{backgroundColor: selectedHttpMethod === 'POST' ? '#4370FB' : 'rgb(63, 63, 63)'}}>POST</button>
            </div>
          </div>
          <div className='editor_body_left_url_container'>
            <div className='editor_body_left_url_container_title'>URL</div>
            <div className='editor_body_left_url_container_info_container'>
              <input id = "urlInput"onChange={handleUrlChange}></input>
            </div>
          </div>
          {/* <div className='editor_body_left_transport_container'>
            <div className='editor_body_left_transport_container_title'>전송방식</div>
            <div className='editor_body_left_transport_container_info_container'>
              <button className='editor_body_left_transport_container_info_container_title_1' onClick={()=> setSelectedHttpTransport(0)} style={{backgroundColor: selectedHttpTransport === 0 ? '#4370FB' : 'rgb(63, 63, 63)'}}>Body</button>
              <button className='editor_body_left_transport_container_info_container_title_2' onClick={()=> setSelectedHttpTransport(1)} style={{backgroundColor: selectedHttpTransport === 1 ? '#4370FB' : 'rgb(63, 63, 63)'}}>Quary String</button>
              <button className='editor_body_left_transport_container_info_container_title_2' onClick={()=> setSelectedHttpTransport(2)} style={{backgroundColor: selectedHttpTransport === 2 ? '#4370FB' : 'rgb(63, 63, 63)'}}>Path</button>
            </div>
          </div> */}
          <div className='editor_body_left_input_container'>
            <div className='editor_body_left_input_container_title'>입력요소 추가</div>
            <div className='editor_body_left_input_container_info_container'>
              {generatedDivs}
              <div className='editor_body_left_input_container_info_container_btn_container'>
                <button id="add-IText-shape-button" onClick={addITextAndDiv}>추가</button>
                <button id="delete-IText-shape-button" onClick={addITextAndDivDelete}>삭제</button>
              </div>
              <div className='editor_body_left_input_container_end_line'></div>
              <div className='editor_body_left_input_container_title' style={{ marginTop: `10px` }}>버튼 추가</div>
              <div className='editor_body_left_input_container_info_container_btn_container2'>
                <button id="add-Button-shape-button">추가</button>
              </div>
              <div className='editor_body_left_input_container_end_line'></div>
              <div className='editor_body_left_apply_container'>

              {(selectedHttpMethod === '' || selectedHttpUrl === '' || inputValues.length === 0 || inputValues.length !== divCount || inputValues.some(value => value.trim().length === 0))  && (
                <div className='api_btn_cover'>생성하기</div>
              )}

              <button id="for_api">생성하기</button>

              </div>
            </div>
          </div>
        </div>
        <div className='editor_body_center'>

          <div className='editor_body_style_container_info_container'>

            <div className='editor_body_style_container_info_container_title'>background color</div>
            <div className='editor_body_style_container_info_container_frame'>
              <HexColorInput className="editor_body_style_container_info_container_container_info" color={backgroundColor} onChange={handleBackgroundColorChange} />
              <div className='editor_select_color_btn' onClick={()=> setBackgroundColorToggleBtn(!backgroundColorToggleBtn)}></div>
            </div>
          </div>
            {backgroundColorToggleBtn && (
              <section className="background_color_controller">
                <HexColorPicker color={backgroundColor} onChange={handleBackgroundColorChange} />
              </section>
            )}

            {/* <div className='X_line'>
              <div className='X_value' style={{ marginLeft: `${objectCoordinates_center.center_x}px` }}></div>
            </div>
            <div className='Y_line'>
              <div className='Y_value' style={{ marginTop: `${objectCoordinates_center.center_y}px` }}></div>
            </div> */}
          <div className='canvas_container'>
            <canvas ref={canvasRef}  width={1000} height={2000}></canvas>
          </div>
        </div>
        <div className='editor_body_right'>
          <div className='editor_body_right_size_container'>
            <div className='editor_body_right_size_container_title'>사이즈</div>
            <div className='editor_body_right_size_container_info_container'>
              <div className='editor_body_right_size_container_info_container_title_1'>W</div>
              <div className='editor_body_right_size_container_info_container_info_1'>{objectSize.width !== undefined ? objectSize.width.toFixed(2) : "N/A"}</div>
              <div className='editor_body_right_size_container_info_container_title_2'>H</div>
              <div className='editor_body_right_size_container_info_container_info_2'>{objectSize.height !== undefined ? objectSize.height.toFixed(2) : "N/A"}</div>
            </div>
          </div>
          <div className='editor_body_right_location_container'>
            <div className='editor_body_right_location_container_title'>위치</div>
            <div className='editor_body_right_location_container_info_container'>
              <div className='editor_body_right_location_container_info_container_title_1'>X</div>
              <div className='editor_body_right_location_container_info_container_info_1'>{objectCoordinates_center.center_x.toFixed(2)}</div>
              <div className='editor_body_right_location_container_info_container_title_2'>Y</div>
              <div className='editor_body_right_location_container_info_container_info_2'>{objectCoordinates_center.center_y.toFixed(2)}</div>
            </div>
          </div>
          <div className='editor_body_right_order_container'>
            <div className='editor_body_right_order_container_title'>레이어 순서</div>
            <div className='editor_body_right_order_container_info_container'>
              <button id="bring-forward-button">앞으로 보내기</button>
              <button id="send-backwards-button">뒤로 보내기</button>
            </div>
          </div>
          <div className='editor_body_right_style_container'>
            <div className='editor_body_right_style_container_title'>스타일</div>
            <div className='editor_body_right_style_container_2_info_container'>
              <div className='editor_body_right_style_container_2_info_container_title'>background color</div>
              <div className='editor_body_right_style_container_2_info_container_frame'>
                <HexColorInput className="editor_body_right_style_container_2_info_container_info" color={color} onChange={handleChangeComplete} />
                <div className='editor_select_color_btn' onClick={()=> setBackgroundColorToggle(!backgroundColorToggle)}></div>
              </div>
            </div>
            <div className='editor_body_right_style_container_1_info_container'>
              <div className='editor_body_right_style_container_1_info_container_title'>border radius</div>
              <div className='editor_body_right_style_container_1_info_container_btn'>
                <input id="radius-input" maxLength={3}/>
                <button id="change-radius-input-button">적용</button>
              </div>
            </div>
            <div className='editor_body_right_style_container_1_info_container'>
              <div className='editor_body_right_style_container_1_info_container_title'>border width</div>
              <div className='editor_body_right_style_container_1_info_container_btn'>
                <input id="borderwidth-input" maxLength={3}/>
                <button id="change-borderwidth-input-button">적용</button>
              </div>
            </div>

            <div className='editor_body_right_style_container_2_info_container'>
              <div className='editor_body_right_style_container_2_info_container_title'>border color</div>
              <div className='editor_body_right_style_container_2_info_container_frame'>
                <HexColorInput className="editor_body_right_style_container_2_info_container_info" color={borderColor} onChange={handleChangeBorderColor} />
                <div className='editor_select_color_btn' onClick={()=> setBorderColorToggle(!borderColorToggle)}></div>
              </div>
            </div>

            <div className='editor_body_right_style_container_1_info_container'>
              <div className='editor_body_right_style_container_1_info_container_title'>shadow</div>
              <div className='editor_body_right_style_container_1_info_container_btn'>
                <button id="select-shadow-button" onClick={()=> setShadowToggle(!shadowToggle)}>select</button>
              </div>
            </div>

            <div className='editor_body_right_style_container_1_info_container'>
              <div className='editor_body_right_style_container_1_info_container_title'>shadow option</div>
              <div className='editor_body_right_style_container_1_info_container_btn'>
                <button id="select-shadow-button" onClick={() => setShadowOptionToggle(!shadowOptionToggle)}>select</button>
              </div>
            </div>
            

            {/* 버튼 클릭시 토글*/}
            {shadowOptionToggle && (
            <>
              <div className='shadow_size_controll_container'>
                <div className='shadow_size_controll_container_frame'>
                  <label>shadow Size:</label>
                  <div>{shadowSize}px</div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={shadowSize}
                  onChange={(e) => handleShadowSizeChange(parseInt(e.target.value))}
                />

                <div className='shadow_size_controll_container_frame'>
                  <label>offsetX:</label>
                  <div>{shadowOffsetX}px</div>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowOffsetX}
                  onChange={(e) => handleShadowOffsetXChange(parseInt(e.target.value))}
                />
                <div className='shadow_size_controll_container_frame'>
                  <label>offsetY:</label>
                  <div>{shadowOffsetY}px</div>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowOffsetY}
                  onChange={(e) => handleShadowOffsetYChange(parseInt(e.target.value))}
                />
              </div>
            </>
            )}


            {shadowToggle && (
              <div className='shadow_Frame'>
                <button id="apply-shadow-button_0_0" onClick={handleApplyShadow_0_0}></button>
                <button id="apply-shadow-button_0_1" onClick={handleApplyShadow_0_1}></button>
                <button id="apply-shadow-button_0_2" onClick={handleApplyShadow_0_2}></button>
                <button id="apply-shadow-button_1_0" onClick={handleApplyShadow_1_0}></button>
                <button id="apply-shadow-button_1_1" onClick={handleApplyShadow_1_1}></button>
                <button id="apply-shadow-button_1_2" onClick={handleApplyShadow_1_2}></button>
                <button id="apply-shadow-button_2_0" onClick={handleApplyShadow_2_0}></button>
                <button id="apply-shadow-button_2_1" onClick={handleApplyShadow_2_1}></button>
                <button id="apply-shadow-button_2_2" onClick={handleApplyShadow_2_2}></button>
              </div>
            )}

            {borderColorToggle && (
              <section className="color_controller1">
                <HexColorPicker color={borderColor} onChange={handleChangeBorderColor}/>
              </section>
            )}



            {backgroundColorToggle && (
              <section className="color_controller2">
                <HexColorPicker color={color} onChange={handleChangeComplete} />
              </section>
            )}


            <div className='editor_body_right_style_container_2_info_container'>
              <div className='editor_body_right_style_container_2_info_container_title'>shadow color</div>
              <div className='editor_body_right_style_container_2_info_container_frame'>
                <HexColorInput className="editor_body_right_style_container_2_info_container_info" color={shadowColor} onChange={handleShadowColorChange} />
                <div className='editor_select_color_btn' onClick={()=> setShadowColorToggle(!shadowColorToggle)}></div>
              </div>
            </div>
            {shadowColorToggle && (
              <section className="color_controller3">
                <HexColorPicker color={shadowColor} onChange={handleShadowColorChange}/>
              </section>
            )}

            <div className='editor_body_right_style_container_2_info_container'>
              <div className='editor_body_right_style_container_2_info_container_title'>font family</div>
              <div className='editor_body_right_style_container_2_info_container_frame'>
                <select className = "font-family-frame" value={fontFamily} onChange={(e) => handleFontChange(e.target.value)}>
                  <option value='Arial'>Arial</option>
                  <option value='Times New Roman'>Times New Roman</option>
                  <option value='Verdana'>Verdana</option>
                  <option value='Georgia'>Georgia</option>
                  <option value='Courier New'>Courier New</option>
                  <option value='Calibri'>Calibri</option>
                  <option value='Tahoma'>Tahoma</option>
                  <option value='Trebuchet MS'>Trebuchet MS</option>
                  <option value='Palatino'>Palatino</option>
                  <option value='Comic Sans MS'>Comic Sans MS</option>
                </select>
              </div>
            </div>

            <div className='editor_body_right_style_container_1_info_container'>
              <div className='editor_body_right_style_container_1_info_container_title'>font size</div>
              <div className='editor_body_right_style_container_1_info_container_btn'>
                <input id="fontsize-input" />
                <button id="change-fontsize-input-button">적용</button>
              </div>
            </div>
            <div className='editor_body_right_style_container_1_info_container'>
              <div className='editor_body_right_style_container_1_info_container_title'>font options</div>
              <div className='editor_body_right_style_container_1_info_container_font_btn'>
                <button id="change-fontWeight-button">A</button>
                <button id="change-fontItalic-button">A</button>
                <button id="change-fontShadow-button">A</button>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Editor;