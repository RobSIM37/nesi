import { useState } from "react";
import { Typography, Stack, Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import FriendsManager from "../components/dashboard/friends/FriendsManager";
import GreyTabPanel from "../components/styled/GreyTabPanel";
import UnderlinedBox from "../components/styled/UnderlinedBox";
import MessageLayout from "../components/dashboard/messages/MessageLayout";
import Forms from "../components/dashboard/forms/Forms";

const Dashboard = (props) => {

    const [currentTab, setCurrentTab] = useState("tasks");
    const [activeForm, setActiveForm] = useState({ inputs: []});

    const handleTabChange = (e, value) => {
        setCurrentTab(value);
    }

    const updateActiveForm = (form) => {
        setActiveForm(form);
    }

    return (
        <Stack height="100%">
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Box pl={2} pt={1}>
                    <Typography variant="h6">NESI</Typography>
                </Box>
                <Box pr={2} pt={1}>
                    <Typography variant="h6">{`Hi ${props.user.name}!`}</Typography>
                </Box>
            </Stack>
            <TabContext value={currentTab}>
                <UnderlinedBox>
                    <TabList aria-label="Dashboard Options" onChange={handleTabChange}>
                        <Tab label="Daily Tasks" value="tasks" />
                        <Tab label="Plans" value="plans" />
                        <Tab label="Forms" value="forms" />
                        <Tab label="Progress" value="progress" />
                        <Tab label="Friends" value="friends" />
                        <Tab label="Messages" value="messages" />
                    </TabList>
                </UnderlinedBox>
                <GreyTabPanel value="tasks">
                    <Typography>Daily Tasks</Typography>
                </GreyTabPanel>
                <GreyTabPanel value="plans">
                    <Typography>Plans</Typography>   
                </GreyTabPanel>
                <GreyTabPanel value="forms">
                    <Forms user={props.user} activeForm={activeForm} updateActiveForm={updateActiveForm}/>
                </GreyTabPanel>
                <GreyTabPanel value="progress">
                    <Typography>Progress</Typography>   
                </GreyTabPanel>
                <GreyTabPanel value="friends">
                    <FriendsManager user={props.user}/>   
                </GreyTabPanel>
                <GreyTabPanel value="messages">
                    <MessageLayout user={props.user}/>
                </GreyTabPanel>
            </TabContext>
        </Stack>
    )
}

export default Dashboard;