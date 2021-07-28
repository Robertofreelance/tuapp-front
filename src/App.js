import React from "react";
import { MuiThemeProvider, CssBaseline, Box } from "@material-ui/core";

import theme from "./theme";

import GlobalStyles from "./GlobalStyles";
import NavBar from "./NavBar";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Box width="100%">
        <NavBar />
      </Box>
    </MuiThemeProvider>
  );
}

export default App;
