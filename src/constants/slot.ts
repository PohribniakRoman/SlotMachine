import { PrizeList } from "@/types/roll";

export const prizeMapping: Record<PrizeList, number> = {
  Cherry: 10,
  Lemon: 20,
  Orange: 30,
  Watermelon: 40,
};

export const iconMapping: Record<PrizeList, string> = {
  Cherry: "🍒",
  Lemon: "🍊",
  Orange: "🍋",
  Watermelon: "🍉",
};
