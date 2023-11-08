import { Stack, Typography } from "@mui/material";
import PaddedCard from "../../PaddedCard";
import Form from "../../form/Form";
import { messageBuilderFormInputs } from "../../../consts/form/messageBuilderForm";
import FriendSearch from "../friends/FriendSearch";

const MessageBuilder = (props) => {

    const messageBuilderFormSubmitEventHandler = (data) => {
        props.user.sendMessage(data.to.value, data.body.value);
    }

    return (
        <PaddedCard>
            {props.user.friends.length !== 0 ?
            <Stack p={1}>
                <Typography variant="h5">Message Builder</Typography>
                <Form
                    inputs={[
                        { type: "select",
                            dataKey: "to",
                            label: "To:",
                            menuItems: props.user.friends.map(
                                relationship => {
                                    return {value:relationship.friend.id,
                                            label:relationship.friend.userName}
                                }
                            ), 
                            required: true,
                            default: ""
                        },
                        ...messageBuilderFormInputs
                    ]}
                    onSubmit={messageBuilderFormSubmitEventHandler}
                />
            </Stack>
                :
            <Stack alignItems={"center"} p={1} spacing={2}>
                <Typography>You must have a friend in order to use the Message Builder, so let's find one...</Typography>
                <FriendSearch user={props.user}/>
            </Stack>
            }
        </PaddedCard>
    )
}

export default MessageBuilder;