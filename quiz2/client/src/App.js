import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { BasicTextFields, HomeContainer }  from './container/home'

export default function App() {
  return (
    <Router>
      <div>
          <Route path="*">
            <HomeContainer />
          </Route>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
