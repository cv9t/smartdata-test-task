import { Card, CardContent, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import CommentModel from "../models/CommentModel";

interface CommentViewProps {
  comment: CommentModel;
}

function CommentView({ comment }: CommentViewProps): JSX.Element | null {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          {comment.email}
        </Typography>
        <Typography variant="body2">{comment.body}</Typography>
      </CardContent>
    </Card>
  );
}

export default observer(CommentView);
