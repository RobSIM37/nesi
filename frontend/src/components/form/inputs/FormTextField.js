import { Stack, TextField, Typography, Box } from "@mui/material"

const FormTextField = (props) => {

    return (
        <Stack direction={"row"} alignItems={"baseline"} p={1}>
            <Box width={180}>
                <Typography>{props.label}</Typography>
            </Box>
            <TextField
                type={props.type || "string"}
                value={props.form.data}
                onChange={(e)=>{props.form.reportChange(props.dataKey, e.target.value, props.min, props.max)}}
            />
        </Stack>
    )
}

export default FormTextField