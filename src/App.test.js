import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import * as config from './Configuration'
import MockAdapter from 'axios-mock-adapter'

it('renders without crashing ', () => {
  var mock = new MockAdapter(axios);

  mock.onGet(/.*/).reply(200, {_embedded:[]});
  
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
