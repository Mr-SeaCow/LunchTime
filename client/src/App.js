import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import NavBar from './components/navbar';
import LunchTime from './views/lunchTime';
import Students from './views/students'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function App() {
  return (
    <Router>
    <Fragment>
      <NavBar />
      <Container className="Body">
        <Switch>
          <Route path="/students">
            <Students />
          </Route>
          <Route path="/">
            <LunchTime />
            {/* <Students /> */}
          </Route>
        </Switch>
      </Container>
    </Fragment>
    </Router>
  )
};
