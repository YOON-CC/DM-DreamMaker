import React, { useState, useEffect } from "react";
import "@/styles/splash.css";

export default function Splash() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const targetText = "변화의 시작, DM에서 찾아가다";
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index <= targetText.length) {
        setTypedText(targetText.slice(0, index));
        index += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="splash-container">
      <div className="splash-container-text">{typedText}_</div>
    </main>
  );
}
