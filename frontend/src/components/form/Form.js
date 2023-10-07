import FormStateManagement from "./FormStateManagement"
import FormTextField from "./inputs/FormTextField"
import FormSubmitButton from "./inputs/FormSubmitButton"
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
                    return <FormTextField key={Math.random()} dataKey={input.dataKey} label={input.label}/>
                case "number":
                    return <FormTextField
                                key={Math.random()}
                                type={"number"}
                                dataKey={input.dataKey}
                                label={input.label}
                                min={input.min}
                                max={input.max}
                            />
                case "checkbox":
                    return <FormCheckBox key={Math.random()} dataKey={input.dataKey} label={input.label}/>
                case "radio":
                    return <FormRadioGroup key={Math.random()} dataKey={input.dataKey} label={input.label}
                        choices={input.choices}
                        width={props.width || 350}
                    />
                case "submit":
                    return <FormSubmitButton key={Math.random()}/>
                case "statement":
                    return <FormStatement key={Math.random()} statement={input.statement} width={props.width || 350}/>
                default:
                    return <div key={Math.random()} />
            }
        })
        setInputs(mappedInputs);
    }, [props.inputs, props.width, props.min, props.max])
    
    return (
        <FormStateManagement
            onSubmit={props.onSubmit}
            inputs={props.inputs}
        >
            {inputs}
        </FormStateManagement>
    )
}

export default Form