import { Typography } from "@mui/material";
import UnderlinedBox from "../../UnderlinedBox";
import PaddedCard from "../../PaddedCard";
import MessageButtonSet from "./MessageButtonSet";

const MessageDisplay = (props) => {
    return (
        <PaddedCard p={.5}>
            <UnderlinedBox>
                <Typography p={1} variant="h5">{`From: ${props.message.senderName}`}</Typography>
            </UnderlinedBox>
            <Typography p={1} variant="h6" component="pre">{props.message.body}</Typography>
            <MessageButtonSet message={props.message} type={props.message.type} user={props.user}/>
        </PaddedCard>
    )
}

export default MessageDisplay;