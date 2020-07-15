import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Movies from "./Movies";
import Customers from "./Customers";
import Rentals from "./Rentals";
import NotFound from "./notFound";
import NavBar from "./Navbar";
import MovieForm from './MovieForm'

class App extends Component {
  render() {
    return (
      <>
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path='/movies/:id' component={MovieForm} />
          <Route path='/movies' component={Movies} />
          <Route path='/customers' component={Customers} />
          <Route path='/rentals' component={Rentals} />
          <Route path='/not-found' component={NotFound} />
          <Redirect from='/' exact to='/movies' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
      </>
    )
  }
}

export default App;
