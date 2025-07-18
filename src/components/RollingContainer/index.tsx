import UserStore from "@/modules/user-store";
import { fetchRoll } from "@/services/fetchRoll";
import { CompleteRollResult } from "@/types/roll";
import { RollingCell } from "@components/RollingCell";
import { RollingControls } from "@components/RollingControls";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { RollingHistory } from "@components/RollingHistory";

export const SLOTS_COUNT = 3;

export const RollingContainer = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { user, saveRollResult, setCurrentResult } = useStore(UserStore);
  const { data, refetch, isSuccess, isError } = useQuery<CompleteRollResult>({
    queryFn: fetchRoll,
    queryKey: [],
    enabled: false,
  });

  useEffect(() => {
    let timeoutFunction: NodeJS.Timeout;
    if (isSuccess && data) {
      setCurrentResult(data);
      timeoutFunction = setTimeout(() => {
        saveRollResult(data);
        setButtonDisabled(false);
      }, SLOTS_COUNT * 1000);
    }

    if (isError) {
      setCurrentResult(undefined);
    }

    return () => timeoutFunction && clearTimeout(timeoutFunction);
  }, [data]);

  return (
    <div className="game-container">
      <div className="slot-machine">
        <div className="slot-machine-header">
          <h1 className="game-title">🎰 LUCKY SLOTS</h1>
          <div className="balance-display">
            <span className="balance-label">Bank:</span>
            <span className="balance-amount">${user?.bank || 0}</span>
            <hr />
            <span className="balance-label">Balance:</span>
            <span className="balance-amount">${user?.balance || 0}</span>
          </div>
        </div>

        <div className="spinning__container">
          {Array.from({ length: SLOTS_COUNT }).map((_, i) => (
            <RollingCell key={i} index={i} />
          ))}
        </div>

        <RollingControls
          isButtonDisabled={isButtonDisabled}
          setButtonDisabled={setButtonDisabled}
          refetch={refetch}
        />
      </div>

      <div className="game-info-panel">
        <div className="session-info">
          <h3>🎮 Game Session</h3>
          <p className="session-id">ID: {user?.session}</p>
        </div>

        <RollingHistory />
      </div>
    </div>
  );
};
