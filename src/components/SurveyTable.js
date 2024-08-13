// src/components/SurveyTable.js
import React from "react";

const SurveyTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((persona, index) => (
          <tr key={index}>
            {Object.values(persona).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SurveyTable;
