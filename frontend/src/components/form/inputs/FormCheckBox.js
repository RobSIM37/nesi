import { Stack, Typography, Box, Checkbox } from "@mui/material";

const FormCheckBox = (props) => {
  return (
    <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Box width={120}>
          <Typography ml={1}>{props.label}</Typography>
        </Box>
        <Checkbox
          checked={props.form.data}
          onChange={(e) => {
            props.form.reportChange(props.dataKey, e.target.checked);
          }}
        />
      </Stack>
  );
};

export default FormCheckBox;
