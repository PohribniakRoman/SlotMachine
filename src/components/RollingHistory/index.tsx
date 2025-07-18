import { iconMapping } from "@/constants/slot";
import UserStore from "@/modules/user-store";
import { useStore } from "zustand";

export const RollingHistory = () => {
  const { user } = useStore(UserStore);

  return (
    <div className="history-section">
      <h3>📊 Game History</h3>
      <div className="history-container">
        {user?.history && user.history.length > 0 ? (
          user.history
            .slice(-5)
            .reverse()
            .map((el, i) => (
              <div
                key={i}
                className={`history-item ${el.prize > 0 ? "win" : "loss"}`}
              >
                <div className="history-row">
                  <span className="roll-result">
                    {el.roll.map((el) => iconMapping[el]).join("\t/\t")}
                  </span>
                  <span
                    className={`prize ${
                      el.prize > 0 ? "win-amount" : "loss-amount"
                    }`}
                  >
                    {el.prize > 0 ? `+$${el.prize}` : `-$${el.prize * -1}`}
                  </span>
                </div>
                <div className="game-id">#{el.gameId.slice(0, 8)}</div>
              </div>
            ))
        ) : (
          <div className="no-history">No games played yet</div>
        )}
      </div>
    </div>
  );
};
