// @flow
import React, { Component } from 'react';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import type { HOC } from 'recompose';
import { Card, CardHeader, CardActions, CardContent, TextField, Button } from 'material-ui';

import type { HOCBase } from 'types';

type ExportedProps = {
  onLogin: ({
    username: string,
    password: string
  }) => void
};

const enhance: HOC<*, ExportedProps> = compose(
  withStateHandlers(
    { username: '', password: '' },
    {
      updateUsername: () => (username: string) => ({ username }),
      updatePassword: () => (password: string) => ({ password })
    }
  ),
  withHandlers({
    onUsernameChange: ({ updateUsername }) => (event: Object) => {
      updateUsername(event.target.value);
    },
    onPasswordChange: ({ updatePassword }) => (event: Object) => {
      updatePassword(event.target.value);
    },
    onLoginButtonClick: props => () => {
      const { onLogin, username, password } = props;
      onLogin({ username, password });
    }
  })
);

type Props = HOCBase<typeof enhance>;

class LoginForm extends Component<Props> {
  render() {
    const { onLoginButtonClick, onUsernameChange, onPasswordChange } = this.props;

    return (
      <Card style={styles.card}>
        <CardHeader title="Login to Notebook" />
        <CardContent>
          <TextField
            placeholder="Username"
            label="Username"
            fullWidth
            onChange={onUsernameChange}
          />
          <TextField
            placeholder="Password"
            type="password"
            label="Password"
            fullWidth
            style={styles.text}
            onChange={onPasswordChange}
          />
        </CardContent>
        <CardActions style={styles.actions}>
          <Button color="default">Clear</Button>
          <Button color="primary" onClick={onLoginButtonClick}>
            Login
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default enhance(LoginForm);

const styles = {
  card: {
    width: 640,
    margin: '0 auto'
  },
  text: {
    marginTop: 20
  },
  actions: {
    justifyContent: 'flex-end'
  }
};
