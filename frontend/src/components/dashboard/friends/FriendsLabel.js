import { Box, IconButton, Stack, Typography, Card, Tooltip } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'

const FriendsLabel = (props) => {

    const buttonClickEventHandler = async () => {
        if (props.buttonType === "add") {
            const results = await props.user.sendFriendRequest(props.relationship.friend._id);
            console.log("results", results)
            if (results) {
                props.searchResultMessage({message:"Friend Request Sent.",color:"primary"})
            } else {
                props.searchResultMessage({message:"You may send only one request to this user.", color:"error"})
            }
        } else {
            props.user.removeFriend(props.relationship.id)
        }    
    }

    return (
        <Box width={"100%"} m={props.m}>
            <Card>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box p={1}>
                        <Typography>{props.relationship.friend.userName}</Typography>
                    </Box>
                    <Tooltip title={props.tooltip} placement="right">
                        <IconButton width={"100%"} onClick={buttonClickEventHandler}>
                            {props.buttonType === "add" ? 
                            <PersonAddAlt1Icon color={"primary"}/> 
                                :
                            <PersonRemoveIcon color={"error"}/>
                            }
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Card>
        </Box>
    )
}

export default FriendsLabel