import { TEXT } from "./inputTypes";
import { mustNotBeBlankFactory } from "./validationFunctions";

export const metaFormInputs = [
    {type: TEXT, dataKey: "formName", label: "Form Name", required: true,
        validationFunctions: [mustNotBeBlankFactory("Form Name can not be left blank.")]
    },
    {type: TEXT, dataKey: "submitButtonText", label: "Submit Button Text", required: true, default: "Submit",
        validationFunctions: [mustNotBeBlankFactory("Submit Button Text can not be left blank.")]
    }
    
]