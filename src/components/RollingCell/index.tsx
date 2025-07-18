import { iconMapping } from "@/constants/slot";
import { PrizeList } from "@/types/roll";
import UserStore from "@modules/user-store";
import { memo, useEffect, useState } from "react";
import { useStore } from "zustand";

interface RollingCellParams {
  index: number;
}

export const RollingCell = memo(({ index }: RollingCellParams) => {
  const timeout = (index + 1) * 1000;
  const [isVisible, setVisible] = useState(false);
  const { currentResult } = useStore(UserStore);

  useEffect(() => {
    if (currentResult === null) {
      setVisible(false);
    }
    let timeoutFunction: NodeJS.Timeout;

    if (currentResult) {
      timeoutFunction = setTimeout(() => {
        setVisible(true);
      }, timeout);
    }

    return () => timeoutFunction && clearTimeout(timeoutFunction);
  }, [currentResult]);

  if (!currentResult && currentResult !== null) {
    return (
      <div className="rolling-cell">
        <div className="symbol default">$</div>
      </div>
    );
  }

  return (
    <div className="rolling-cell">
      {isVisible ? (
        <div className="symbol revealed">
          {iconMapping[currentResult?.roll[index] as PrizeList]}
        </div>
      ) : (
        <div className="symbol spinning">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
});

RollingCell.displayName = "RollingCell";
