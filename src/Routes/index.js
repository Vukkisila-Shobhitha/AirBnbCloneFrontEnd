import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import your components or pages here
import HomePage from './HomePage';
import PlacesPage from './PlacesPage';
import PlaceInfoPage from './PlaceInfoPage';
import UserProfilePage from './UserProfilePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

// Define your routes
function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/places" component={PlacesPage} />
        <Route exact path="/place/:id" component={PlaceInfoPage} />
        <Route exact path="/userprofile/:subpage?" component={UserProfilePage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route component={NotFoundPage} /> {/* Handle 404 Not Found */}
      </Switch>
    </Router>
  );
}

export default Routes;