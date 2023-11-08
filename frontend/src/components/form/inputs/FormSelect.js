import { Box, MenuItem, TextField } from "@mui/material"

const FormSelect = (props) => {

    const selectChangeEventHandler = (e) => {
        props.form.reportChange(props.dataKey, e.target.value)
    }

    return (
        <Box width={"100%"}>
            <TextField
                fullWidth
                label={props.label}
                select
                value={props.form.data}
                onChange={selectChangeEventHandler}
            >
                {props.menuItems.map(item=>
                <MenuItem
                    key={Math.random()}
                    value={item.value}
                >
                    {item.label}
                </MenuItem>
                )}
            </TextField>
        </Box>
    )
}

export default FormSelect