import './App.css';

// importado por mi:
import Home from './views/home/home';
import Form from './views/form/form';
import Detail from './views/detail/detail';
import {Route , Switch} from "react-router-dom"


function App() {
  return (
    <div className="App">
      
      <h1>Henry Dogs</h1>

        <Switch>
          <Route path = "/home" component = {Home} />
          <Route path = "/newreciepe" component = {Form} />
          <Route path = "/detail/:id" component = {Detail} />
        </Switch>

    </div>
  );
}

export default App;
