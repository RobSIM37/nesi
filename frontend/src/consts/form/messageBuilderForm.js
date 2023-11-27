import { TEXT, BUTTON } from "./inputTypes";

export const messageBuilderFormInputs = [
    { type: TEXT, dataKey: "body", label: "Message", default: "", required: true, multiline: true, minRows: 3},
    { type: BUTTON, text: "Send", clearOnSubmit: true }
]