import { RouteObject } from "react-router-dom";
import { ROUTES } from "../constants";
import { Layout } from "../pages/Layout";

export const routes: RouteObject = {
  path: ROUTES.BASE,
  element: <Layout />,
};
