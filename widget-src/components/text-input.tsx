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
      // fill="#7f1d1d"
      width={500}
      inputFrameProps={{
        // fill: "#fee2e2",
        // stroke: "#b91c1c",
        cornerRadius: 16,
        padding: 20,
      }}
    />
  );
}
