import React, { useState, useEffect } from "react";

const ElementDisplay = ({ element, index, onUpdate }) => {
  const [name, setName] = useState(element.name);
  const [params, setParams] = useState(element.params || []);
  const [newParam, setNewParam] = useState("");

  useEffect(() => {
    setName(element.name);
    setParams(element.params || []);
  }, [element]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    onUpdate(index, { ...element, name: e.target.value });
  };

  const handleParamChange = (idx, value) => {
    const newParams = [...params];
    newParams[idx] = value;
    setParams(newParams);
    onUpdate(index, { ...element, params: newParams });
  };

  const handleDeleteParam = (paramIndex) => {
    const updatedParams = [...params];
    updatedParams.splice(paramIndex, 1);
    setParams(updatedParams);
    onUpdate(index, { ...element, params: updatedParams });
  };

  const handleNewParamChange = (e) => {
    setNewParam(e.target.value);
  };

  const addNewParam = () => {
    if (newParam.trim() !== "") {
      const updatedParams = [...params, newParam];
      setParams(updatedParams);
      onUpdate(index, { ...element, params: updatedParams });
      setNewParam(""); // Clear the newParam input field after adding the new parameter
    }
  };

  // Add the new param when Enter key is pressed
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addNewParam();
    }
  };

  // Optional: You can also add a onBlur handler to add the param when the input loses focus
  // This is useful if users are more likely to click away than press Enter
  const handleBlur = () => {
    addNewParam();
  };

  return (
    <div className="p-2 m-2 bg-gray-100 rounded flex flex-col">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="font-bold p-1"
      />
      {params.map((param, idx) => (
        <div key={idx} className="flex items-center">
          <input
            type="text"
            value={param}
            onChange={(e) => handleParamChange(idx, e.target.value)}
            className="m-1 p-1 bg-gray-200 rounded flex-1"
          />
          <button
            className="ml-2 bg-red-500 text-white p-1 rounded"
            onClick={() => handleDeleteParam(idx)}
          >
            Delete Param
          </button>
        </div>
      ))}
      <input
        type="text"
        placeholder="Add new parameter"
        value={newParam}
        onChange={handleNewParamChange}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
        className="m-1 p-1 bg-gray-200 rounded"
      />
      <button
        className="self-end bg-red-500 text-white p-1 rounded mt-2"
        onClick={() => onUpdate(index, null)}
      >
        Delete Element
      </button>
    </div>
  );
};

export default ElementDisplay;
