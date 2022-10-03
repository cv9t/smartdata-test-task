import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

const theme = createTheme();

interface ThemeProviderProps {
  children: JSX.Element[] | JSX.Element | null;
}

function ThemeProvider({ children }: ThemeProviderProps): JSX.Element | null {
  return (
    <MUIThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </MUIThemeProvider>
  );
}

export { ThemeProvider };
