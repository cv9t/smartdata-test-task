import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import PostModel from "../models/PostModel";

interface PostViewProps {
  post: PostModel;
}

function PostView({ post }: PostViewProps): JSX.Element | null {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${ROUTES.POSTS}/${post.id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h6">{post.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default observer(PostView);
