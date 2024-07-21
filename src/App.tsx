import React, { useState, useEffect } from 'react';
import Editor from './pages/editor';
import Splash from './pages/splash';

function App() {
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEditor(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []); 
  return (
    <div className="App">
      {showEditor ? <Editor /> : <Splash />}
    </div>
  );
}

export default App;
