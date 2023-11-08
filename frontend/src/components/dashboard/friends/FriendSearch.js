import { Stack, TextField, Typography, InputAdornment, Button, Box } from "@mui/material";
import FriendsLabel from "./FriendsLabel";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

const FriendSearch = (props) => {

    const [friendSearchName, setFriendSeachName] = useState("");
    const [newFriend, setNewFriend] = useState(null);
    const [searchResult, setSearchResult] = useState(null);

    const handleFriendSearchInputChange = (e) => {
        setFriendSeachName(e.target.value);
    }

    const searchResultMessage = (messageObj) => {
        setSearchResult(messageObj);
        setNewFriend(null);
    }

    const handleSeachButtonClick = async () => {
        if (!friendSearchName) return null;
        const friendSeachResult = await props.user.searchUsersForName(friendSearchName);
        if (friendSeachResult) {
            setNewFriend(friendSeachResult);
            setSearchResult(null);
        } else {
            searchResultMessage({message:"No Users with that name found.", color:"error"})
        }
    }


    return (
        <Stack>
            <Stack direction="row">
                <TextField value={friendSearchName} onChange={handleFriendSearchInputChange}
                    InputProps={{endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    )}}
                    />
                <Box width={"auto"} p={1}>
                    <Button variant="contained" onClick={handleSeachButtonClick}>Search</Button>
                </Box>
            </Stack>
            {searchResult &&
            <Typography color={searchResult.color}>{searchResult.message}</Typography>
            }
            {newFriend &&
            <FriendsLabel 
                buttonType="add"
                user={props.user}
                friend={newFriend}
                tooltip={"Send Friend Request"}
                searchResultMessage={searchResultMessage}
                m={1}
            />
            }
        </Stack>
    )
}

export default FriendSearch;