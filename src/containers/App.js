import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import { device, NAVBAR_MOBILE, NAVBAR_WIDTH, THEME_COLOR_1 } from '../config';
import Dashboard from './pages/Dashboard';
import Pledge from './pages/Pledge';
import Products from './pages/Products';
import Runner from './pages/Runner';

const Content = styled.div`
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

function App() {
  return (
    <Router>
      <NavBar />
      <Content>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/pledge">
            <Pledge />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/runner">
            <Runner />
          </Route>
          <Redirect to="/dashboard" />
        </Switch>
      </Content>
    </Router>
  );
}

export default App;
