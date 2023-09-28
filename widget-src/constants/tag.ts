export const Language = {
  en: { option: "en", label: "English" },
  ja: { option: "ja", label: "Japanese" },
};

export const LanguageOptions = Object.values(Language);

export type LnType = keyof typeof Language;

export const TAG_LABELS = {
  SPECS: { en: "Specs", ja: "仕様" },
  NOTES: { en: "Notes", ja: "作業メモ" },
  UPDATE: { en: "Update", ja: "修正" },
  REVIEW: { en: "Review", ja: "レビュー" },
  CONFIRM: { en: "Confirm", ja: "要確認" },
};

export const Tag = {
  SPECS: { option: "specs", label: TAG_LABELS.SPECS, color: "#42AAC7" },
  NOTES: { option: "notes", label: TAG_LABELS.NOTES, color: "#8B90BE" },
  UPDATE: { option: "update", label: TAG_LABELS.UPDATE, color: "#DA6272" },
  REVIEW: { option: "review", label: TAG_LABELS.REVIEW, color: "#5EC84E" },
  CONFIRM: { option: "confirm", label: TAG_LABELS.CONFIRM, color: "#F3C759" },
};

export type TagType = (typeof Tag)[keyof typeof Tag];
