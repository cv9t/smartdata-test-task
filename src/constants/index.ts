import { NavigationItemType } from "../types";

export enum ROUTES {
  BASE = "/",
  USERS = "users",
}

export const navigationItems: NavigationItemType[] = [
  {
    title: "Users",
    iconType: "users",
    path: ROUTES.USERS,
  },
];
