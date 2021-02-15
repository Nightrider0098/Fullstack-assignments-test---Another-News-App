import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import "../styles/App.css";
import Card from './Card'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CardDeck from "./CardDeck";
const App = () => {


  return <div id="main">
    <Link to="/hi" id='hi' >Hindi</Link>
    <Link to="/mr" id='mr' >Marathi</Link>
    <Link to="/" id='en' >English</Link>
    <Switch>
      <Route path="/hi">
        <CardDeck lan={'hi'}  />
      </Route>
      <Route path="/mr">
        <CardDeck lan={'mr'}  />
      </Route>
      <Route path="/">
        <CardDeck lan={'en'}  />

      </Route>
    </Switch>

  </div>;
};

export default App;
