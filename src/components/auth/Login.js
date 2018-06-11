import React from 'react';
import Axios from 'axios';

import LoginForm from './LoginForm';
import Auth from '../../lib/Auth';

class Login extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {
      message: ''
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });

    const errors = Object.assign({}, { message: '' });
    this.setState({ user, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/login', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/gigs');
      })
      .catch(err => this.setState({errors: { message: err.response.data.message }}));
  }

  render() {
    console.log(this.state.errors);
    return (
      <div>
        <div className="marginDiv"></div>
        <LoginForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>

    );
  }
}

// Loginform component is being imported, and passed in props which are the functions / logic defined of the current Login component

export default Login;

// handleChange targets the name and value properties of the loginForm inputs. It creates a new object, (the empty shell) then references the state with the email and password properties. The third argument finds the name property in the inputs of the LoginForm, if it is "email", it will set the value to be user.email, if password, it will set the value to be user.password

// the state is the updated to include these new user values whenever the the user inputs a value in the input field.

// After this, handleSubmit, makes the a post request to the backend login route, sending the data of the state (the users login info). In response, if the details are correct, it will generate a token and redirect user to homepage. If details are incorrect, it will console.log an error
