import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import User from "../models/UserModel";

interface UserViewProps {
  user: User;
}

function UserView({ user }: UserViewProps): JSX.Element | null {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(user.id);
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
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
