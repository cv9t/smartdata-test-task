import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";
import useStore from "../hooks/useStore";

function User(): JSX.Element | null {
  const { userId } = useParams<"userId">();

  const { userStore } = useStore();

  const user = userStore.getUserById(userId);

  useEffect(() => {
    if (userId && !user) {
      userStore.fetchUser(userId);
    }
  }, [user, userId, userStore]);

  return (
    <Loading loading={userStore.loading}>
      {user ? (
        <Outlet />
      ) : (
        <PageContainer>
          <Typography variant="h6">User not found &#128533;</Typography>
        </PageContainer>
      )}
    </Loading>
  );
}

export default observer(User);
