export const messageBuilderFormInputs = [
    { type: "text", dataKey: "body", label: "Message", default: "", required: true, multiline: true, minRows: 3},
    { type: "button", text: "Send", clearOnSubmit: true }
]