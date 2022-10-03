import { useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import PageContainer from "../components/PageContainer";
import PaginationList from "../components/PaginationList";
import UserView from "../components/UserView";
import useStore from "../hooks/useStore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

function Users(): JSX.Element | null {
  const navigate = useNavigate();

  const { userStore } = useStore();

  useEffect(() => {
    userStore.fetchUsers();
  }, [userStore]);

  const handlePageChange = useCallback(
    (page: number) => {
      userStore.fetchUsers(page);
    },
    [userStore]
  );

  const handleClick = useCallback(
    (id: string) => () => {
      navigate(`/${ROUTES.USERS}/${id}`);
    },
    [navigate]
  );

  return (
    <PageContainer title="Users">
      <PaginationList
        items={userStore.users}
        renderItem={(user) => (
          <UserView key={user.id} user={user} onClick={handleClick(user.id)} />
        )}
        onPageChange={handlePageChange}
        numberOfPages={userStore.pagination.numberOfPages}
      />
    </PageContainer>
  );
}

export default observer(Users);
