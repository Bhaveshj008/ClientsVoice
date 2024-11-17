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
        
        Instructions:
        1. Use HTML5 input types where appropriate, including checkboxes, dropdowns, radio buttons, file uploads, and range sliders.
        2. Each field must include a unique 'id' attribute, even for dropdown items.
        3. Ensure the JSON structure is not deeply nested; all fields should be directly within the 'feedbackForm' array of a single 'feedbackFormConfig'.
        4. Follow the exact format provided above without modification.`;
  return await generateFormConfiguration(`${defaultPrefix} ${prompt} ${defaultSuffix}`);
};

module.exports = { generateForm };
