import { Typography, Box} from "@mui/material";

const FormStatement = (props) => {
  return (
    <Box width={props.width || 350}>
        <Typography>{props.statement}</Typography>
    </Box>
  );
};

export default FormStatement;
