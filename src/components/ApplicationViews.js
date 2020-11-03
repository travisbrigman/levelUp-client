import React from "react";
import { Route } from "react-router-dom";
import { GameProvider } from "./game/GameProvider";
import { GameList } from "./game/GameList";
import { EventProvider } from "./game/EventProvider";
import { EventList } from "./game/EventList";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          backgroundColor: "lightgoldenrodyellow",
        }}
      >
        <GameProvider>
          <Route exact path="/">
            <GameList />
          </Route>
        </GameProvider>

        <EventProvider>
          <Route exact path="/events">
            <EventList />
          </Route>
        </EventProvider>
      </main>
    </>
  );
};
