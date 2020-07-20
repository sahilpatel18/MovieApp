import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./Movies";
import Customers from "./Customers";
import Rentals from "./Rentals";
import NotFound from "./notFound";
import NavBar from "./Navbar";
import LoginForm from "./LoginForm";
import MovieForm from "./MovieForm";
import RegisterForm from "./RegisterForm";
import auth from "../services/authService";
import Logout from "./Logout";
import ProtectedRoute from "./common/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className='container'>
          <Switch>
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <ProtectedRoute path='/movies/:id' component={MovieForm} />
            <Route
              path='/movies'
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
