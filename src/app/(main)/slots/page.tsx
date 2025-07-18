"use client";

import { RollingContainer } from "@components/RollingContainer";
import UserStore, { saveUserToStore } from "@modules/user-store";
import "@styles/slots/index.scss";
import { useEffect } from "react";

const { initializeStore } = UserStore.getState();

export default function Slots() {
  useEffect(() => {
    initializeStore();
    window.addEventListener("beforeunload", saveUserToStore);
    return () => window.removeEventListener("beforeunload", saveUserToStore);
  }, []);

  return <RollingContainer />;
}
