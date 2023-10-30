import { Stack, TextField, Typography, InputAdornment, Button, Box, Card } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import sadNesi from "../../../resources/sadNesi.png";

const FriendsManager = (props) => {
    return (
        <Box p={1}>
            <Card>
                <Stack alignItems={"center"} p={1}>
                    <Typography pb={4} variant="h5">Friends Manager</Typography>
                    <Stack direction="row">
                        <TextField
                            InputProps={{startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )}}
                        />
                        <Box width={"auto"} p={1}>
                            <Button variant="contained">Search</Button>
                        </Box>
                    </Stack>
                    <Box sx={{ borderBottom: 1, borderColor: "primary.main", width: "100%"}}>
                        <Typography color={"primary.main"} variant="h6">Friend List</Typography>
                    </Box>
                    {props.user.friends.length === 0 && 
                    <Stack p={2} spacing={3} direction={"row"} alignItems={"center"}>
                        <img src={sadNesi} alt="Sad Nesi"></img>
                        <Typography variant="body">You have no friends...</Typography>
                    </Stack>
                    }
                </Stack>
            </Card>
        </Box>
    )
}

export default FriendsManager