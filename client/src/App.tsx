import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Home from './containers/Home';
import SignIn from './containers/SignIn';
import Dashboard from './containers/Dashboard';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Router>
      </Provider>
    )
  }
}

export default App;
