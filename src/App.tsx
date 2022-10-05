import { useRoutes } from "react-router-dom";
import route from "./routes";
import ThemeProvider from "./components/ThemeProvider";
import RootStoreProvider from "./components/RootStoreProvider";

function App(): JSX.Element | null {
  const routeElement = useRoutes([route]);

  return (
    <RootStoreProvider>
      <ThemeProvider>{routeElement}</ThemeProvider>
    </RootStoreProvider>
  );
}

export default App;
