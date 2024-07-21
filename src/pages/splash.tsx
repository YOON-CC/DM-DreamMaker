import React, { useState, useEffect } from 'react';
import '../style/splash.css';

const Splash = () => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const targetText = '나의 꿈을 DREAMMAKER에서 시작하다';
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index <= targetText.length) {
        setTypedText(targetText.slice(0, index));
        index += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); 
  }, []); 

  return (
    <div className='splash_container'>
      <div className='splash_container_text'>{typedText}_</div>
    </div>
  );
};

export default Splash;
