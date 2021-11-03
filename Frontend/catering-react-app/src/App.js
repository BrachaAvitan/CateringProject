import './App.css';
import NavHeader from './components/NavHeader';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SiginIn from './components/SiginIn';
import SiginUp from './components/SiginUp';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
             <Route path="/SiginIn" exact component={SiginIn}></Route>
             <Route path="/SiginUp" exact component={SiginUp}></Route>
             <Route path="/" component={NavHeader}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
