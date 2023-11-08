import { useState } from "react";
import { Typography, Stack, Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import FriendsManager from "../components/dashboard/friends/FriendsManager";
import GreyTabPanel from "../components/GreyTabPanel";
import UnderlinedBox from "../components/UnderlinedBox";
import MessageLayout from "../components/dashboard/messages/MessageLayout";

const Dashboard = (props) => {

    const [currentTab, setCurrentTab] = useState("tasks");
    const handleTabChange = (e, value) => {
        setCurrentTab(value);
    }

    return (
        <Stack height="100%">
            <Box pl={2} pt={1}>
                <Typography variant="h6">NESI</Typography>
            </Box>
            <TabContext value={currentTab}>
                <UnderlinedBox>
                    <TabList aria-label="Dashboard Options" onChange={handleTabChange}>
                        <Tab label="Daily Tasks" value="tasks" />
                        <Tab label="Plans" value="plans" />
                        <Tab label="Form Builder" value="forms" />
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
                    <Typography>Form Builder</Typography>   
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