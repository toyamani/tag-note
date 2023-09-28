const { widget } = figma;
const { AutoLayout, Text } = widget;
import { TagType, LnType } from "../constants/index";

type Props = {
  tag: TagType;
  ln: LnType;
};
export function TagLabel({ tag, ln }: Props) {
  return (
    <AutoLayout padding={8} cornerRadius={8} fill={tag.color}>
      <Text
        // onClick={() => {
        //   console.log("onClick Tag");
        // }}
        fill="#fff"
        fontWeight={700}
      >
        {tag.label[ln]}
      </Text>
    </AutoLayout>
  );
}
