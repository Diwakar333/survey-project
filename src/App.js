// src/App.js
import React, { useState } from "react";
import Filter from "./components/Filter";
import Chart from "./components/Chart";
import SurveyTable from "./components/SurveyTable";
import { transformData } from "./utils/dataMapping";
import mapping from "./data/mapping.json";
import "./App.css";

const transformMappingToAttributesList = (mapping) => {
  const attributesList = [];
  Object.keys(mapping).forEach((attribute) => {
    Object.values(mapping[attribute]).forEach((value) => {
      attributesList.push({ value: value, label: value });
    });
  });
  return attributesList;
};

const App = () => {
  const [filteredData, setFilteredData] = useState(transformData());
  const attributesList = transformMappingToAttributesList(mapping);

  const handleFilter = (selectedAttributes) => {
    const filtered = transformData().filter((persona) =>
      selectedAttributes.every((attr) =>
        Object.values(persona).includes(attr.value)
      )
    );
    setFilteredData(filtered); // Update filteredData state
  };
  console.log(handleFilter);

  return (
    <div className="App">
      <h1>Survey Data Visualization</h1>
      <Filter attributes={attributesList} onFilter={handleFilter} />
      <Chart data={filteredData} />
      <SurveyTable data={filteredData} />{" "}
      {/* Pass filteredData to SurveyTable */}
    </div>
  );
};

export default App;
