import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&.Mui-disabled': {
            color: '#708090',
          },
        },
        notchedOutline: {
          borderColor: '#708090',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: '#708090',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#0072ff',
      light: '#00c6ff',
      dark: '#8e2de2',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff616f',
      dark: '#9a0036',
    },
  },
})

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;