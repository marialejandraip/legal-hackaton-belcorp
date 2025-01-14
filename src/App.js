/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import Login from './views/login';
import Dashboard from './views/dashboard';
import { auth } from './firebaseInit';

function LoggedInRoute({ children, isUserLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (isUserLoggedIn) {
          return <Dashboard>{children}</Dashboard>;
        }
        return <Redirect to="/" />;
      }}
    />
  );
}

function NonLoggedInRoute({ children, isUserLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (!isUserLoggedIn) {
          return <>{children}</>;
        }
        return <Redirect to="/dashboard" />;
      }}
    />
  );
}

function App() {
  // valor inicial de isUserLoggedIn es false
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('newUser', JSON.stringify(user));
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false); // cambiar a false
        console.log('no está logueado');
      }
      setLoading(false);
      return console.log('CLEAN UP Funtion');
    });
  }, []);

  if (loading) return <span>Loading</span>;
  return (
    <Router>
      <Switch>
        <NonLoggedInRoute isUserLoggedIn={isUserLoggedIn} exact path="/">
          <Login />
        </NonLoggedInRoute>
        <LoggedInRoute isUserLoggedIn={isUserLoggedIn} exact path="/dashboard">
          <Dashboard />
        </LoggedInRoute>
        <LoggedInRoute isUserLoggedIn={isUserLoggedIn} exact path="/Agregar">
          <Dashboard />
        </LoggedInRoute>
        <LoggedInRoute isUserLoggedIn={isUserLoggedIn} exact path="/Perfil">
          <Dashboard />
        </LoggedInRoute>
        <LoggedInRoute isUserLoggedIn={isUserLoggedIn} exact path="/dashboard/project:id">
          <Dashboard />
        </LoggedInRoute>
      </Switch>
    </Router>
  );
}

export default App;
