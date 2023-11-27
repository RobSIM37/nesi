import { Box } from "@mui/material"

const BorderBox = (props) => {
    return (
        <Box
            p={props.p}
            sx={{
                border: props.borderThickness || 1,
                borderColor: props.borderColor || "primary.main"
            }}
            onMouseEnter={props.onMouseEnter}
        >
            {props.children}
        </Box>
    )
}

export default BorderBox;