import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";
import PaginationList from "../components/PaginationList";
import PostView from "../components/PostView";
import useStore from "../hooks/useStore";

function User(): JSX.Element | null {
  const { userId } = useParams<"userId">();

  const [numberOfPages, setNumberOfPages] = useState(0);

  const { userStore, postStore } = useStore();

  const user = userStore.getUserById(userId);

  useEffect(() => {
    if (userId) {
      userStore.fetchUser(userId);
    }
  }, [userId, userStore]);

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
  }, [postStore, userId]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (userId) {
        postStore.fetchPostsByUserId(userId, page);
      }
    },
    [userId, postStore]
  );

  return (
    <Loading loading={userStore.loading}>
      <PageContainer title="User">
        {user ? (
          <PaginationList
            items={user.posts}
            renderItem={(post) => <PostView key={post.id} post={post} />}
            emptyList={
              <Typography variant="h6">
                Unfortunately, this user has no posts &#128533;
              </Typography>
            }
            onPageChange={handlePageChange}
            numberOfPages={numberOfPages}
            loading={postStore.loading}
          />
        ) : (
          <Typography variant="h6">User not found &#128533;</Typography>
        )}
      </PageContainer>
    </Loading>
  );
}

export default observer(User);
