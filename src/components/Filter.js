// import React from 'react'
import React, { useState } from "react";
import Select from "react-select";

const Filter = ({ attributes, onFilter }) => {
  const [selectedOptions, setSelectedOptions] = useState(null);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    onFilter(selected);
  };
  return (
    <Select
      value={selectedOptions}
      onChange={handleChange}
      options={attributes}
      isMulti
    />
  );
};

export default Filter;
