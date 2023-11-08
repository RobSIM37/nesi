import { Box } from "@mui/material"

const UnderlinedBox = (props) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: "primary.main", width: "100%"}}>
            {props.children}
        </Box>
    )
}

export default UnderlinedBox;