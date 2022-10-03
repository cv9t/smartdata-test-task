import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { ThemeProvider } from "./components/ThemeProvider";

function App(): JSX.Element | null {
  const routeElement = useRoutes([routes]);

  return <ThemeProvider>{routeElement}</ThemeProvider>;
}

export { App };
