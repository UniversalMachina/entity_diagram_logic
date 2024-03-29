import React, { useState, useEffect } from 'react';

function App() {
  const [elements, setElements] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");

  // Function to handle adding elements directly in the main area
  const handleAddElement = () => {
    const newElement = { name: `Element ${elements.length + 1}`, params: [] };
    setElements([...elements, newElement]);
    updateTextArea([...elements, newElement]);
  };

  // Function to update textarea based on elements array
  const updateTextArea = (newElements) => {
    const newText = newElements.map(el => `>${el.name}\n${el.params.join('\n')}`).join('\n\n');
    setTextAreaValue(newText);
  };

  // Function to handle changes in the textarea
  const handleTextAreaChange = (e) => {
    const input = e.target.value;
    setTextAreaValue(input);
    const entries = input.split('\n>').map(entry => entry.trim()).filter(entry => entry !== '');
    const newElements = entries.map((entry, index) => {
      const lines = entry.split('\n');
      return {
        name: lines[0].replace(/^>/, ''), // Remove leading ">" from name
        params: lines.slice(1) // The rest are params
      };
    });
    setElements(newElements);
  };

  // Function to handle deleting an element
  const handleDeleteElement = (index) => {
    const newElements = [...elements];
    newElements.splice(index, 1);
    setElements(newElements);
    updateTextArea(newElements);
  };

  return (
    <div className="App flex">
      <div className="sidebar bg-gray-200 p-4">
        <textarea
          className="w-full h-full"
          value={textAreaValue}
          onChange={handleTextAreaChange}
          placeholder="Add elements starting with '>' and separated by line breaks"
        ></textarea>
      </div>
      <div className="main-area flex-1 p-4">
        <button
          className="mb-4 p-2 bg-blue-500 text-white rounded"
          onClick={handleAddElement}
        >
          + Add Element
        </button>
        {elements.map((element, index) => (
          <div key={index} className="p-2 m-2 bg-gray-100 rounded flex flex-col">
            <p className="font-bold">{element.name}</p>
            {element.params.length > 0 ? element.params.map((param, idx) => (
              <div key={idx} className="m-1 p-1 bg-gray-200 rounded">{param}</div>
            )) : <div className="m-1 p-1 bg-gray-200 rounded">No additional info</div>}
            <button
              className="self-end bg-red-500 text-white p-1 rounded mt-2"
              onClick={() => handleDeleteElement(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
