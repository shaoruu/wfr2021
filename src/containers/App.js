import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import { NAVBAR_WIDTH, THEME_COLOR_1 } from '../config';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Purchase from './pages/Purchase';
import Settings from './pages/Settings';

const Content = styled.div`
  margin-left: ${NAVBAR_WIDTH};
  min-height: 100vh;
  z-index: 0;
  background-color: ${THEME_COLOR_1};
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
          <Route path="/purchase">
            <Purchase />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Redirect to="/dashboard" />
        </Switch>
      </Content>
    </Router>
  );
}

export default App;
