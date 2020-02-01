import React, {Fragment} from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import NavBar from './components/navbar';
import LunchTime from './components/lunchTime';

const App = () => (
  <Fragment>
    <NavBar />
    <Container className="Body">
      <LunchTime />
    </Container>
  </Fragment>

);


export default App;
