import { Stack, Typography} from "@mui/material";
import PaddedCard from "../../styled/PaddedCard";
import FriendsLabel from "./FriendsLabel";
import sadNesi from "../../../resources/sadNesi.png";
import UnderlinedBox from "../../styled/UnderlinedBox";
import FriendSearch from "./FriendSearch";

const FriendsManager = (props) => {

    return (
        <PaddedCard>
            <Stack alignItems={"center"} p={1}>
                <Typography pb={3} variant="h5">Friends Manager</Typography>
                <FriendSearch user={props.user}/>
                <UnderlinedBox>
                    <Typography color={"primary.main"} variant="h6">Friend List</Typography>
                </UnderlinedBox>
                {props.user.friends.length === 0 ? 
                <Stack p={2} spacing={3} direction={"row"} alignItems={"center"}>
                    <img src={sadNesi} alt="Sad Nesi"></img>
                    <Typography variant="body">You have no friends...</Typography>
                </Stack>
                    :
                <Stack mt={1} p={.5} spacing={.5} alignItems={"center"} width={"100%"} bgcolor={"#eeeeee"}>
                    {props.user.friends.map(relationship =>
                    <FriendsLabel
                        buttonType="remove"
                        key={Math.random()}
                        user={props.user}
                        relationship={relationship}
                        tooltip={"Remove Friend"}
                    />
                    )}
                </Stack>
                }
            </Stack>
        </PaddedCard>
    )
}

export default FriendsManager