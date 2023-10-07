import { Box, Button, Stack } from "@mui/material"

const FormSubmitButton = (props) => {

    return (
        <Stack direction={"column"} width={"100%"} alignItems={"end"}>
            <Box width={"auto"} p={1}>
                <Button variant="contained" onClick={props.form.submitForm}>Submit</Button>
            </Box>
        </Stack>
        
    )
    
}

export default FormSubmitButton