import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePageComponent from './components/HomePageComponent'
import Header from './components/Header'
import UserPage from './components/UserPage'
import AdminArea from './components/AdminArea'
import SupportPage from './components/SupportPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePageComponent} />
          <Route exact path="/user/:id" component={UserPage} />
          <Route exact path="/admin/:id" component={AdminArea} />
          <Route exact path="/support/:id" component={SupportPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
