import { createTheme } from "@mui/material"

const green = "#30CF88";
const blue = "#3930CF";
const red = "#CF3077";
const yellow = "#C6CF30";

export default createTheme({
    
    palette:{
        primary: {main: green},
        secondary: {main: blue},
        error: {main: red},
        info: {main: yellow},
        text: {primary: blue}
    },
    typography: {
        fontFamily: "'Exo 2', sans-serif",
        h1: {color: blue}
    }
})