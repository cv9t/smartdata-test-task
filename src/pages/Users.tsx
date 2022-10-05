import { useEffect, useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import PageContainer from "../components/PageContainer";
import PaginationList from "../components/PaginationList";
import UserView from "../components/UserView";
import useStore from "../hooks/useStore";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import { X_HEADERS } from "../constants";
import { Typography } from "@mui/material";

function Users(): JSX.Element | null {
  const [numberOfPages, setNumberOfPages] = useState(0);

  const { userStore } = useStore();

  const { fetch: initialFetch, loading: initialLoading } = useFetch(
    async () => {
      const res = await userStore.fetchUsers();
      if (res && res.headers) {
        const numberOfPages = Number(res.headers[X_HEADERS.COUNT_PAGES]);
        setNumberOfPages(numberOfPages);
      }
    }
  );

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  const handlePageChange = useCallback(
    (page: number) => {
      userStore.fetchUsers(page);
    },
    [userStore]
  );

  return (
    <Loading loading={initialLoading}>
      <PageContainer title="Users">
        <Loading loading={userStore.loading} cover>
          <PaginationList
            items={userStore.users}
            renderItem={(user) => <UserView key={user.id} user={user} />}
            emptyList={
              <Typography variant="h6">
                Unfortunately, there are no users &#128533;
              </Typography>
            }
            onPageChange={handlePageChange}
            numberOfPages={numberOfPages}
          />
        </Loading>
      </PageContainer>
    </Loading>
  );
}

export default observer(Users);
