import { TextField } from "@mui/material"

const FormTextField = (props) => {

    return (
        <TextField
            type={props.type || "string"}
            label={props.label}
            value={props.form.data}
            error={props.form.errorMessage !== ""}
            helperText={props.form.errorMessage}
            required={props.required}
            onChange={(e)=>{props.form.reportChange(props.dataKey, e.target.value, props.min, props.max)}}
            onBlur={(e)=>{props.form.hasBeenTouched(props.dataKey, e.target.value)}}
            fullWidth={true}
            multiline={props.multiline}
            minRows={props.minRows}
            maxRows={props.maxRows}
        />
    )
}

export default FormTextField