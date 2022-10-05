import { Box, Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import CommentView from "../components/CommentView";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";
import PaginationList from "../components/PaginationList";
import { X_HEADERS } from "../constants";
import useFetch from "../hooks/useFetch";
import useStore from "../hooks/useStore";

function Post(): JSX.Element | null {
  const { postId } = useParams<"postId">();

  const [numberOfPages, setNumberOfPages] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const { postStore, commentStore } = useStore();

  const { fetch: initialFetch, loading: initialLoading } = useFetch(
    async (postId: string) => {
      await postStore.fetchPost(postId);
    }
  );

  const {
    fetch: initialCommentsFetch,
    loading: initialCommentsLoading,
    loaded: initialCommentsLoaded,
  } = useFetch(async (postId: string) => {
    const res = await commentStore.fetchCommentsByPostId(postId);
    if (res && res.headers) {
      const numberOfPages = Number(res.headers[X_HEADERS.COUNT_PAGES]);
      setNumberOfPages(numberOfPages);
    }
  });

  useEffect(() => {
    if (postId) {
      initialFetch(postId);
    }
  }, [postId, initialFetch]);

  useEffect(() => {
    if (postId && showComments) {
      initialCommentsFetch(postId);
    }
  }, [initialCommentsFetch, postId, showComments]);

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

  const post = postStore.getPostById(postId);

  return (
    <Loading loading={initialLoading}>
      <PageContainer title="Post">
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
              <Box sx={{ position: "relative" }}>
                <Loading loading={initialCommentsLoading}>
                  <Loading
                    loading={commentStore.loading}
                    cover={initialCommentsLoaded}
                  >
                    <PaginationList
                      items={post.comments}
                      renderItem={(comment) => (
                        <CommentView key={comment.id} comment={comment} />
                      )}
                      emptyList={
                        <Typography variant="body2">
                          Unfortunately, this post has no comments &#128533;
                        </Typography>
                      }
                      onPageChange={handlePageChange}
                      numberOfPages={numberOfPages}
                    />
                  </Loading>
                </Loading>
              </Box>
            )}
          </Box>
        ) : (
          <Typography variant="h6">Post not found &#128533;</Typography>
        )}
      </PageContainer>
    </Loading>
  );
}

export default observer(Post);
