import { Box, IconButton, Stack, Typography, Card, Tooltip } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'

const FriendsLabel = (props) => {

    const addButtonClickEventHandler = async () => {
        const results = await props.user.sendFriendRequest(props.relationship.friend._id);
            if (results) {
                props.searchResultMessage({message:"Friend Request Sent.",color:"primary"})
            } else {
                props.searchResultMessage({message:"You may send only one request to this user.", color:"error"})
            }
    }

    const removeButtonClickEventHandler = () => {
        props.user.removeFriend(props.relationship.id)
    }

    return (
        <Box width={"100%"} m={props.m}>
            <Card>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box p={1}>
                        <Typography>{props.relationship.friend.userName}</Typography>
                    </Box>
                    <Tooltip title={props.tooltip} placement="right">
                        {props.buttonType === "add" ? 
                            <IconButton width={"100%"} onClick={addButtonClickEventHandler}>
                                <PersonAddAlt1Icon color={"primary"}/> 
                            </IconButton>
                                :
                            <IconButton width={"100%"} onClick={removeButtonClickEventHandler}>
                                <PersonRemoveIcon color={"error"}/> 
                            </IconButton>
                        }
                    </Tooltip>
                </Stack>
            </Card>
        </Box>
    )
}

export default FriendsLabel