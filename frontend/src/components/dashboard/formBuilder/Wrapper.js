import { Box, IconButton, Stack } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const Wrapper = (props) => {

    const moveItemUpClickEventHandler = () => {
        props.moveItemUp(props.index);
    }

    const moveItemDownClickEventHandler = () => {
        props.moveItemDown(props.index);
    }

    const deleteItemClickEventHandler = () => {
        props.deleteItem(props.index);
    }
    const wrapperSelectedClickEventHandler = () => {
        props.selectItem(props.index);
    }
    const generateIndicatorColor = () => {
        if (props.index === props.currentSelectedIndex) return "info.main";
        if (!props.valid) return "warning.main";
        return "primary.main"
    }
    
    return (
        <Box onClick={wrapperSelectedClickEventHandler}>
            <Stack direction={"row"}>
                <Box bgcolor={generateIndicatorColor()} width={"20px"}/>
                {props.content}
                {props.index === props.currentSelectedIndex &&
                <>
                <Stack>
                    <IconButton onClick={moveItemUpClickEventHandler}>
                        <ArrowDropUpIcon />
                    </IconButton>
                    <IconButton onClick={moveItemDownClickEventHandler}>
                        <ArrowDropDownIcon />
                    </IconButton>
                </Stack>
                <IconButton onClick={deleteItemClickEventHandler}>
                    <DeleteForeverIcon />
                </IconButton>
                </>
                }
            </Stack>
        </Box>
    )
}

export default Wrapper;