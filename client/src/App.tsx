import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Dashboard from './containers/Dashboard';
import FindGyms from './containers/FindGym';
import SavedGyms from './containers/SavedGyms';
import Schedule from './containers/Schedule';
import ManageMembership from './containers/ManageMembership';
import Profile from './containers/Profile';
import ViewProfile from './containers/ViewProfile';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Router>
            <Route path="/" exact component={SignIn} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/find-gym" exact component={FindGyms} />
            <Route path="/saved-gyms" exact component={SavedGyms} />
            <Route path="/my-schedule" exact component={Schedule} />
            <Route path="/my-activities" exact component={Dashboard} />
            <Route path="/manage-membership" exact component={ManageMembership} />
            <Route path="/view-profile" exact component={ViewProfile} />
            <Route path="/update-profile" exact component={Profile} />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
