import React from "react"
import FormCardLayout from "./FormCardLayout";

const FormStateManagement = (props) => {

    const [formData, setFormData] = React.useState();

    React.useEffect(()=>{
        const defaultValues = {};
        props.inputs.forEach(
            input=>{
                if (input.default !== undefined) defaultValues[input.dataKey]=input.default
            }
        )
        setFormData(defaultValues)
    },[props.inputs])
    
    const reportChange = (dataKey, value, min, max) => {
        let containedValue = value
        if (min!==undefined && min!==null) {
            containedValue = Math.max(containedValue, min);
        }
        if (max!==undefined && max!==null) {
            containedValue = Math.min(containedValue, max);
        }
        const updatedData = {...formData};
        updatedData[dataKey] = containedValue;
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
                    return React.cloneElement(child, {form:{data:formData[child.props.dataKey], reportChange:reportChange}});
                case "FormSubmitButton":
                    return React.cloneElement(child, {form:{submitForm:submitButtonClickEventHandler}});
                default:
                    return child
            }
        }
    )

    return (
        <FormCardLayout>
            {connectedChildren}
        </FormCardLayout>
    )
}

export default FormStateManagement