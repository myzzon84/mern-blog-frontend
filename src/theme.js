import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: ['10px 10px rgba(0,0,0,0.2)', '10px 10px rgba(0,0,0,0.1)'],
  // shadows: ["none"],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
