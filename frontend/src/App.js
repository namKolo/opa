// @flow
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import theme from 'style/theme';
import { LoginForm } from 'component/Form';

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
  handleLogin = (info: Object) => console.log(info);

  render() {
    const { color } = this.state;
    return (
      <MuiThemeProvider {...{ theme }}>
        <div style={{ color }}>
          <LoginForm onLogin={this.handleLogin} />
        </div>
      </MuiThemeProvider>
    );
  }
}
