import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../hooks/useStore";

function UserProfile(): JSX.Element | null {
  const { userId } = useParams<"userId">();

  const { userStore } = useStore();

  const user = userStore.getUserById(userId);

  useEffect(() => {
    if (!user && userId) {
      userStore.fetchUser(userId);
    }
  }, [user, userId, userStore]);

  return <>{user?.id}</>;
}

export default observer(UserProfile);
