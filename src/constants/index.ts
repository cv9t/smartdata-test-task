import { NavigationItemType } from "../types";

export enum ROUTES {
  ROOT = "/",
  USERS = "users",
  USER = ":userId",
  POSTS = "posts",
  POST = ":postId",
}

export const navigationItems: NavigationItemType[] = [
  {
    title: "Users",
    iconType: "users",
    path: ROUTES.USERS,
  },
];

export enum X_HEADERS {
  COUNT_PAGES = "x-pagination-pages",
}
