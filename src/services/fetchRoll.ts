import { ENDPOINTS } from "@/constants/endoints";
import UserStore from "@/modules/user-store";
import axios from "axios";

export const fetchRoll = async () => {
  const { data } = await axios.post(ENDPOINTS.roll, {
    balance: UserStore.getState().user?.balance,
  });

  if (data.success) {
    return data.data;
  }

  return data;
};
