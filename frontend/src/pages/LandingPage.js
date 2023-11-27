import { useState } from "react";
import { Typography, Stack, Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import axios from "axios";
import { currentUrl } from "../consts/url";
import nesi from "../resources/nesi.png";
import Form from "../components/form/Form";
import { loginInputs } from "../consts/form/loginForm";
import GreyTabPanel from "../components/styled/GreyTabPanel";
import FormLayout from "../components/form/FormLayout";

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
                    sessionStorage.setItem("nesiUser", JSON.stringify(res.data));
                    localStorage.setItem("nesiPassword", data.password.value);
                    props.initNewUser(res.data);
                })
                .catch(err=>{
                    console.log("ERR:", err)
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
                    <GreyTabPanel value="login" alignItems={"center"}>
                        <Typography>Login</Typography>
                        <FormLayout width={400}>
                            <Form
                                
                                inputs={[...loginInputs,{ type: "button", text: "Login" }]}
                                onSubmit={formSubmitHandlerFactory("login")}
                            />
                        </FormLayout>
                    </GreyTabPanel>
                    <GreyTabPanel value="register" alignItems={"center"}>
                        <Typography>Create an Account</Typography>
                        <FormLayout width={400}>
                            <Form
                                inputs={[...loginInputs,{ type: "button", text: "Create" }]}
                                onSubmit={formSubmitHandlerFactory("register")}
                            />
                        </FormLayout>
                    </GreyTabPanel>
                </TabContext>
            </Stack>
        </Stack>
    )
}

export default LandingPage;