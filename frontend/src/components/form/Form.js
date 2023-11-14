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
                                multiline={input.multiline}
                                minRows={input.minRows}
                                maxRows={input.maxRows}
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
                            />
                case PASSWORD:
                    return <FormTextField
                                key={Math.random()}
                                type={PASSWORD}
                                dataKey={input.dataKey}
                                label={input.label}
                                required={input.required}
                            />
                case SELECT:
                    return <FormSelect
                                key={Math.random()}
                                dataKey={input.dataKey}
                                default={input.default}
                                label={input.label}
                                required={input.required}
                                menuItems={input.menuItems}
                            />
                case CHECKBOX:
                    return <FormCheckBox key={Math.random()} dataKey={input.dataKey} label={input.label}/>
                case RADIO:
                    return <FormRadioGroup key={Math.random()} dataKey={input.dataKey} label={input.label}
                        choices={input.choices}
                        width={props.width || 350}
                    />
                case BUTTON:
                    return <FormButton text={input.text} key={Math.random()}/>
                case STATEMENT:
                    return <FormStatement key={Math.random()} statement={input.statement} width={props.width || 350}/>
                default:
                    return <div key={Math.random()}/>
            }
        })
        setInputs(mappedInputs);
    }, [props.inputs, props.width, props.min, props.max])
    
    return (
        <FormStateManagement
            onSubmit={props.onSubmit}
            inputs={props.inputs}
            width={props.width}
        >
            {inputs}
        </FormStateManagement>
    )
}

export default Form