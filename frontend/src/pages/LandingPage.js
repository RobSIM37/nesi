import React from "react";
import { Typography} from "@mui/material";
import nesi from "../resources/nesi.png";
import Form from "../components/form/Form";
import { loginInputs } from "../consts/form/loginForm"

const LandingPage = () => {

    const formSubmitClickHandler = (data) => {
        console.log("Form has been submitted: ", data);
    }

    return (
        <>
            <img src={nesi} alt="Nesi Logo"></img>
            <Typography variant="h1">Welcome to NESI!</Typography>
            <Form
                width={500}
                inputs={loginInputs}
                onSubmit={formSubmitClickHandler}
            />
        </>
    )
}

export default LandingPage;