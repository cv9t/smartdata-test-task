import { RouteObject } from "react-router-dom";
import { ROUTES } from "../constants";
import Layout from "../pages/Layout";
import UserProfile from "../pages/UserProfile";
import Users from "../pages/Users";

export const route: RouteObject = {
  path: ROUTES.ROOT,
  element: <Layout />,
  children: [
    {
      path: ROUTES.USERS,
      element: <Users />,
      children: [
        {
          path: ROUTES.USER,
          element: <UserProfile />,
        },
      ],
    },
  ],
};

export default route;
