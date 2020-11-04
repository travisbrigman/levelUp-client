import React, { useContext, useState, useEffect } from "react";
import GameContext from "../game/GameProvider";

export const EventForm = (props) => {
  const { getGames, games } = useContext(GameContext);
  const [currentEvent, setEvent] = useState({
    gameId: 0,
    time: "",
    date: "",
    description: "",
  });

  const handleControlledInputChange = (event) => {
    const newEventState = Object.assign({}, currentEvent);
    newEventState[event.target.name] = event.target.value;
    setEvent(newEventState);
  };

  let date = new Date();

  useEffect(() => {
    // Get all existing games from API
    getGames();
  }, []);

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select
            name="gameId"
            className="form-control"
            value={currentEvent.gameId}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select a game...</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="Date">Select Date: </label>
          <input
            type="date"
            name="date"
            required
            autoFocus
            className="form-control"
            value={currentEvent.date}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      {/* Create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          // Create the event
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};
