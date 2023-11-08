import { Stack } from "@mui/material";
import PaddedCard from "../PaddedCard";
const FormLayout = (props) => {

    return (
        <PaddedCard p={1} width={props.width || "100%"}>
            <Stack direction={"column"} alignItems={"center"} p={1} spacing={2}>
                {props.children}
            </Stack>
        </PaddedCard>
    )
}

export default FormLayout