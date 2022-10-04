import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import PaginationList from "../components/PaginationList";
import PostView from "../components/PostView";
import useStore from "../hooks/useStore";

function Posts(): JSX.Element | null {
  const { userId } = useParams<"userId">();
  const navigate = useNavigate();

  const [numberOfPages, setNumberOfPages] = useState(0);

  const { postStore, userStore } = useStore();

  const user = userStore.getUserById(userId);

  useEffect(() => {
    if (userId) {
      (async () => {
        const res = await postStore.fetchPostsByUserId(userId);
        if (res && res.headers) {
          const numberOfPages = Number(res.headers["x-pagination-pages"]);
          setNumberOfPages(numberOfPages);
        }
      })();
    }
  }, [userId, postStore]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (userId) {
        postStore.fetchPostsByUserId(userId, page);
      }
    },
    [userId, postStore]
  );

  const handleClick = useCallback(
    (id: string) => () => {
      navigate(id);
    },
    [navigate]
  );

  return (
    <PageContainer title="Posts">
      <PaginationList
        items={user?.posts || []}
        renderItem={(post) => (
          <PostView key={post.id} post={post} onClick={handleClick(post.id)} />
        )}
        emptyList={
          <Typography variant="h6">
            Unfortunately, this user has no posts &#128533;
          </Typography>
        }
        onPageChange={handlePageChange}
        numberOfPages={numberOfPages}
        loading={postStore.loading}
      />
    </PageContainer>
  );
}

export default observer(Posts);
