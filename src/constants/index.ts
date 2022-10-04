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
