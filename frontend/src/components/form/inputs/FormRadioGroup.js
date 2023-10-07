import {
  Stack,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
} from "@mui/material";

const FormRadioGroup = (props) => {
  return (
    <Stack direction={"row"} justifyContent={"center"}>
        <FormControl>
          <FormLabel>{props.label}</FormLabel>
          <RadioGroup
            row
            value={props.data}
            onChange={(e) => {
              props.form.reportChange(props.dataKey, e.target.value);
            }}
          >
            <Box width={props.width}>
              {props.choices.map(choice=>
                <FormControlLabel key={Math.random()} value={choice.value} label={choice.label} control={<Radio />}/>
              )}
            </Box>
          </RadioGroup>
        </FormControl>
      </Stack>
  );
};

export default FormRadioGroup;
