// @flow
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import theme from 'style/theme';
import { SignupForm } from 'component/Form';
import api from 'lib/api';

type State = {
  color: string
};

export default class App extends Component<*, State> {
  state = {
    color: 'red'
  };

  handleColorChange = () => {
    this.setState({ color: 'blue' });
  };

  // eslint-disable-next-line
  handleLogin = (info: Object) => {
    api
      .post(
        '/user/signup',
        {
          email: info.username,
          password: info.password
        },
        {}
      )
      // eslint-disable-next-line
      .then(res => console.log(res));
  };

  render() {
    const { color } = this.state;
    return (
      <MuiThemeProvider {...{ theme }}>
        <div style={{ color }}>
          <SignupForm onSignUp={this.handleLogin} />
        </div>
      </MuiThemeProvider>
    );
  }
}
