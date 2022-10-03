import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

function Layout(): JSX.Element | null {
  return (
    <div>
      <Navigation />
      <Box sx={{ display: "flex", ml: "200px" }}>
        <Outlet />
      </Box>
    </div>
  );
}

export default Layout;
