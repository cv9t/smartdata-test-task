import { Box, Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import CommentView from "../components/CommentView";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";
import PaginationList from "../components/PaginationList";
import useStore from "../hooks/useStore";

function Post(): JSX.Element | null {
  const { postId } = useParams<"postId">();

  const [numberOfPages, setNumberOfPages] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const { postStore, commentStore } = useStore();

  const post = postStore.getPostById(postId);

  useEffect(() => {
    if (postId) {
      postStore.fetchPost(postId);
    }
  }, [postId, postStore]);

  useEffect(() => {
    if (postId && showComments) {
      (async () => {
        const res = await commentStore.fetchCommentsByPostId(postId);
        if (res && res.headers) {
          const numberOfPages = Number(res.headers["x-pagination-pages"]);
          setNumberOfPages(numberOfPages);
        }
      })();
    }
  }, [commentStore, postId, showComments]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (postId) {
        commentStore.fetchCommentsByPostId(postId, page);
      }
    },
    [commentStore, postId]
  );

  const handleShowCommentsToggle = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <PageContainer title="Post">
      <Loading loading={postStore.loading}>
        {post ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {post.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              {post.body}
            </Typography>
            <Box sx={{ mb: showComments ? 3 : 0 }}>
              <Button
                variant="contained"
                color={showComments ? "error" : "info"}
                onClick={handleShowCommentsToggle}
              >
                {showComments ? "Hide comments" : "Show comments"}
              </Button>
            </Box>
            {showComments && (
              <PaginationList
                items={post.comments}
                renderItem={(comment) => (
                  <CommentView key={comment.id} comment={comment} />
                )}
                onPageChange={handlePageChange}
                numberOfPages={numberOfPages}
                loading={commentStore.loading}
              />
            )}
          </Box>
        ) : (
          <Typography variant="h6">Post not found &#128533;</Typography>
        )}
      </Loading>
    </PageContainer>
  );
}

export default observer(Post);
