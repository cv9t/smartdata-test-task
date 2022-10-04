import { useEffect, useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import PageContainer from "../components/PageContainer";
import PaginationList from "../components/PaginationList";
import UserView from "../components/UserView";
import useStore from "../hooks/useStore";

function Users(): JSX.Element | null {
  const [numberOfPages, setNumberOfPages] = useState(0);

  const { userStore } = useStore();

  useEffect(() => {
    (async () => {
      const res = await userStore.fetchUsers();
      if (res && res.headers) {
        const numberOfPages = Number(res.headers["x-pagination-pages"]);
        setNumberOfPages(numberOfPages);
      }
    })();
  }, [userStore]);

  const handlePageChange = useCallback(
    (page: number) => {
      userStore.fetchUsers(page);
    },
    [userStore]
  );

  return (
    <PageContainer title="Users">
      <PaginationList
        items={userStore.users}
        renderItem={(user) => <UserView key={user.id} user={user} />}
        onPageChange={handlePageChange}
        numberOfPages={numberOfPages}
        loading={userStore.loading}
      />
    </PageContainer>
  );
}

export default observer(Users);
