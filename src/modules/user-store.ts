"use client";

import { prizeMapping } from "@/constants/slot";
import { CompleteRollResult, RollResult } from "@/types/roll";
import { v4 } from "uuid";
import { create } from "zustand";

const USER_KEY = "USER_KEY";

interface User {
  bank: number;
  session: string;
  history: RollResult[];
  balance: number;
}

interface UserState {
  user: User | null;
  initializeStore: () => void;
  cashOut: () => void;
  buyIn: () => void;
  restart: () => void;
  saveRollResult: (prize: CompleteRollResult) => void;
  currentResult: CompleteRollResult | null | undefined;
  setCurrentResult: (
    currentResult: CompleteRollResult | undefined | null
  ) => void;
}

const INITIAL_USER_STATE = {
  bank: 0,
  session: v4(),
  balance: 10,
  history: [],
};

const getUserFromStorage = (): User => {
  const storedUser = JSON.parse(localStorage.getItem(USER_KEY)!);

  if (storedUser) {
    return { ...storedUser, session: v4() };
  }

  return INITIAL_USER_STATE;
};

export const saveUserToStore = () => {
  const state = UserStore.getState();
  const { currentResult, user } = state;

  if (!user) {
    return;
  }

  if (currentResult && user.history.at(-1)?.gameId !== currentResult.gameId) {
    state.saveRollResult(currentResult);
  }

  delete (user as Partial<User>).session;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const UserStore = create<UserState>((set, get) => ({
  user: null,
  currentResult: undefined,
  initializeStore: () => set({ user: getUserFromStorage() }),
  cashOut: () => {
    const currentUser = get().user as User;
    set({
      user: {
        ...currentUser,
        session: v4(),
        bank: currentUser.balance + currentUser.bank,
        balance: 0,
      },
    });
  },
  buyIn: () => {
    const currentUser = get().user as User;
    set({
      user: {
        ...currentUser,
        bank: currentUser.bank >= 10 ? currentUser.bank - 10 : 0,
        balance: currentUser.bank >= 10 ? 10 : currentUser.bank,
      },
    });
  },
  restart: () => set({ user: INITIAL_USER_STATE }),
  setCurrentResult: (currentResult) => set({ currentResult }),
  saveRollResult: (result) => {
    const userState = get().user as User;

    const composedRollResult: RollResult = {
      gameId: result.gameId,
      prize: result.isWinning ? prizeMapping[result.roll[0]] : -1,
      roll: result.roll,
    };

    userState.history.push(composedRollResult);
    userState.balance += composedRollResult.prize;

    set({ user: userState });
  },
}));

export default UserStore;
