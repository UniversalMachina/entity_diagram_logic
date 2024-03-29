import React, { useState, useEffect, useRef } from 'react';

const Sidebar = ({ textAreaValue, handleTextAreaChange, handleFocus, handleBlur }) => {
  const [lineNumbers, setLineNumbers] = useState('1');
  const textAreaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  useEffect(() => {
    const numberOfLines = textAreaValue.split('\n').length;
    let lines = '';
    for (let i = 1; i <= numberOfLines; i++) {
      lines += i + '\n';
    }
    setLineNumbers(lines);
  }, [textAreaValue]);

  useEffect(() => {
    const handleScroll = () => {
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
      }
    };
    textAreaRef.current.addEventListener('scroll', handleScroll);
    return () => textAreaRef.current.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex bg-gray-200 p-4">
      <div 
        ref={lineNumbersRef} 
        className="text-right select-none pr-2"
        style={{ width: '3em', overflow: 'hidden' }}
      >
        <pre className="whitespace-pre-wrap">{lineNumbers}</pre>
      </div>
      <textarea
        ref={textAreaRef}
        className="w-full h-full resize-none"
        value={textAreaValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleTextAreaChange}
        placeholder="Add elements starting with '>' and separated by line breaks"
      ></textarea>
    </div>
  );
};

export default Sidebar;
