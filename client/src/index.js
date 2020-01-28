import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';

console.log(process.env.REACT_APP_DATABASE_SERVER)


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

