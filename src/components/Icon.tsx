import * as Icons from "../assets/icons";
import { IconType } from "../types";

interface IconProps {
  type: IconType;
  color?: string;
  stroke?: string;
  width?: number | string;
  height?: number | string;
  sizeSquareIcon?: number | string;
  onClick?: () => void;
}

type IconMapType = { [key in IconType]: JSX.Element | null };

function Icon({
  type,
  color,
  stroke,
  width,
  height,
  sizeSquareIcon,
  onClick,
}: IconProps): JSX.Element | null {
  const iconMap: IconMapType = {
    users: (
      <Icons.UsersIcon
        stroke={stroke}
        color={color}
        width={width || sizeSquareIcon}
        height={height || sizeSquareIcon}
        onClick={onClick}
      />
    ),
  };

  return iconMap[type];
}

export default Icon;
