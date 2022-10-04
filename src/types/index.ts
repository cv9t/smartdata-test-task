export type IconType = "users";

export type NavigationItemType = {
  title: string;
  iconType: IconType;
  path: string;
};

export type GenderType = "male" | "female";

export type StatusType = "active" | "inactive";

export interface IUser {
  id: string;
  name: string;
  email: string;
  gender: GenderType;
  status: StatusType;
}

export interface IPost {
  id: string;
  userId: string;
  title: string;
  body: string;
}
export interface IComment {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
}

export type ChildrenType = JSX.Element[] | JSX.Element | null;
