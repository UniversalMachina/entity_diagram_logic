// ElementDisplay.js
import React, { useState, useEffect } from 'react';

const ElementDisplay = ({ element, index, onUpdate }) => {
  const [name, setName] = useState(element.name);
  const [params, setParams] = useState(element.params || []);

  // Update local state when element prop changes
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

  return (
    <div className="p-2 m-2 bg-gray-100 rounded flex flex-col">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="font-bold p-1"
      />
      {params.length > 0 ? params.map((param, idx) => (
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
      )) : <div className="m-1 p-1 bg-gray-200 rounded">No parameters</div>}
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
