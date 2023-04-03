import React from "react";
import { Typography} from "@mui/material";
import nesi from "../../resources/nesi.png"
const LandingPage = () => {
    return (
        <>
            <img src={nesi} alt="Nesi Logo"></img>
            <Typography variant="h1">Welcome to NESI!</Typography>
        </>
    )
}

export default LandingPage;