import { Grid } from "@mui/material";
import MessageBuilder from "./MessageBuilder";
import MessageCollection from "./MessageCollection";

const MessageLayout = (props) => {
    return (
        <Grid container>
            <Grid item xs={4}>
                <MessageBuilder user={props.user}/>
            </Grid>
            <Grid item xs={8}>
                <MessageCollection user={props.user}/>
            </Grid>
        </Grid>
    )
}

export default MessageLayout; 