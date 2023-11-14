import { Box, IconButton, MenuItem, Stack, TextField } from "@mui/material";
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
        <Stack direction={"row"}>
            <Box>
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
            <IconButton onClick={addButtonClickEventHandler}>
                <AddCircleOutlineIcon />
            </IconButton>
        </Stack>
    );
}

export default AddSelect;