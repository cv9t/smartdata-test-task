import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";

function Navigation(): JSX.Element | null {
  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" sx={{ backgroundColor: "inherit" }}>
          Navigation
        </ListSubheader>
      }
      sx={{ flex: 1, maxWidth: 200, backgroundColor: "info.dark" }}
    >
      <ListItemButton>
        <ListItemText primary="Users" />
      </ListItemButton>
    </List>
  );
}

export { Navigation };
