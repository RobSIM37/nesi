import { Stack, TextField, Typography, Box } from "@mui/material"

const FormTextField = (props) => {
    return (
        <Stack direction={"row"} alignItems={"baseline"} p={1}>
            <Box width={120}>
                <Typography>{props.label}</Typography>
            </Box>
            <TextField
                value={props.form.data}
                onChange={(e)=>{props.form.reportChange(props.dataKey, e.target.value)}}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
        </Stack>
    )
}

export default FormTextField