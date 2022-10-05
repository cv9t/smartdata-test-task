import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";
import PaginationList from "../components/PaginationList";
import PostView from "../components/PostView";
import { X_HEADERS } from "../constants";
import useFetch from "../hooks/useFetch";
import useStore from "../hooks/useStore";

function User(): JSX.Element | null {
  const { userId } = useParams<"userId">();

  const [numberOfPages, setNumberOfPages] = useState(0);

  const { userStore, postStore } = useStore();

  const { fetch: initialFetch, loading: initialLoading } = useFetch(
    async (userId: string) => {
      await userStore.fetchUser(userId);

      const res = await postStore.fetchPostsByUserId(userId);
      if (res && res.headers) {
        const numberOfPages = Number(res.headers[X_HEADERS.COUNT_PAGES]);
        setNumberOfPages(numberOfPages);
      }
    }
  );

  useEffect(() => {
    if (userId) {
      initialFetch(userId);
    }
  }, [initialFetch, userId]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (userId) {
        postStore.fetchPostsByUserId(userId, page);
      }
    },
    [userId, postStore]
  );

  const user = userStore.getUserById(userId);

  return (
    <Loading loading={initialLoading}>
      <PageContainer title="User">
        {user ? (
          <Loading loading={postStore.loading} cover>
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
            />
          </Loading>
        ) : (
          <Typography variant="h6">User not found &#128533;</Typography>
        )}
      </PageContainer>
    </Loading>
  );
}

export default observer(User);
