import React, { Component } from 'react';
import './App.css';
import GamesList from './components/games-list.js'
import NavigationBar from './components/navigation-bar.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import appReducers from './reducers/index.js'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import reduxThunk from 'redux-thunk'
import Error from './error'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { dataTypes } from './actions';

var middleware = process.env.NODE_ENV === 'test' ?
  applyMiddleware(promiseMiddleware(), reduxThunk) :
  applyMiddleware(promiseMiddleware(), reduxThunk, logger);

const store = createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware);

class App extends Component<any,any> {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <NavigationBar/>
            <div className="container">
              <div className="row">
              </div>
              <div className="row justify-content-md-center">
                <div className="col-md-10">
                <Switch>
                  <Route path="/:dataType" component={GamesList} />
                  <Redirect exact from="/" to={`/${dataTypes.GAMES_PS4}`} />
                </Switch>                                
                </div>
                {/* <div className="col-md-2">
                <GroupsList />
              </div> */}
              </div>
            </div>
            <Error />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
