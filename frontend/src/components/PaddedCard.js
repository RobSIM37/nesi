import { Box, Card } from "@mui/material"

const PaddedCard = (props) => {
    return (
        <Box p={props.p || 1} width={props.width} m={props.m || 1} label="here">
            <Card p={props.p || 1}>
                {props.children}
            </Card>
        </Box>
    )
}

export default PaddedCard;