// ElementDisplay.js
import React from 'react';

const ElementDisplay = ({ element, onDelete }) => (
  <div className="p-2 m-2 bg-gray-100 rounded flex flex-col">
    <p className="font-bold">{element.name}</p>
    {element.params.length > 0 ? element.params.map((param, idx) => (
      <div key={idx} className="m-1 p-1 bg-gray-200 rounded">{param}</div>
    )) : <div className="m-1 p-1 bg-gray-200 rounded">No additional info</div>}
    <button
      className="self-end bg-red-500 text-white p-1 rounded mt-2"
      onClick={onDelete}
    >
      Delete
    </button>
  </div>
);

export default ElementDisplay;
