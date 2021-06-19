import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Workspaces from './Workspaces';
import Workspace from './Workspace'


const App = () => (
  <Router>
    <Switch>
      <Route path='/workspaces/:workspaceId' component={Workspace} />
      <Route path='/' component={Workspaces} />
      <Route path='/workspaces' component={Workspaces} />
    </Switch>
  </Router>
)

export default App;
