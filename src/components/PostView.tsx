import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import PostModel from "../models/PostModel";

interface PostViewProps {
  post: PostModel;
  onClick: () => void;
}

function PostView({ post, onClick }: PostViewProps): JSX.Element | null {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h6">{post.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default observer(PostView);
