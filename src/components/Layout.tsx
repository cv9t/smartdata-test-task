import { useState, useEffect } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import useStore from "../hooks/useStore";
import { navigationWidth } from "../constants";

function Layout(): JSX.Element | null {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const rootStore = useStore();

  useEffect(() => {
    if (rootStore.errorMessage) {
      setOpenSnackbar(true);
    }
  }, [openSnackbar, rootStore.errorMessage]);

  const handleSnackbarClose = () => {
    rootStore.setErrorMessage(null);
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Navigation />
      <Box sx={{ display: "flex", ml: `${navigationWidth}px` }}>
        <Outlet />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {rootStore.errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default observer(Layout);
