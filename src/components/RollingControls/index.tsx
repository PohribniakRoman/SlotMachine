import UserStore from "@/modules/user-store";
import { CompleteRollResult } from "@/types/roll";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useStore } from "zustand";

interface RollingControlsProps {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<CompleteRollResult, Error>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
  isButtonDisabled: boolean;
}

export const RollingControls = ({
  refetch,
  setButtonDisabled,
  isButtonDisabled,
}: RollingControlsProps) => {
  const { user, setCurrentResult, cashOut, buyIn, restart } =
    useStore(UserStore);

  const userTotal = useMemo(
    () => Number(user?.balance) + Number(user?.bank),
    [user?.balance, user?.bank]
  );

  const handleClick = useCallback(() => {
    if (user && user.balance > 0) {
      refetch();
      setCurrentResult(null);
      setButtonDisabled(true);
    }
  }, [user?.balance]);

  return (
    <div className="button-container">
      <button
        className={`roll-button ${
          !user?.balance || isButtonDisabled ? "disabled" : "active"
        }`}
        disabled={!user?.balance || isButtonDisabled}
        onClick={handleClick}
      >
        {isButtonDisabled ? "SPINNING..." : "SPIN TO WIN!"}
      </button>
      {userTotal > 0 && Number(user?.balance) > 0 && (
        <button
          className={`cash-out-button ${
            isButtonDisabled ? "disabled" : "active"
          }`}
          disabled={isButtonDisabled}
          onClick={cashOut}
        >
          💰 CASH OUT
        </button>
      )}
      {userTotal > 0 && Number(user?.balance) === 0 && (
        <button className="cash-out-button" onClick={buyIn}>
          💰 BUY IN
        </button>
      )}
      {userTotal === 0 && Number(user?.balance) === 0 && (
        <button className="cash-out-button" onClick={restart}>
          Restart
        </button>
      )}
    </div>
  );
};
