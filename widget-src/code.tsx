// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Line, Ellipse } = widget;
import { ReloadIcon, PeopleIcon, TagIcon } from "./assets/svg-icons";
import { TextInput, UserBadge, TagLabel } from "./components/index";
import { Tag, TagType, LnType, LanguageOptions } from "./constants/index";

function Widget() {
  const [ln, setLn] = useSyncedState<LnType>("ln", "en");
  const [tag, setTag] = useSyncedState<TagType>("tag", Tag.SPECS);
  const [toggleTag, setToggleTag] = useSyncedState<boolean>("toggleTag", true);
  const [toggleCustom, setToggleCustom] = useSyncedState<boolean>(
    "toggleCustom",
    false
  );
  const [customTagColor, setCustomTagColor] = useSyncedState<string>(
    "customTagColor",
    "#000000"
  );
  const [toggleUserBadge, setToggleUserBadge] = useSyncedState<boolean>(
    "toggleUserBadge",
    true
  );
  const [showName, setShowName] = useSyncedState<boolean>("showName", true);
  const color = toggleCustom ? customTagColor : tag.color;

  const dropdownItems: Array<WidgetPropertyMenuItem> = toggleTag
    ? [
        {
          itemType: "dropdown",
          propertyName: "tag",
          tooltip: "TagType",
          selectedOption: tag.option,
          options: Object.values(Tag).map((tag) => {
            return { option: tag.option, label: tag.label[ln] };
          }),
        },
        {
          itemType: "dropdown",
          propertyName: "language",
          tooltip: "Language",
          selectedOption: ln,
          options: LanguageOptions,
        },
      ]
    : [];

  usePropertyMenu(
    [
      ...dropdownItems,
      {
        itemType: "toggle",
        tooltip: "Toggle Tag",
        propertyName: "toggleTag",
        isToggled: toggleTag,
        icon: TagIcon,
      },
      {
        itemType: "toggle",
        tooltip: "Toggle Custom",
        propertyName: "toggleCustom",
        isToggled: toggleCustom,
        // TODO: fix icon
        icon: TagIcon,
      },
      {
        itemType: "color-selector",
        tooltip: "Custom Tag Color",
        propertyName: "customTagColor",
        options: [
          // TODO: fix color
          { tooltip: "confirm", option: "#F3C759" },
          { tooltip: "cancel", option: "#000000" },
          { tooltip: "cancel", option: "#8B90BE" },
          { tooltip: "cancel", option: "#DA6272" },
        ],
        selectedOption: customTagColor,
      },
      {
        itemType: "toggle",
        tooltip: "Toggle User",
        propertyName: "toggleUser",
        isToggled: toggleUserBadge,
        icon: PeopleIcon,
      },
      {
        itemType: "action",
        propertyName: "reset",
        tooltip: "Reset",
        icon: ReloadIcon,
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "tag") {
        console.info("tag", propertyValue);
        const newTag = Object.values(Tag).find(
          (tag) => tag.option === propertyValue
        );
        if (newTag) {
          setTag(newTag);
          return;
        }
        console.error("selected error");
      }
      if (propertyName === "customTagColor") {
        console.info("customTagColor", propertyValue);
        // TODO: fix color
        setCustomTagColor(propertyValue ?? "#000000");
      }
      if (propertyName === "toggleTag") {
        setToggleTag(!toggleTag);
        // NOTE: Reset Tag
        setTag(Tag.SPECS);
      }
      if (propertyName === "toggleCustom") {
        setToggleCustom(!toggleCustom);
      }
      if (propertyName === "toggleUser") {
        setToggleUserBadge(!toggleUserBadge);
      }
      if (propertyName === "language") {
        console.info("language", propertyValue);
        setLn(propertyValue as LnType);
      }
      if (propertyName === "reset") {
        console.info("reset");
        // setCount(0);
      }
    }
  );

  return (
    <AutoLayout horizontalAlignItems={"center"} verticalAlignItems="center">
      <AutoLayout
        width={200}
        height={50}
        direction="horizontal"
        verticalAlignItems="center"
        horizontalAlignItems="center"
        y={50}
      >
        <Ellipse
          fill={color}
          width={15}
          height={15}
          y={15}
          positioning="absolute"
        />
        <Line
          length={200}
          strokeWidth={5}
          stroke={color}
          y={25}
          x={10}
          positioning="absolute"
        />
      </AutoLayout>
      <AutoLayout
        direction={"vertical"}
        verticalAlignItems={"center"}
        spacing={8}
        padding={16}
        cornerRadius={8}
        fill={"#FFFFFF"}
        stroke={color}
        strokeWidth={5}
      >
        {toggleTag && (
          <TagLabel
            tag={tag}
            tagColor={color}
            ln={ln}
            isCustom={toggleCustom}
          />
        )}
        <TextInput />
        {toggleUserBadge && (
          <UserBadge showName={showName} setShowName={setShowName} />
        )}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
