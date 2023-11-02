const { widget } = figma;
const { AutoLayout, Text, Input, useSyncedState } = widget;
import { LnType } from "../const/index";

type Props = {
  tagName: string;
  tagColor: string;
  isCustom: boolean;
  onTagChange: (tagName: string) => void;
};
export function TagLabel({ tagName, tagColor, isCustom, onTagChange }: Props) {
  return (
    <AutoLayout padding={8} cornerRadius={8} fill={tagColor}>
      {isCustom ? (
        <Input
          value={tagName}
          fontWeight={700}
          fill="#fff"
          width={100}
          // TODO: fix Language
          placeholder="Type Tag"
          onTextEditEnd={(e) => {
            onTagChange(e.characters);
          }}
        />
      ) : (
        <Text fill="#fff" fontWeight={700}>
          {tagName}
        </Text>
      )}
    </AutoLayout>
  );
}
