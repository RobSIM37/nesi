import { Box, IconButton, Stack, Typography, Card } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const FriendsLabel = (props) => {
    return (
        <Box width={"100%"}>
            <Card>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box p={1}>
                        <Typography>{props.friend.userName}</Typography>
                    </Box>
                    <IconButton width={"100%"}>
                        {props.buttonType === "add" ? <PersonAddAlt1Icon color={"primary"}/> : <PersonRemoveIcon color={"error"}/>}
                    </IconButton>
                </Stack>
            </Card>
        </Box>
    )
}

export default FriendsLabel