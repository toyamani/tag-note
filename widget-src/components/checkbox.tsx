const { widget } = figma;
const { SVG } = widget;
import { CheckboxIcon } from "../assets/svg-icons";

type Props = {
  checked: boolean;
  onClick: () => void;
};

export function Checkbox({ checked, onClick }: Props) {
  return (
    <SVG
      src={CheckboxIcon}
      onClick={onClick}
      fill={checked ? "#42AAC7" : "#DDDDDD"}
      width={25}
      height={25}
    />
  );
}
