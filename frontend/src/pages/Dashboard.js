import { useState } from "react";
import { Typography, Stack, Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import FriendsManager from "../components/dashbaord/friends/FriendsManager";
import GreyTabPanel from "../components/GreyTabPanel";

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
                <Box sx={{ borderBottom: 1, borderColor: "primary.main"}}>
                    <TabList aria-label="Dashboard Options" onChange={handleTabChange}>
                        <Tab label="Daily Tasks" value="tasks" />
                        <Tab label="Plans" value="plans" />
                        <Tab label="Form Builder" value="forms" />
                        <Tab label="Progress" value="progress" />
                        <Tab label="Friends" value="friends" />
                        <Tab label="Messages" value="messages" />
                    </TabList>
                </Box>
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
                    <Typography>Messages</Typography>   
                </GreyTabPanel>
            </TabContext>
        </Stack>
    )
}

export default Dashboard;