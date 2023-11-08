import { Button, Stack } from "@mui/material";
import { DELETED_FRIEND, FRIEND_REQUEST, USER_GENERATED } from "../../../consts/messages/messageTypes";

const MessageButtonSet = (props) => {

    const acceptButtonClickHandler = () => {
        props.user.acceptFriendRequest(props.message);
    }

    const declineButtonClickHandler = () => {
        props.user.declineFriendRequest(props.message._id);
    }

    const markButtonClickEventHandler = () => {
        props.user.markMessageAsRead(props.message._id);
    }
    const generateButtons = () => {
        switch (props.type) {
            case FRIEND_REQUEST:
                return (
                    <>
                        <Button variant="contained" onClick={acceptButtonClickHandler}>Accept</Button>
                        <Button variant="contained" onClick={declineButtonClickHandler} color="error">Decline</Button>
                    </>
                )
            case USER_GENERATED:
            case DELETED_FRIEND:
                return (
                    <Button variant="contained" onClick={markButtonClickEventHandler}>Mark as Read</Button>
                )
            default:
                return <></>
        }
    }
    return (
        <Stack direction={"row"} spacing={1} p={1}>
            {generateButtons()}
        </Stack>
    )
}

export default MessageButtonSet;