import { RouteObject } from "react-router-dom";
import { ROUTES } from "../constants";
import { Layout } from "../pages/Layout";
import { Users } from "../pages/Users";

export const routes: RouteObject = {
  path: ROUTES.BASE,
  element: <Layout />,
  children: [
    {
      path: ROUTES.USERS,
      element: <Users />,
    },
  ],
};
