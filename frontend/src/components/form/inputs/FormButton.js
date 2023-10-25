import { Box, Button, Stack } from "@mui/material"

const FormButton = (props) => {
    
    return (
        <Stack direction={"column"} width={"100%"} alignItems={"end"}>
            <Box width={"auto"} p={1}>
                <Button variant="contained" disabled={props.form.disabled} onClick={props.form.submitForm}>{props.text || "Submit"}</Button>
            </Box>
        </Stack>
    )
}

export default FormButton