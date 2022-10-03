export type IconType = "users";

export type IconMapType = { [key in IconType]: JSX.Element | null };

export type NavigationItemType = {
  title: string;
  iconType: IconType;
  path: string;
};
