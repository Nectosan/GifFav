import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Favoris from './components/Favoris';
import Home from './components/Home';

function App() {


  return (

    <BrowserRouter>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/fav" component={Favoris} />

      </Switch>
    </BrowserRouter>

  );
}

export default App;
