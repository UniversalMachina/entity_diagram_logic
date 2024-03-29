// useElementsManager.js
import { useState, useEffect } from 'react';

export function useElementsManager() {
    const [elements, setElements] = useState([]);
    const [textAreaValue, setTextAreaValue] = useState("");
  

    const [isEditing, setIsEditing] = useState(false); // Tracks whether the user is actively editing


    // useEffect(() => {
    //     // This function will be triggered every time `elements` changes.
    //     // It will assemble the `elements` back into a string in the desired format.
    //     if (!isEditing) {

    //     const textValue = elements.map(element => {
    //       // For each element, prepend the name with ">", and join params with new lines
    //       const elementString = `>${element.name}\n${element.params.join('\n')}`;
    //       return elementString;
    //     }).join('\n\n'); // Join different elements with two newlines for separation
      
    //     // Count the number of line breaks in the current textAreaValue
    //     const numberOfLineBreaks = (textAreaValue.match(/\n/g) || []).length;
      
    //     // Add the same number of line breaks to the end of the new textValue
    //     const updatedTextValue = textValue + '\n'.repeat(numberOfLineBreaks);
      
    //     // Now, update the textarea value with this newly created string
    //     setTextAreaValue(updatedTextValue);}
    //   }, [elements, isEditing]); // Include textAreaValue in the dependency array


//       useEffect(() => {
//     if (!isEditing) {
//       const textValue = elements.map(element => `>${element.name}\n${element.params.join('\n')}`).join('\n\n');
//       // Optionally, append extra line breaks or other formatting here
//       setTextAreaValue(textValue);
//     }
//   }, [elements, isEditing]);


useEffect(() => {
    if (!isEditing) {
      const textValue = elements.map(element => {
        const elementString = `>${element.name}\n${element.params.join('\n')}`;
        return elementString;
      }).join('\n\n');
  
      // Calculate trailing line breaks in the original textAreaValue
      const trailingLineBreaksMatch = textAreaValue.match(/\n+$/);
      const numberOfTrailingLineBreaks = trailingLineBreaksMatch ? trailingLineBreaksMatch[0].length : 0;
  
      // Ensure at least one line break is always present for separation
      const updatedTextValue = `${textValue}\n${'\n'.repeat(Math.max(0, numberOfTrailingLineBreaks - 1))}`;
  
      // Update the textarea value only if necessary to prevent cycling
      if (textAreaValue.trim() !== updatedTextValue.trim()) {
        setTextAreaValue(updatedTextValue);
      }
    }
  }, [elements, isEditing, textAreaValue]);
  

  const handleFocus = () => setIsEditing(true);
  const handleBlur = () => setIsEditing(false);
      
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


  return { elements, textAreaValue, handleAddElement, handleDeleteElement, handleTextAreaChange, handleUpdateElement, handleFocus, handleBlur };
}
