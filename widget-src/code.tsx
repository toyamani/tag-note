const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout } = widget;
import { ReloadIcon, PeopleIcon, TagIcon } from "./assets/svg-icons";
import {
  TextInput,
  UserBadge,
  TagLabel,
  LineConnector,
  Checkbox,
} from "./components/index";
import {
  LnType,
  LanguageOptions,
  EnglishTagOptions,
  TagOptionsType,
  TagType,
  TagOptions,
} from "./constants/index";

function Widget() {
  const [ln, setLn] = useSyncedState<LnType>("ln", "en");
  const [checked, setChecked] = useSyncedState<boolean>("checked", false);
  const [tagOption, setTagOption] = useSyncedState<TagOptionsType>(
    "tagOption",
    EnglishTagOptions
  );
  const [tag, setTag] = useSyncedState<TagType>("tag", EnglishTagOptions[0]);
  const [customTagOptions, setCustomTagOptions] =
    useSyncedState<TagOptionsType>("customTagOptions", [
      { option: "custom", label: "Custom", color: "#42AAC7" },
    ]);
  const [toggleTag, setToggleTag] = useSyncedState<boolean>("toggleTag", true);
  const [toggleUserBadge, setToggleUserBadge] = useSyncedState<boolean>(
    "toggleUserBadge",
    true
  );
  const [showName, setShowName] = useSyncedState<boolean>("showName", true);
  const isCustom = tag.option === "custom";

  const updateCustomTagName = (tagName: string) => {
    const newCustomTagOptions = customTagOptions.map((option) => {
      if (tag.option === option.option) {
        return { ...tag, label: tagName };
      }
      return option;
    });
    setCustomTagOptions(newCustomTagOptions);
    setTagOption(newCustomTagOptions);
    const newTag = newCustomTagOptions.find((tag) => tag.option === tag.option);
    setTag(newTag ?? customTagOptions[0]);
  };

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const dropdownItems: Array<WidgetPropertyMenuItem> = toggleTag
    ? [
        {
          itemType: "dropdown",
          propertyName: "language",
          tooltip: "Language",
          selectedOption: ln,
          options: LanguageOptions,
        },
        { itemType: "separator" },
        {
          itemType: "dropdown",
          propertyName: "tag",
          tooltip: "TagType",
          selectedOption: tag.option,
          options: tagOption.map((tag) => {
            return { option: tag.option, label: tag.label };
          }),
        },
      ]
    : [];

  usePropertyMenu(
    [
      ...dropdownItems,
      {
        itemType: "color-selector",
        tooltip: "Custom Tag Color",
        propertyName: "customTagColor",
        options: [
          // TODO: fix color
          { tooltip: "confirm", option: "#42AAC7" },
          { tooltip: "cancel", option: "#8B90BE" },
          { tooltip: "cancel", option: "#DA6272" },
          { tooltip: "cancel", option: "#5EC84E" },
          { tooltip: "cancel", option: "#F3C759" },
        ],
        selectedOption: tag.color,
      },
      {
        itemType: "separator",
      },
      {
        itemType: "toggle",
        tooltip: "Toggle Tag",
        propertyName: "toggleTag",
        isToggled: toggleTag,
        icon: TagIcon,
      },
      {
        itemType: "toggle",
        tooltip: "Toggle User",
        propertyName: "toggleUser",
        isToggled: toggleUserBadge,
        icon: PeopleIcon,
      },
      // {
      //   itemType: "action",
      //   propertyName: "reset",
      //   tooltip: "Reset",
      //   icon: ReloadIcon,
      // },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "language") {
        console.info("language", propertyValue);
        setLn(propertyValue as LnType);
        console.log(TagOptions);
        if (propertyValue === "custom") {
          setTagOption(customTagOptions);
          setTag(customTagOptions[0]);
        } else {
          const newTagOption = TagOptions[propertyValue as LnType];
          console.log("newTagOption", newTagOption);
          setTagOption(newTagOption);
          setTag(newTagOption[0]);
        }
      }
      if (propertyName === "tag") {
        console.info("tag", propertyValue);
        const newTag = tagOption.find((tag) => tag.option === propertyValue);
        if (newTag) {
          setTag(newTag);
          return;
        }
        console.error("selected error");
      }
      if (propertyName === "customTagColor") {
        console.info("customTagColor", propertyValue);
        // TODO: fix color
        const newCustomTagOptions = customTagOptions.map((option) => {
          console.log("option", option, tag);
          if (tag.option === option.option) {
            console.log("chage color");
            return { ...tag, color: propertyValue ?? "#42AAC7" };
          }
          return option;
        });
        console.log("newCustomTagOptions", newCustomTagOptions);
        setCustomTagOptions(newCustomTagOptions);
        setTagOption(newCustomTagOptions);
        const newTag = newCustomTagOptions.find(
          (tag) => tag.option === tag.option
        );
        setTag(newTag ?? customTagOptions[0]);
      }
      if (propertyName === "toggleTag") {
        setToggleTag(!toggleTag);
        // NOTE: Reset Tag
        setTag(EnglishTagOptions[0]);
      }
      if (propertyName === "toggleUser") {
        setToggleUserBadge(!toggleUserBadge);
      }
      // if (propertyName === "reset") {
      //   console.info("reset");
      //   // setCount(0);
      // }
    }
  );

  return (
    <AutoLayout
      horizontalAlignItems={"center"}
      verticalAlignItems="center"
      // opacity={checked ? 0.2 : 1}
    >
      <LineConnector color={tag.color} />
      <AutoLayout
        direction={"vertical"}
        verticalAlignItems={"center"}
        spacing={8}
        padding={16}
        cornerRadius={8}
        fill={"#FFFFFF"}
        stroke={tag.color}
        strokeWidth={5}
      >
        {toggleTag && (
          <TagLabel
            tagName={tag.label}
            tagColor={tag.color}
            isCustom={isCustom}
            onTagChange={updateCustomTagName}
          />
        )}
        <TextInput />
        {toggleUserBadge && (
          <UserBadge showName={showName} setShowName={setShowName} />
        )}
        <AutoLayout positioning="absolute" x={490} y={170}>
          <Checkbox checked={checked} onClick={toggleChecked} />
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
