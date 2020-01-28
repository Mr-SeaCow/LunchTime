import React, {Fragment} from 'react';
import logo from './logo.svg';
import { Container } from 'semantic-ui-react';
import './App.css';
import LoginForm from './components/loginform';
import HeaderExample from './components/header';
import NavBar from './components/navbar';
import './interfaces/sql';

const App = () => (
  <Fragment>
    <NavBar />
    <Container>
    <HeaderExample />
    </Container>
  </Fragment>

);


export default App;
