import './App.css';

// importado por mi:
import Home from './views/home/home';
import Form from './views/form/form';
import Detail from './views/detail/detail';
import Landing from './views/landing/landing';
import {Route , Switch} from "react-router-dom"


function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path = "/home" component = {Home} />
          <Route path = "/newreciepe" component = {Form} />
          <Route path = "/detail/:id" component = {Detail} />
        </Switch>
    </div>
  );
}

export default App;
