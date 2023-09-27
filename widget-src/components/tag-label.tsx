const { widget } = figma;
const { AutoLayout, Text } = widget;
import { TAG } from "../constants/index";

type Props = {
  tag: (typeof TAG)[keyof typeof TAG];
};
export function TagLabel({ tag }: Props) {
  return (
    <AutoLayout padding={8} cornerRadius={8} fill="#E6E6E6">
      <Text
        onClick={() => {
          console.log("onClick Tag");
        }}
        fill="#222"
      >
        {tag.label}
      </Text>
    </AutoLayout>
  );
}
