import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Movies from "./Movies";
import Customers from "./Customers";
import Rentals from "./Rentals";
import NotFound from "./notFound";
import NavBar from "./Navbar";
import LoginForm from "./LoginForm";
import MovieForm from './MovieForm'
import RegisterForm from "./RegisterForm";
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  render() {
    return (
      <>
      <ToastContainer />
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path='/register' component={RegisterForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/movies' component={Movies} />
          <Route path='/movies/new' component={MovieForm} />
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
