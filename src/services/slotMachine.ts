import { prizeMapping } from "@/constants/slot";
import { CompleteRollResult, PrizeList } from "@/types/roll";
import { randomUniform } from "d3-random";
import { v4 } from "uuid";

const generateRandom = randomUniform(0, 1);

class SlotMachine {
  #getRandomSymbol() {
    const list = Object.keys(prizeMapping) as PrizeList[];
    const randomValue = generateRandom();
    const randomIndex = Math.floor(randomValue * list.length);

    return list[randomIndex];
  }

  #generateRandomRoll() {
    return Array.from({ length: 3 }).map(this.#getRandomSymbol);
  }

  #isWinningRoll(roll: PrizeList[]) {
    return roll.every((item) => item === roll[0]);
  }

  #getCheatProbability(currentCredits: number) {
    if (currentCredits < 40) {
      return 0;
    }

    if (currentCredits >= 40 && currentCredits < 60) {
      return 0.3;
    }

    return 0.6;
  }

  #shouldCheat(cheatProbability: number) {
    return generateRandom() < cheatProbability;
  }

  #roll() {
    const roll = this.#generateRandomRoll();
    const isWinning = this.#isWinningRoll(roll);

    return {
      isWinning,
      roll,
      gameId: v4(),
    };
  }

  performRoll(currentCredits: number): CompleteRollResult {
    const rollResult = this.#roll();

    if (rollResult.isWinning) {
      const cheatProbability = this.#getCheatProbability(currentCredits);
      if (this.#shouldCheat(cheatProbability)) {
        return this.#roll();
      }
    }

    return rollResult;
  }
}

export const slotMachine = new SlotMachine();
