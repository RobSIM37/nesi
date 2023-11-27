import React from "react"

const FormStateManagement = (props) => {

    const [formData, setFormData] = React.useState();
    
    const initFormValues = ()=>{
        const initialValues = {};
        props.inputs.forEach(
            input=>{
                if (input.dataKey !== undefined) {
                    initialValues[input.dataKey] = {}
                    if (input.default !== undefined) {
                        initialValues[input.dataKey]["value"] = input.default;
                    }
                    initialValues[input.dataKey]["errorMessage"] = "";
                    initialValues[input.dataKey]["touched"] = false;
                }
            }
        )
        setFormData(initialValues)
    }

    React.useEffect(initFormValues,[props.inputs])
    
    const getInput = (dataKey) => {
        return props.inputs.filter(input=>input.dataKey === dataKey)[0]
    }

    const generateErrorMessage = (value, validationFunctionsArr, required) => {
        const errorMessagesArr = [];
        if (!validationFunctionsArr) return "";
        validationFunctionsArr.forEach(func=>{
            const error = func(value);
            if (error) {
                errorMessagesArr.push(error);
            }
        })
        if (required && value === "") errorMessagesArr.push("This may not be left blank.")
        const errorMessage = errorMessagesArr.join(" ");
        return errorMessagesArr.length === 0 ? "" : errorMessage;
    }

    const isFormValid = () => {
        let valid = true;
        const dataInputs = props.inputs.filter(input=>input.dataKey);
        dataInputs.forEach(input => {
            if (formData[input.dataKey].errorMessage !== "") valid = false;
            if (formData[input.dataKey].touched === false && input.required) valid = false;
            if (!formData[input.dataKey] && input.required) valid = false;
        })
        return valid;
    }

    const reportChange = (dataKey, value, min, max, includeMin, includeMax) => {
        console.log("dataKey:", dataKey)
        console.log("value:", value)
        const input = getInput(dataKey);
        let containedValue = value
        if (includeMin && min!==undefined && min!==null) {
            containedValue = Math.max(containedValue, min);
        }
        if (includeMax && max!==undefined && max!==null) {
            containedValue = Math.min(containedValue, max);
        }
        const updatedData = {...formData};
        updatedData[dataKey].value = containedValue;
        const currentErrorMessage = generateErrorMessage(
            containedValue, input.validationFunctions, input.required
        )
        updatedData[dataKey].errorMessage = currentErrorMessage;
        if (currentErrorMessage === "") {
            updatedData[dataKey].touched = true;
        }
        if (props.autoSubmit) props.autoSubmit(updatedData);
        setFormData(()=>updatedData);
    }

    const hasBeenTouched = (dataKey, value) => {
        const input = getInput(dataKey);
        const updatedData = {...formData};
        updatedData[dataKey].touched = true;
        updatedData[dataKey].errorMessage = generateErrorMessage(
            value, input.validationFunctions, input.required
        )
        setFormData(()=>updatedData);
    }

    const submitButtonClickEventHandler = () => {
        if (props.inputs.filter(input=>input.type === "button")[0].clearOnSubmit) initFormValues();
        props.onSubmit(formData);
    }

    const connectedChildren = React.Children.map(props.children, child =>
        {
            switch (child.type.name){
                case "FormTextField":
                case "FormCheckBox":
                case "FormRadioGroup":
                case "FormSelect":
                    return React.cloneElement(child, {form:{
                        data:formData[child.props.dataKey].value,
                        errorMessage:formData[child.props.dataKey].touched ? formData[child.props.dataKey].errorMessage : "",
                        reportChange:reportChange,
                        hasBeenTouched:hasBeenTouched
                    }})
                case "FormButton":
                    return React.cloneElement(child, {form:{submitForm:submitButtonClickEventHandler, disabled: !isFormValid()}});
                default:
                    return child
            }
        }
    )

    return (connectedChildren)
    
}

export default FormStateManagement