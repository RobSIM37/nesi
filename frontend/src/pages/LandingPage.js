import { useState } from "react";
import { Typography, Grid, useThemeProps, Stack, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import axios from "axios";
import { currentUrl } from "../consts/url";
import nesi from "../resources/nesi.png";
import Form from "../components/form/Form";
import { loginInputs } from "../consts/form/loginForm"

const LandingPage = () => {

    const [loginRegError, setLoginRegError] = useState(null);
    const [currentTab, setCurrentTab] = useState("login");

    const handleTabChange = (e, value) => {
        setCurrentTab(value);
    }

    const formSubmitHandlerFactory = (endpoint) => {
        return (data) => {
            console.log("submitted:", endpoint, data)
            axios
                .post(`${currentUrl()}/${endpoint}`, {userName:data.userName.value, password:data.password.value})
                .then(res=>{
                    setLoginRegError(null);
                    useThemeProps.initNewUser(res.data);
                })
                .catch(err=>{
                    setLoginRegError(err.message);
                })
        }
    }

    return (
        <Grid container alignItems={"center"} rowSpacing={3}>
            <Grid item xs={1}>
                <Box p={1}>
                    <img src={nesi} alt="Nesi Logo"></img>
                </Box>
            </Grid>
            <Grid item xs>
                <Typography align="center" variant="h1">Welcome to NESI!</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={12}>
                <Stack>
                    {loginRegError &&
                    <Box p={1}>
                        <Typography color="warning.main">{loginRegError}</Typography>
                    </Box>
                    }
                    <TabContext value={currentTab}>
                        <Box sx={{ borderBottom: 1, borderColor: "primary.main"}}>
                            <TabList aria-label="Login or Registration" onChange={handleTabChange}>
                                <Tab label="Login" value="login" />
                                <Tab label="Registration" value="registration" />
                            </TabList>
                        </Box>
                        <TabPanel value="login">
                            <Stack alignItems={"center"}>
                                <Typography>Login</Typography>
                                <Form
                                    width={290}
                                    inputs={loginInputs}
                                    onSubmit={formSubmitHandlerFactory("login")}
                                />     
                            </Stack>
                        </TabPanel>
                        <TabPanel value="registration">
                            <Stack alignItems={"center"}>
                                <Typography>Registration</Typography>
                                <Form
                                    width={290}
                                    inputs={loginInputs}
                                    onSubmit={formSubmitHandlerFactory("registration")}
                                />     
                            </Stack>
                            
                        </TabPanel>
                    </TabContext>
                    
                </Stack>
            </Grid>
        </Grid>
    )
}

export default LandingPage;