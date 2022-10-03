import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { ChildrenType } from "../types";

const theme = createTheme();

interface ThemeProviderProps {
  children: ChildrenType;
}

function ThemeProvider({ children }: ThemeProviderProps): JSX.Element | null {
  return (
    <MUIThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
