import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { navigationItems } from "../../constants";
import { Icon } from "../Icon";

function Navigation(): JSX.Element | null {
  const theme = useTheme();

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader
          component="div"
          sx={{ color: "inherit", backgroundColor: "inherit" }}
        >
          Navigation
        </ListSubheader>
      }
      sx={{
        flex: 1,
        maxWidth: 200,
        color: "info.contrastText",
        backgroundColor: "info.main",
      }}
    >
      {navigationItems.map(({ title, iconType, path }) => (
        <ListItemButton key={path} component={Link} to={path}>
          <ListItemIcon>
            <Icon
              type={iconType}
              color={theme.palette.info.contrastText}
              sizeSquareIcon={24}
            />
          </ListItemIcon>
          <ListItemText primary={title} color="inherit" />
        </ListItemButton>
      ))}
    </List>
  );
}

export { Navigation };
