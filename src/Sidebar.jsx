// Sidebar.js
import React from 'react';

const Sidebar = ({ textAreaValue, handleTextAreaChange }) => (
  <div className="sidebar bg-gray-200 p-4">
    <textarea
      className="w-full h-full"
      value={textAreaValue}
      onChange={handleTextAreaChange}
      placeholder="Add elements starting with '>' and separated by line breaks"
    ></textarea>
  </div>
);

export default Sidebar;
