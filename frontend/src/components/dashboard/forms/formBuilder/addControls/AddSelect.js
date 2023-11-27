import { Box, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";

const AddSelect = (props) => {

    const [value, setValue] = useState(props.default)

    const selectChangeEventHandler = (e) => {
        setValue(e.target.value);
    }

    const addButtonClickEventHandler = () => {
        if (value) props.addItem(value)
    }

    return (

        <Stack width={"100%"} alignItems={"center"}>
            <Typography>{props.title}</Typography>
            <Stack direction={"row"} width={"100%"}>
                <Box width={"100%"}>
                    <TextField
                        fullWidth
                        label={props.label}
                        select
                        value={value}
                        onChange={selectChangeEventHandler}
                    >
                        {props.options.map(option => <MenuItem key={Math.random()} value={option}>{option}</MenuItem>)}
                    </TextField>
                </Box>
                <IconButton color={"primary"} onClick={addButtonClickEventHandler}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Stack>
        </Stack>
        
    );
}

export default AddSelect;