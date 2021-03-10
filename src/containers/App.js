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

import Confirm from './pages/Confirm';
import Dashboard from './pages/Dashboard';
import Donate from './pages/Donate';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Pledge from './pages/Pledge';
import Products from './pages/Products';
import Register from './pages/Register';

const CoreContent = styled.div`
  z-index: 0;
  background-color: ${THEME_COLOR_1};
  overflow-x: hidden;
  padding-bottom: ${NAVBAR_MOBILE};

  @media ${device.tablet} {
    padding: 0;
    margin-left: ${NAVBAR_WIDTH};
    min-height: 100vh;
    height: 100vh;
    overflow: auto;
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
  const CorePages = () => (
    <>
      <NavBar />
      <CoreContent>
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
          <Redirect to="/" />
        </Switch>
      </CoreContent>
    </>
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/confirm/:id">
          <Confirm />
        </Route>
        <Route path="/donate/:id">
          <Donate />
        </Route>
        <Route component={CorePages} />
      </Switch>
    </Router>
  );
}

export default App;
