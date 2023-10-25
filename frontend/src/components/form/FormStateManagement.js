import React from "react"
import FormLayout from "./FormLayout";

const FormStateManagement = (props) => {

    const [formData, setFormData] = React.useState();
    
    React.useEffect(()=>{
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
    },[props.inputs])
    
    const getInput = (dataKey) => {
        return props.inputs.filter(input=>input.dataKey === dataKey)[0]
    }

    const generateErrorMessage = (value, validationFunctionsArr) => {
        const errorMessagesArr = [];
        validationFunctionsArr.forEach(func=>{
            const error = func(value);
            if (error) {
                errorMessagesArr.push(error);
            }
        })
        const errorMessage = errorMessagesArr.join(" ");
        return errorMessagesArr.length === 0 ? "" : errorMessage;
    }

    const isFormValid = () => {
        let valid = true;
        const dataInputs = props.inputs.filter(input=>input.dataKey);
        dataInputs.forEach(input => {
            if (formData[input.dataKey].errorMessage !== "") valid = false;
        })
        dataInputs.forEach(input=> {
            if (formData[input.dataKey].touched === false && input.required) valid = false;
        })
        return valid;
    }

    const reportChange = (dataKey, value, min, max) => {
        let containedValue = value
        if (min!==undefined && min!==null) {
            containedValue = Math.max(containedValue, min);
        }
        if (max!==undefined && max!==null) {
            containedValue = Math.min(containedValue, max);
        }
        const updatedData = {...formData};
        updatedData[dataKey].value = containedValue;
        const currentErrorMessage = generateErrorMessage(
            containedValue, getInput(dataKey).validationFunctions
        )
        updatedData[dataKey].errorMessage = currentErrorMessage;
        if (currentErrorMessage === "") {
            updatedData[dataKey].touched = true;
        }
        setFormData(()=>updatedData);
    }

    const hasBeenTouched = (dataKey, value) => {
        const updatedData = {...formData};
        updatedData[dataKey].touched = true;
        updatedData[dataKey].errorMessage = generateErrorMessage(
            value, getInput(dataKey).validationFunctions
        )
        setFormData(()=>updatedData);
    }

    const submitButtonClickEventHandler = () => {
        props.onSubmit(formData)
    }

    const connectedChildren = React.Children.map(props.children, child =>
        {
            switch (child.type.name){
                case "FormTextField":
                case "FormCheckBox":
                case "FormRadioGroup":
                    return React.cloneElement(child, {form:{
                        data:formData[child.props.dataKey].value,
                        errorMessage:formData[child.props.dataKey].touched ? formData[child.props.dataKey].errorMessage : "",
                        reportChange:reportChange,
                        hasBeenTouched:hasBeenTouched
                    }});
                case "FormButton":
                    return React.cloneElement(child, {form:{submitForm:submitButtonClickEventHandler, disabled: !isFormValid()}});
                default:
                    return child
            }
        }
    )

    return (
        <FormLayout width={props.width}>
            {connectedChildren}
        </FormLayout>
    )
}

export default FormStateManagement