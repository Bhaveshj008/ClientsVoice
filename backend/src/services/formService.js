const { generateFormConfiguration } = require('./openAiService'); 

const generateForm = async (prompt) => {
  const defaultPrefix = 'Generate a JSON configuration for a feedback form that includes fields appropriate to';
  const defaultSuffix = `Please generate the following JSON configuration for a feedback form:
         {
            "feedbackFormConfig": [
              {
                
              }
            ]
          }
        }
        
<<<<<<< HEAD
        Instructions: each field have propper name and id... name attribute .. it is an strict warning to you
        Strictly saying you......... Add clear labels for radios, checkboxes, dropdowns, and select boxes, and placeholders where applicable.
        1.Use appropriate HTML5 input types (e.g., checkboxes, dropdowns, radio buttons, file uploads, range sliders).
        2.Ensure each field has a unique id and a proper name attribute.
        3.Keep the JSON flat; all fields should be within the feedbackForm array of feedbackFormConfig.
        4.Strictly saying you......... Add clear labels for radios, checkboxes, dropdowns, and select boxes, and placeholders where applicable.
        5.Maintain the format and structure provided without altering its meaning.`;
=======
        Instructions:
        1. Use HTML5 input types where appropriate, including checkboxes, dropdowns, radio buttons, file uploads, and range sliders.
        2. Each field must include a unique 'id' attribute, even for dropdown items.
        3. Ensure the JSON structure is not deeply nested; all fields should be directly within the 'feedbackForm' array of a single 'feedbackFormConfig'.
        4. Follow the exact format provided above without modification.`;
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
  return await generateFormConfiguration(`${defaultPrefix} ${prompt} ${defaultSuffix}`);
};

module.exports = { generateForm };
