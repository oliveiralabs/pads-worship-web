export type Locale = "en" | "pt";
export type SoundAccess = "free" | "task" | "premium";

export type SoundItem = {
  id: string;
  name: string;
  audioUrl: string;
  sortOrder: number;
};

export type PadSound = {
  id: string;
  name: string;
  slug: string;
  access: SoundAccess;
  isPremium: boolean;
  isDefault: boolean;
  needUserTask: boolean;
  sortOrder: number;
  cover: string;
  sourceCoverUrl: string;
  featured: boolean;
  description: string;
  descriptionPt: string;
  items: SoundItem[];
};
