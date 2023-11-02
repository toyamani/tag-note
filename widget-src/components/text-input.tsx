const { widget } = figma;
const { useSyncedState, Input } = widget;

type Props = {
  onChange: () => void;
};
export function TextInput({ onChange }: Props) {
  const [text, setText] = useSyncedState("text", "");

  return (
    <Input
      value={text}
      inputBehavior="multiline"
      placeholder="Type comment..."
      onTextEditEnd={(e) => {
        setText(e.characters);
        onChange();
      }}
      fontSize={20}
      width={500}
      inputFrameProps={{
        cornerRadius: 16,
        padding: 5,
      }}
    />
  );
}
