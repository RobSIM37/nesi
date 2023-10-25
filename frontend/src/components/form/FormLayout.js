import { Box, Card, Stack } from "@mui/material";

const FormLayout = (props) => {

    return (
        <Box p={1} width={props.width || "fit-content"}>
            <Card p={1}>
                <Stack direction={"column"} alignItems={"center"} p={1} spacing={2}>
                    {props.children}
                </Stack>
            </Card>
        </Box>
    )
}

export default FormLayout