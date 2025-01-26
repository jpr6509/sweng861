import React, { Component } from 'react';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

class App extends Component {
  state = { message: ''};

  componentDidMount() {
    fetch('/')
      .then((res) => res.text())
      .then((message) => this.setState({ message }))
      .catch((err) => console.log(err));
  }

  handleLoginSuccess = (credentialResponse) => {
    const navigate = useNavigate();
    fetch('/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          navigate('/welcome'); // Navigate to /welcome
        }
      })
      .catch((err) => console.error('Login failed:', err));
  };


  // handleLoginSuccess = (credentialResponse) => {
  //   console.log('Google Login Successful:', credentialResponse);

  //   // Send the token to your backend
  //   fetch('/google-login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ token: credentialResponse.credential }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('Backend response:', data);
  //       if (data.user) {
  //         // Redirect to /welcome after login
  //         window.location.href = '/welcome'; // Simple redirect to /welcome
  //       }
  //       // this.setState({
  //       //   message: data.message || 'Login successful!',
  //       //   isLoggedIn: true,
  //       // });
  //     })
  //     .catch((err) => {
  //       console.error('Error communicating with backend:', err);
  //       this.setState({ message: 'Login failed. Please try again.' }); // Handle errors
  //     });
  // };

  handleLoginError = () => {
    console.error('Google Login Failed');
    this.setState({ message: 'Login failed. Please try again.' });
  };

  render() {
    const { message } = this.state;

    return (
      <Router>
        <Routes>
          {/* Main route with Google Login */}
          <Route
            path="/"
            element={
                <div className="App">
                  {console.log("RENDERED LOGIN PAGE")}
                  <header className="App-header">
                    <p>{message}</p>
                    {/* Keep this google login AND the HTML change */}
                    <GoogleLogin
                      onSuccess={this.handleLoginSuccess} // Handle login success
                      onError={this.handleLoginError} // Handle login failure
                    />
                  </header>
                </div>
            }
          />

          {/* Welcome Page */}
          <Route
            path="/welcome"
            element={
              <div className="App">
                {console.log("Rendering /welcome route")}
                <header className="App-header">
                  <h1>Welcome!</h1>
                  <p>You have successfully logged in.</p>
                </header>
              </div>
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
