import { Box, Card, Stack } from "@mui/material";

const FormCardLayout = (props) => {

    return (
        <Box p={1} width={"fit-content"}>
            <Card p={1}>
                <Stack direction={"column"} alignItems={"center"}>
                    {props.children}
                </Stack>
            </Card>
        </Box>
    )
}

export default FormCardLayout