import { Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";

const GreyTabPanel = (props) => {
    return (
        <TabPanel value={props.value} sx={{p:0, height:"100%"}}>
            <Stack direction={props.direction} alignItems={props.alignItems} height={"100%"} bgcolor={"#eeeeee"} pt={1}>
                {props.children}    
            </Stack>
        </TabPanel>
    )
}

export default GreyTabPanel