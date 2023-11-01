import { Stack, TextField, Typography, InputAdornment, Button, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PaddedCard from "../../PaddedCard";
import FriendsLabel from "./FriendsLabel";
import sadNesi from "../../../resources/sadNesi.png";
import { useState } from "react";

const FriendsManager = (props) => {

    const [friendSearchName, setFriendSeachName] = useState("");
    const [newFriend, setNewFriend] = useState(null);
    const [searchError, setSearchError] = useState(null);

    const friends = [
        {userName: "Joe"},
        {userName: "Jim"},
        {userName: "John"},
        {userName: "Jospeh"}
    ]

    const handleFriendSearchInputChange = (e) => {
        setFriendSeachName(e.target.value);
    }

    const handleSeachButtonClick = async () => {
        if (!friendSearchName) return null;
        const friendSeachResult = await props.user.searchUsersForName(friendSearchName);
        if (friendSeachResult) {
            setNewFriend(friendSeachResult);
            setSearchError(null);
        } else {
            setSearchError("No Friends with that name found.");
            setNewFriend(null);
        }
    }

    return (
        <PaddedCard>
            <Stack alignItems={"center"} p={1}>
                <Typography pb={3} variant="h5">Friends Manager</Typography>
                <Stack direction="row">
                    <TextField value={friendSearchName} onChange={handleFriendSearchInputChange}
                        InputProps={{startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )}}
                    />
                    <Box width={"auto"} p={1}>
                        <Button variant="contained" onClick={handleSeachButtonClick}>Search</Button>
                    </Box>
                </Stack>
                {searchError &&
                <Typography color={"error"}>{searchError}</Typography>
                }
                {newFriend &&
                <FriendsLabel buttonType="add" key={Math.random()} user={props.user} friend={newFriend}/>
                }
                <Box sx={{ borderBottom: 1, borderColor: "primary.main", width: "100%"}}>
                    <Typography color={"primary.main"} variant="h6">Friend List</Typography>
                </Box>
                {friends.length === 0 ? 
                <Stack p={2} spacing={3} direction={"row"} alignItems={"center"}>
                    <img src={sadNesi} alt="Sad Nesi"></img>
                    <Typography variant="body">You have no friends...</Typography>
                </Stack>
                    :
                <Stack mt={1} p={.5} spacing={0.5} alignItems={"center"} width={"100%"} bgcolor={"#eeeeee"}>
                    {friends.map(friend => <FriendsLabel buttonType="remove" key={Math.random()} user={props.user} friend={friend}/>)}
                </Stack>
                }
            </Stack>
        </PaddedCard>
    )
}

export default FriendsManager