// useElementsManager.js
import { useState, useEffect } from 'react';

export function useElementsManager() {
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

    const handleUpdateElement = (index, element) => {
        const newElements = [...elements];
        newElements[index] = element;
        setElements(newElements);
      };


  return { elements, textAreaValue, handleAddElement, handleDeleteElement, handleTextAreaChange };
}
