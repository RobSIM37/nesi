import { Stack, Typography } from "@mui/material";
import PaddedCard from "../../PaddedCard";
import MessageDisplay from "./MessageDisplay";

const MessageCollection = (props) => {
    return (
        <PaddedCard>
            <Stack p={1} s={2}>
                <Typography variant="h5">Messages</Typography>
                <Stack mt={2} p={1} bgcolor={"#eeeeee"}>
                    {props.user.messages.length !==0 ? 
                    props.user.messages.map(message=>
                    <MessageDisplay key={Math.random()} message={message} user={props.user}/>
                    )
                        :
                    <Typography>You have no unread messages.</Typography>
                    }
                </Stack>
            </Stack>
        </PaddedCard>
    )
}

export default MessageCollection;