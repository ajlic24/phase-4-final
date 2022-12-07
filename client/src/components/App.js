import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import SongList from "../pages/SongList";
import NewSong from "../pages/NewSong";
import EditPage from "../pages/EditPage";
import NewArtist from "../pages/NewArtist";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/artists/add">
            <NewArtist />
          </Route>
          <Route path="/edit/:id">
            <EditPage />
          </Route>
          <Route path="/new">
            <NewSong user={user} />
          </Route>
          <Route path="/">
            <SongList />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
