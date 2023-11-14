import { Stack } from "@mui/material";
import Wrapper from "./Wrapper";

const WrapperCollection = (props) => {
    return (
        <Stack>
            {props.collection.map((item, index) =>
            <Wrapper 
                key={Math.random()}
                valid={item.valid}
                content={item.content} 
                index={index}
                currentSelectedIndex={props.currentSelectedIndex}
                moveItemUp={props.moveItemUp}
                moveItemDown={props.moveItemDown}
                deleteItem={props.deleteItem}
                selectItem={props.selectItem}
            />
            )}
            {props.addControl}
        </Stack>
    );
}

export default WrapperCollection;