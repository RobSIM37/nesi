import { TEXT } from "./inputTypes";

export const metaFormInputs = [
    {type: TEXT, dataKey: "formName", label: "Form Name", required: true},
    {type: TEXT, dataKey: "submitButtonText", label: "Submit Button Text", required: true, default: "Submit"}
]