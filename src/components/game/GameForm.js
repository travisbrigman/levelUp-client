import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";

export const GameForm = (props) => {
  const { createGame, getGameTypes, gameTypes } = useContext(GameContext);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0,
  });
  /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
  useEffect(() => {
    getGameTypes();
  }, []);

  /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
  const handleControlledInputChange = (event) => {
    const newGameState = Object.assign({}, currentGame);
    newGameState[event.target.name] = event.target.value;
    setCurrentGame(newGameState);
  };

  let skillLevels = [1, 2, 3, 4, 5];

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="type">Game Type: </label>
          <select
            name="gameTypeId"
            className="form-control"
            onChange={handleControlledInputChange}
          >
            <option value="0">select a game type</option>
            {gameTypes.map((gtype) => {
              return (
                <option key={gtype.id} value={gtype.id}>
                  {gtype.label}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="skill">Skill Level </label>
          <select
            name="skillLevel"
            className="form-control"
            onChange={handleControlledInputChange}
          >
            <option value="0">select skill level</option>
            {skillLevels.map((level) => {
              return (
                <option key={level} value={level}>
                  Level {level}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input
            type="text"
            name="maker"
            required
            autoFocus
            className="form-control"
            value={currentGame.maker}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="player">Number Of Players: </label>
          <input
            type="text"
            name="numberOfPlayers"
            required
            autoFocus
            className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each game property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            skillLevel: parseInt(currentGame.skillLevel),
            gameTypeId: parseInt(currentGame.gameTypeId),
          };

          // Send POST request to your API
          createGame(game);
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
