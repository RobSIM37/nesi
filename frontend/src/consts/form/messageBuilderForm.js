import { mustNotBeBlankFactory } from "./validationFunctions";
import { TEXT, BUTTON } from "./inputTypes";

export const messageBuilderFormInputs = [
    { type: TEXT, dataKey: "body", label: "Message", default: "", required: true, multiline: true, minRows: 3,
    validationFunctions: [
        mustNotBeBlankFactory("The message body can not be blank")
    ]},
    { type: BUTTON, text: "Send", clearOnSubmit: true }
]