import { NavigationItemType } from "../types";

export enum ROUTES {
  ROOT = "/",
  USERS = "users",
  USER = ":userId",
}

export const navigationItems: NavigationItemType[] = [
  {
    title: "Users",
    iconType: "users",
    path: ROUTES.USERS,
  },
];
