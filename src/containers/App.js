import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import NavBar from '../components/NavBar';
import { device, NAVBAR_MOBILE, NAVBAR_WIDTH, THEME_COLOR_1 } from '../config';
import { useAuth } from '../contexts/authContext';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Pledge from './pages/Pledge';
import Products from './pages/Products';
import Register from './pages/Register';
import Runner from './pages/Runner';

const AuthContent = styled.div`
  z-index: 0;
  background-color: ${THEME_COLOR_1};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const CoreContent = styled.div`
  z-index: 0;
  background-color: ${THEME_COLOR_1};
  overflow-x: hidden;
  padding-bottom: ${NAVBAR_MOBILE};

  @media ${device.tablet} {
    padding: 0;
    margin-left: ${NAVBAR_WIDTH};
    min-height: 100vh;
  }
`;

const PrivateRoute = ({ children, ...rest }) => {
  // const { data } = useAuth();
  const { data } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        data ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

function App() {
  const AuthPages = () => {
    return (
      <AuthContent>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </AuthContent>
    );
  };

  const CorePages = () => {
    return (
      <CoreContent>
        <NavBar />
        <Switch>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/pledge">
            <Pledge />
          </PrivateRoute>
          <PrivateRoute path="/products">
            <Products />
          </PrivateRoute>
          <PrivateRoute path="/runner">
            <Runner />
          </PrivateRoute>
          <Redirect to="/" />
        </Switch>
      </CoreContent>
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route component={AuthPages} />
        <Route component={CorePages} />
      </Switch>
    </Router>
  );
}

export default App;
