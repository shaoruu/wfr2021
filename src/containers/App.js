import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>dam</div>
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
