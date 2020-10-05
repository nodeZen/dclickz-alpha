import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer';

axios.defaults.baseURL = "http://localhost:3001/";

axios.defaults.headers['content-type'] = 'application/json';
const store  = createStore(reducer);

ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'));

serviceWorker.unregister();

