const { widget, currentPage } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Text, Span } = widget;
import { ReloadIcon, PeopleIcon, TagIcon } from "./assets/svg-icons";
import {
  TextInput,
  UserBadge,
  TagLabel,
  LineConnector,
  Checkbox,
  DisabledView,
} from "./components/index";
import {
  LnType,
  LanguageOptions,
  EnglishTagOptions,
  TagOptionsType,
  TagType,
  TagOptions,
  LineDirectionType,
  LineDirectionOptions,
} from "./constants/index";
import { formatDate } from "./functions/format-date";

function Widget() {
  const date = new Date();
  const [editDate, setEditDate] = useSyncedState<string>(
    "editDate",
    formatDate(date)
  );

  const [ln, setLn] = useSyncedState<LnType>("ln", "en");
  const [lineDirection, setLineDirection] = useSyncedState<LineDirectionType>(
    "lineDirection",
    "left"
  );
  const [checked, setChecked] = useSyncedState<boolean>("checked", false);
  const [disabled, setDisabled] = useSyncedState<boolean>("disabled", false);
  const [tagOption, setTagOption] = useSyncedState<TagOptionsType>(
    "tagOption",
    EnglishTagOptions
  );
  const [tag, setTag] = useSyncedState<TagType>("tag", EnglishTagOptions[0]);
  const [customTagOptions, setCustomTagOptions] =
    useSyncedState<TagOptionsType>("customTagOptions", [
      { option: "custom", label: "", color: "#42AAC7" },
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

  const updateEditDate = () => {
    const updateDate = new Date();
    setEditDate(formatDate(updateDate));
  };

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const toggleDisabledView = () => {
    setDisabled(!disabled);
  };

  usePropertyMenu(
    [
      toggleTag && !isCustom
        ? {
            itemType: "dropdown",
            propertyName: "tag",
            tooltip: "TagType",
            selectedOption: tag.option,
            options: tagOption.map((tag) => {
              return { option: tag.option, label: tag.label };
            }),
          }
        : { itemType: "separator" },
      isCustom
        ? {
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
          }
        : { itemType: "separator" },
      {
        itemType: "dropdown",
        propertyName: "lineDirection",
        tooltip: "Line Direction",
        selectedOption: lineDirection,
        options: LineDirectionOptions,
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
      toggleTag
        ? {
            itemType: "dropdown",
            propertyName: "language",
            tooltip: "Language",
            selectedOption: ln,
            options: LanguageOptions,
          }
        : { itemType: "separator" },
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
      if (propertyName === "lineDeriction") {
        setLineDirection(propertyValue as LineDirectionType);
      }
      if (propertyName === "toggleTag") {
        setToggleTag(!toggleTag);
      }
      if (propertyName === "toggleUser") {
        setToggleUserBadge(!toggleUserBadge);
      }
    }
  );

  return (
    <AutoLayout
      horizontalAlignItems={"center"}
      verticalAlignItems="center"
      opacity={disabled ? 0.5 : 1}
    >
      {lineDirection !== "none" && (
        <LineConnector color={tag.color} direction={lineDirection} />
      )}
      <AutoLayout direction={"vertical"} spacing={4}>
        {toggleTag && (
          <TagLabel
            tagName={tag.label}
            tagColor={tag.color}
            isCustom={isCustom}
            onTagChange={updateCustomTagName}
          />
        )}
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
          <AutoLayout padding={{ bottom: 16 }}>
            <TextInput onChange={updateEditDate} />
          </AutoLayout>
          <AutoLayout
            width={"fill-parent"}
            direction={"vertical"}
            horizontalAlignItems={"end"}
            spacing={4}
          >
            <AutoLayout
              direction={"horizontal"}
              verticalAlignItems={"center"}
              spacing={8}
            >
              {toggleUserBadge && (
                <UserBadge showName={showName} setShowName={setShowName} />
              )}
              <DisabledView disabled={disabled} onClick={toggleDisabledView} />
              <Checkbox checked={checked} onClick={toggleChecked} />
            </AutoLayout>
            <Text fill={"#777777"}>{editDate}</Text>
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
