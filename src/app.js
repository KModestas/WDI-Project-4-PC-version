import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Axios from 'axios';

import GigsIndex from './components/gigs/GigsIndex';
import GigsShow from './components/gigs/GigsShow';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/utility/Navbar';
import Profile from './components/user/Profile';
import HomePage from './components/other/HomePage';



import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <main>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/gigs/:id" component={GigsShow} />
              <Route path="/gigs" component={GigsIndex} />
              <Route path="/profile" component={Profile} />

            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

// switch only activates the first route it matches with


// attaches your app to the root div in index.html
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
