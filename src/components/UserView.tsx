import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import User from "../models/UserModel";

interface UserViewProps {
  user: User;
  onClick: () => void;
}

function UserView({ user, onClick }: UserViewProps): JSX.Element | null {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" sx={{ mr: 1 }}>
              {user.name}
            </Typography>
            <Typography
              variant="body2"
              color={user.status === "active" ? "success.main" : "error.main"}
            >
              {user.status}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default observer(UserView);
