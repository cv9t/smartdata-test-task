import { RouteObject } from "react-router-dom";
import { ROUTES } from "../constants";
import Layout from "../components/Layout";
import Post from "../pages/Post";
import User from "../pages/User";
import Users from "../pages/Users";

export const route: RouteObject = {
  path: ROUTES.ROOT,
  element: <Layout />,
  children: [
    {
      path: ROUTES.USERS,
      children: [
        {
          index: true,
          element: <Users />,
        },
        {
          path: ROUTES.USER,
          element: <User />,
        },
      ],
    },
    {
      path: ROUTES.POSTS,
      children: [
        {
          path: ROUTES.POST,
          element: <Post />,
        },
      ],
    },
  ],
};

export default route;
