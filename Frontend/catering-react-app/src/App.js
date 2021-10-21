import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import SiginUp from './components/SiginUp';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Nav/>
    </div>
    </Provider>
  );
}

export default App;
