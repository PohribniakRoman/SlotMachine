export type RollResult = {
  prize: number;
  gameId: string;
  roll: PrizeList[];
};

export type CompleteRollResult = {
  roll: PrizeList[];
  isWinning: boolean;
  gameId: string;
  message?: string;
};

export enum PrizeList {
  C = "Cherry",
  L = "Lemon",
  O = "Orange",
  W = "Watermelon",
}
