import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom";
import Options from "./option_page";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Options />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
