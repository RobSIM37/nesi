import { IconButton, Stack } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderBox from "../../../../styled/BorderBox";

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

    const wrapperSelectedMouseOverEventHandler = () => {
        props.selectItem(props.index);
    }

    const generateIndicatorColor = () => {
        if (props.index === props.currentSelectedIndex) return "secondary.main";
        if (!props.valid) return "warning.main";
        return "primary.main"
    }
    
    return (
        <Stack direction={"row"}>
            <BorderBox p={0} borderThickness={3} borderColor={generateIndicatorColor()} onMouseEnter={wrapperSelectedMouseOverEventHandler}>
                {props.content}
            </BorderBox>
            {props.index === props.currentSelectedIndex &&
                <Stack direction={"row"} alignItems={"center"}>
                    <Stack>
                        <IconButton size="small" onClick={moveItemUpClickEventHandler}>
                            <ArrowDropUpIcon/>
                        </IconButton>
                        <IconButton size="small" onClick={moveItemDownClickEventHandler}>
                            <ArrowDropDownIcon/>
                        </IconButton>
                    </Stack>
                    <IconButton size="small" onClick={deleteItemClickEventHandler}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Stack>
            }
        </Stack>
    )
}

export default Wrapper;