const { widget } = figma;
const { useSyncedState, Input } = widget;

export function TextInput() {
  const [text, setText] = useSyncedState("text", "");

  return (
    <Input
      value={text}
      inputBehavior="multiline"
      placeholder="Type name"
      onTextEditEnd={(e) => {
        setText(e.characters);
      }}
      fontSize={32}
      width={500}
      inputFrameProps={{
        cornerRadius: 16,
        padding: 20,
      }}
    />
  );
}
