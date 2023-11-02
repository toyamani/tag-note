export const Language = {
  en: { option: "en", label: "English" },
  ja: { option: "ja", label: "Japanese" },
  icon: { option: "icon", label: "Icon" },
  custom: { option: "custom", label: "Custom" },
};

export const LanguageOptions = Object.values(Language);

export type LnType = keyof typeof Language;

export type TagType = {
  option: string;
  label: string;
  color: string;
};

export type TagOptionsType = TagType[];

export const EnglishTagOptions = [
  { option: "specs", label: "Specs", color: "#42AAC7" },
  { option: "notes", label: "Notes", color: "#8B90BE" },
  { option: "update", label: "Update", color: "#DA6272" },
  { option: "review", label: "Review", color: "#5EC84E" },
  { option: "confirm", label: "Confirm", color: "#F3C759" },
];

export const JapaneseTagOptions = [
  { option: "仕様", label: "仕様", color: "#42AAC7" },
  { option: "作業メモ", label: "作業メモ", color: "#8B90BE" },
  { option: "修正", label: "修正", color: "#DA6272" },
  { option: "レビュー", label: "レビュー", color: "#5EC84E" },
  { option: "要確認", label: "要確認", color: "#F3C759" },
];

// TODO: change icon
export const IconTagOptions = [
  { option: "仕様", label: "仕様", color: "#42AAC7" },
  { option: "作業メモ", label: "作業メモ", color: "#8B90BE" },
  { option: "修正", label: "修正", color: "#DA6272" },
  { option: "レビュー", label: "レビュー", color: "#5EC84E" },
  { option: "要確認", label: "要確認", color: "#F3C759" },
];

export const TagOptions = {
  en: EnglishTagOptions,
  ja: JapaneseTagOptions,
  icon: IconTagOptions,
  custom: [],
};
