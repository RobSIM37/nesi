import { Stack, Typography } from "@mui/material";
import sadNesi from "../resources/sadNesi.png"

const NotFound = () => {

    return (
        <Stack height={"100%"} alignItems={"center"} justifyContent={"center"}>
            <img src={sadNesi} alt="Sad Nesi"></img>
            <Typography variant="h2">404: Page Not Found</Typography>
        </Stack>
    )
}

export default NotFound;