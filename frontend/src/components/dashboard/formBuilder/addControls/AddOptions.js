import { IconButton, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddOptions = (props) => {

    return(

        <Stack width={"100%"} alignItems={"center"}>
            <Typography>{props.title}</Typography>
            <IconButton color={"primary"} onClick={props.addOption}>
                <AddCircleOutlineIcon />
            </IconButton>
        </Stack>

    );
}

export default AddOptions;