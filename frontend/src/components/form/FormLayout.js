import { Stack } from "@mui/material";
import PaddedCard from "../styled/PaddedCard";
const FormLayout = (props) => {

    return (
        <PaddedCard p={props.p || 1} width={props.width || "100%"}>
            <Stack direction={"column"} alignItems={"center"} p={props.stackPadding || 1} spacing={2}>
                {props.children}
            </Stack>
        </PaddedCard>
    )
}

export default FormLayout