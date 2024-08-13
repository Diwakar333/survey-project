import data from "../data/surveyData.json";
import mapping from "../data/mapping.json";

const parsePersona = (personaStr) => {
  // Remove the surrounding brackets and split by commas
  const attributePairs = personaStr.replace(/[\[\]\'\"]/g, "").split(", ");

  // Convert the attribute pairs to an object
  const parsedPersona = {};
  attributePairs.forEach((pair) => {
    const [key, value] = pair.split(": ").map((s) => s.trim());
    parsedPersona[key] = value;
  });

  return parsedPersona;
};

export const transformData = () => {
  return data.map((item) => {
    const transformedPersona = {};
    if (item.Persona) {
      const parsedPersona = parsePersona(item.Persona);

      Object.keys(parsedPersona).forEach((key) => {
        // Check if the key exists in the mapping and if the value is valid
        if (mapping[key] && mapping[key][parsedPersona[key]]) {
          transformedPersona[key] = mapping[key][parsedPersona[key]];
        } else {
          // Handle missing or undefined data gracefully
          console.warn(
            `Missing mapping for key: ${key} with value: ${parsedPersona[key]}`
          );
          transformedPersona[key] = "Unknown";
        }
      });
    }

    // Add other attributes if needed
    transformedPersona.ID = item.ID;
    transformedPersona.Task = item.Task;
    transformedPersona.Alt = item.Alt;
    transformedPersona.chosen_choice_letter = item.chosen_choice_letter;
    transformedPersona["Will this car have advanced safety features?"] =
      mapping["Feature"]
        ? mapping["Feature"][
            item["Will this car have advanced safety features?"]
          ] || "Unknown"
        : "Unknown";
    transformedPersona["What range and charging time will this car offer"] =
      mapping["Range"]
        ? mapping["Range"][
            item["What range and charging time will this car offer"]
          ] || "Unknown"
        : "Unknown";

    return transformedPersona;
  });
};
