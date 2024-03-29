import React, { useState, useEffect } from 'react';
import { useElementsManager } from './useElementsManager';
import Sidebar from './Sidebar';
import ElementDisplay from './ElementDisplay';
function App() {
  const { elements, textAreaValue, handleAddElement, handleDeleteElement, handleTextAreaChange } = useElementsManager();


  return (
    <div className="App flex">
    <Sidebar textAreaValue={textAreaValue} handleTextAreaChange={handleTextAreaChange} />
    <div className="main-area flex-1 p-4">
      <button className="mb-4 p-2 bg-blue-500 text-white rounded" onClick={handleAddElement}>
        + Add Element
      </button>
      {elements.map((element, index) => (
        <ElementDisplay key={index} element={element} onDelete={() => handleDeleteElement(index)} />
      ))}
    </div>
  </div>
  );
}

export default App;
