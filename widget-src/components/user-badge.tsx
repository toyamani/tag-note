const { widget } = figma;
const { AutoLayout, Image, Rectangle, Text, useSyncedState, useEffect } =
  widget;

type Props = {
  showName: boolean;
  setShowName: (showName: boolean) => void;
};

export function UserBadge({ showName, setShowName }: Props) {
  const [name, setName] = useSyncedState<string>("name", "");
  const [photoUrl, setPhotoUrl] = useSyncedState<string | null>(
    "photoUrl",
    null
  );

  useEffect(() => {
    if (!name) {
      if (figma.currentUser) {
        setName(figma.currentUser.name);
        setPhotoUrl(figma.currentUser.photoUrl);
      } else {
        figma.notify("Please login to figma");
      }
    }
  });

  return (
    <AutoLayout
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      padding={4}
      fill="#FFFFFF"
      cornerRadius={8}
      spacing={6}
    >
      <AutoLayout
        onClick={() => {
          console.log("onClick UserBadge");
          setShowName(!showName);
        }}
        direction="horizontal"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        height="hug-contents"
        padding={5}
        fill="#E6E6E6"
        cornerRadius={8}
      >
        {photoUrl ? (
          <Image cornerRadius={6} width={30} height={30} src={photoUrl} />
        ) : (
          <Rectangle cornerRadius={6} width={30} height={30} fill="#2A2A2A" />
        )}
        {showName && (
          <AutoLayout
            direction="horizontal"
            horizontalAlignItems="center"
            verticalAlignItems="center"
            height="hug-contents"
            padding={4}
          >
            <Text fontSize={16}>{name}</Text>
          </AutoLayout>
        )}
      </AutoLayout>
    </AutoLayout>
  );
}
