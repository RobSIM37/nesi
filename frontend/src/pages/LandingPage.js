import { useState } from "react";
import { Typography, Stack, Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import axios from "axios";
import { currentUrl } from "../consts/url";
import nesi from "../resources/nesi.png";
import Form from "../components/form/Form";
import { loginInputs } from "../consts/form/loginForm";
import GreyTabPanel from "../components/GreyTabPanel";

const LandingPage = (props) => {

    const [loginRegError, setLoginRegError] = useState(null);
    const [currentTab, setCurrentTab] = useState("login");

    const handleTabChange = (e, value) => {
        setCurrentTab(value);
    }

    const formSubmitHandlerFactory = (endpoint) => {
        return (data) => {
            axios
                .post(`${currentUrl()}/${endpoint}`, {userName:data.userName.value, password:data.password.value})
                .then(res=>{
                    setLoginRegError(null);
                    sessionStorage.setItem("nesiAuthPassword",data.password)
                    props.initNewUser(res.data);
                })
                .catch(err=>{
                    setLoginRegError("There was an issue with the provided user name & password.");
                })
        }
    }

    return (
        <Stack height={"100%"}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Box p={1} width={200}>
                    <img src={nesi} alt="Nesi Logo"></img>
                </Box>
                <Typography align="center" variant="h1">Welcome to NESI!</Typography>
                <Box p={1} width={200}></Box>
            </Stack>
            <Stack height={"100%"}>
                {loginRegError &&
                <Box p={1}>
                    <Typography color="warning.main">{loginRegError}</Typography>
                </Box>
                }
                <TabContext value={currentTab} height={"100%"}>
                    <Box sx={{ borderBottom: 1, borderColor: "primary.main"}}>
                        <TabList aria-label="Login or Registration" onChange={handleTabChange}>
                            <Tab label="Login" value="login" />
                            <Tab label="Create an Account" value="register" />
                        </TabList>
                    </Box>
                    <GreyTabPanel value="login">
                        <Typography>Login</Typography>
                        <Form
                            width={400}
                            inputs={[...loginInputs,{ type: "button", text: "Login" }]}
                            onSubmit={formSubmitHandlerFactory("login")}
                        />  
                    </GreyTabPanel>
                    <GreyTabPanel value="register">
                        <Typography>Create an Account</Typography>
                        <Form
                            width={400}
                            inputs={[...loginInputs,{ type: "button", text: "Create" }]}
                            onSubmit={formSubmitHandlerFactory("register")}
                        />
                    </GreyTabPanel>
                </TabContext>
            </Stack>
        </Stack>
    )
}

export default LandingPage;