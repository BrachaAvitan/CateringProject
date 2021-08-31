import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SiginIn from './SiginIn';
import SiginUp from './SiginUp';

function Nav(){
    return(
        <Router>
      <div>
        <nav>
          <ul>
           <li>
              <Link to="/">דף הבית</Link>
            </li>
            <li>
              <Link to="/SiginIn">התחברות</Link>
            </li>
            <li>
              <Link to="/SiginUp">הרשמה</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/SiginIn">
            <SiginIn />
          </Route>
          <Route path="/SiginUp">
            <SiginUp />
          </Route>
          <Route path="/">
            <span>שלום דף הבית</span>
          </Route>
        </Switch>
      </div>
    </Router>
    );
}

export default Nav;