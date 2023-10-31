const { widget } = figma;
const { AutoLayout, Text, Input, useSyncedState } = widget;
import { TagType, LnType } from "../constants/index";

type Props = {
  tag: TagType;
  tagColor: string;
  ln: LnType;
  isCustom: boolean;
};
export function TagLabel({ tag, tagColor, ln, isCustom }: Props) {
  const [text, setText] = useSyncedState("tagText", "");
  return (
    <AutoLayout padding={8} cornerRadius={8} fill={tagColor}>
      {isCustom ? (
        <Input
          value={text}
          fontWeight={700}
          fill="#fff"
          width={100}
          // TODO: fix Language
          placeholder="Type Tag"
          onTextEditEnd={(e) => {
            setText(e.characters);
          }}
        />
      ) : (
        <Text fill="#fff" fontWeight={700}>
          {tag.label[ln]}
        </Text>
      )}
    </AutoLayout>
  );
}
