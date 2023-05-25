import React from "react";

const PlayersForm = ({ getPlayerNames }) => {
  const handleData = (e) => {
    e.preventDefault();
    const player1 = e.target.player1.value;
    const player2 = e.target.player2.value;
    getPlayerNames([
      { player_1: { name: player1, score: 0 } },
      { player_2: { name: player2, score: 0 } },
    ]);
  };

  return (
    <>
      <form className="player-form" onSubmit={(e) => handleData(e)}>
        <label>
          Player 1 name :
          <input name="player1" type="text" />
        </label>
        <label>
          Player 2 name :
          <input name="player2" type="text" />
        </label>
        <button type="submit">Let's play!</button>
      </form>
    </>
  );
};

export default PlayersForm;
