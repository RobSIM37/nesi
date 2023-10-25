
import { Typography, Grid } from "@mui/material";
import nesi from "../resources/nesi.png";
import Form from "../components/form/Form";
import { loginInputs } from "../consts/form/loginForm"

const LandingPage = () => {

    const formSubmitClickHandler = (data) => {
        console.log("Form has been submitted: ", data);
    }

    return (
        <Grid container alignItems={"center"} rowSpacing={3}>
            <Grid item xs={1}>
                <img src={nesi} alt="Nesi Logo"></img>
            </Grid>
            <Grid item xs>
                <Typography align="center" variant="h1">Welcome to NESI!</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={12}>
                <Form
                    width={290}
                    inputs={loginInputs}
                    onSubmit={formSubmitClickHandler}
                />
            </Grid>
        </Grid>
    )
}

export default LandingPage;