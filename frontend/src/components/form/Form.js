import FormStateManagement from "./FormStateManagement"
import FormTextField from "./inputs/FormTextField"
import FormButton from "./inputs/FormButton"
import { useEffect, useState } from "react"
import FormCheckBox from "./inputs/FormCheckBox"
import FormStatement from "./inputs/FormStatement"
import FormRadioGroup from "./inputs/FormRadioGroup"

const Form = (props) => {

    const [inputs, setInputs] = useState();

    useEffect(()=>{
        const mappedInputs = props.inputs.map(input=>{
            switch (input.type) {
                case "text":
                    return <FormTextField
                                key={Math.random()}
                                dataKey={input.dataKey}
                                label={input.label}
                                required={input.required}
                            />
                case "number":
                    return <FormTextField
                                key={Math.random()}
                                type={"number"}
                                dataKey={input.dataKey}
                                label={input.label}
                                min={input.min}
                                max={input.max}
                                required={input.required}
                            />
                case "password":
                    return <FormTextField
                                key={Math.random()}
                                type={"password"}
                                dataKey={input.dataKey}
                                label={input.label}
                                required={input.required}
                            />
                case "checkbox":
                    return <FormCheckBox key={Math.random()} dataKey={input.dataKey} label={input.label}/>
                case "radio":
                    return <FormRadioGroup key={Math.random()} dataKey={input.dataKey} label={input.label}
                        choices={input.choices}
                        width={props.width || 350}
                    />
                case "button":
                    return <FormButton text={input.text} key={Math.random()}/>
                case "statement":
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