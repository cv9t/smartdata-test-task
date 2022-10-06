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
  const [openComments, setOpenComments] = useState(false);

  const { postStore, commentStore } = useStore();

  const { fetch: initialFetch, loading: initialLoading } = useFetch(
    async (postId: string) => {
      await postStore.fetchPost(postId);
    }
  );

  useEffect(() => {
    if (postId) {
      initialFetch(postId);
    }
  }, [postId, initialFetch]);

  useEffect(() => {
    const fetchCommentsByPostId = async (postId: string) => {
      const res = await commentStore.fetchCommentsByPostId(postId);
      if (res && res.headers) {
        const numberOfPages = Number(res.headers[X_HEADERS.PAGINATION_PAGES]);
        setNumberOfPages(numberOfPages);
      }
    };

    if (postId && openComments) {
      fetchCommentsByPostId(postId);
    }
  }, [commentStore, postId, openComments]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (postId) {
        commentStore.fetchCommentsByPostId(postId, page);
      }
    },
    [commentStore, postId]
  );

  const handleOpenCommentsToggle = () => {
    setOpenComments((prev) => !prev);
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
            <Box sx={{ mb: openComments ? 3 : 0 }}>
              <Button
                variant="contained"
                color={openComments ? "error" : "info"}
                onClick={handleOpenCommentsToggle}
              >
                {openComments ? "Hide comments" : "Show comments"}
              </Button>
            </Box>
            {openComments && (
              <Box sx={{ position: "relative" }}>
                <Loading
                  loading={commentStore.loading}
                  cover={Boolean(post.comments.length)}
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
