import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navigation } from "../../components/Navigation";

function Layout(): JSX.Element | null {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Navigation />
      <Outlet />
    </Box>
  );
}

export { Layout };
