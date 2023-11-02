const { widget } = figma;
const { SVG } = widget;
import { DisabledViewIcon } from "../assets/svg-icons";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

export function DisabledView({ disabled, onClick }: Props) {
  return (
    <SVG
      src={DisabledViewIcon}
      onClick={onClick}
      fill={disabled ? "#42AAC7" : "#DDDDDD"}
      width={25}
      height={25}
    />
  );
}
