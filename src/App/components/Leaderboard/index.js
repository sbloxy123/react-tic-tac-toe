import React from "react";

const Leaderboard = ({ players }) => {
  return (
    <div>
      <p>
        <strong>Leaderboard</strong>
      </p>

      <h4>
        {players[0].player_1.name} - wins: {players[0].player_1.score}{" "}
      </h4>
      <h4>
        {players[1].player_2.name} - wins: {players[1].player_2.score}{" "}
      </h4>
    </div>
  );
};

export default Leaderboard;
