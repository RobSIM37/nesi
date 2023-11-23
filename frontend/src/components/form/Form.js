import { useEffect, useState } from "react"
import FormStateManagement from "./FormStateManagement"
import FormTextField from "./inputs/FormTextField"
import FormButton from "./inputs/FormButton"
import FormSelect from "./inputs/FormSelect"
import FormCheckBox from "./inputs/FormCheckBox"
import FormStatement from "./inputs/FormStatement"
import FormRadioGroup from "./inputs/FormRadioGroup"
import { BUTTON, CHECKBOX, NUMBER, PASSWORD, RADIO, SELECT, STATEMENT, TEXT } from "../../consts/form/inputTypes"

const Form = (props) => {

    const [inputs, setInputs] = useState();

    useEffect(()=>{

        const mappedInputs = props.inputs.map(input=>{
            switch (input.type) {
                case TEXT:
                    return <FormTextField
                                key={Math.random()}
                                dataKey={input.dataKey}
                                label={input.label}
                                required={input.required}
                                multiline={input.multiline}
                                minRows={input.minRows}
                                maxRows={input.maxRows}
                                disabled={input.disabled}
                            />
                case NUMBER:
                    return <FormTextField
                                key={Math.random()}
                                type={NUMBER}
                                dataKey={input.dataKey}
                                label={input.label}
                                min={input.min}
                                max={input.max}
                                required={input.required}
                                disabled={input.disabled}
                            />
                case PASSWORD:
                    return <FormTextField
                                key={Math.random()}
                                type={PASSWORD}
                                dataKey={input.dataKey}
                                label={input.label}
                                required={input.required}
                                disabled={input.disabled}
                            />
                case SELECT:
                    return <FormSelect
                                key={Math.random()}
                                dataKey={input.dataKey}
                                default={input.default}
                                label={input.label}
                                required={input.required}
                                options={input.options}
                                disabled={input.disabled}
                            />
                case CHECKBOX:
                    return <FormCheckBox
                                key={Math.random()}
                                dataKey={input.dataKey}
                                label={input.label}
                                disabled={input.disabled}
                            />
                case RADIO:
                    return <FormRadioGroup
                                key={Math.random()}
                                dataKey={input.dataKey}
                                label={input.label}
                                options={input.options}
                                width={props.width || 350}
                                disabled={input.disabled}
                            />
                case BUTTON:
                    return <FormButton
                                text={input.text}
                                key={Math.random()}
                                disabled={input.disabled}
                            />
                case STATEMENT:
                    return <FormStatement
                                key={Math.random()}
                                statement={input.statement}
                                width={props.width || 350}
                            />
                default:
                    return <div key={Math.random()}/>
            }
        })
        setInputs(mappedInputs);
    }, [props.inputs, props.width, props.min, props.max])
    
    return (
        <FormStateManagement
            onSubmit={props.onSubmit}
            autoSubmit={props.autoSubmit}
            inputs={props.inputs}
        >
            {inputs}
        </FormStateManagement>
    )
}

export default Form