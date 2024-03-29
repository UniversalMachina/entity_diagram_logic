import React, { useState, useEffect } from 'react';
import { useElementsManager } from './useElementsManager';
import Sidebar from './Sidebar';
import ElementDisplay from './ElementDisplay';
function App() {
  const { elements, textAreaValue, handleAddElement, handleDeleteElement, handleTextAreaChange, handleUpdateElement, handleFocus, handleBlur  } = useElementsManager();


  return (
    <div className="App flex">
    <Sidebar textAreaValue={textAreaValue} handleTextAreaChange={handleTextAreaChange} handleFocus={handleFocus} handleBlur={handleBlur} />
    <div className="main-area flex-1 p-4">
      <button className="mb-4 p-2 bg-blue-500 text-white rounded" onClick={handleAddElement}>
        + Add Element
      </button>
      {elements.map((element, index) => (
        <ElementDisplay
  key={index}
  index={index}
  element={element}
  onUpdate={(idx, updatedElement) => {
    if (updatedElement) {
      handleUpdateElement(idx, updatedElement);
    } else {
      handleDeleteElement(idx);
    }
  }}
/>      ))}
    </div>
  </div>
  );
}

export default App;
