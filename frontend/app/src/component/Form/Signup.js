// @flow
import React, { Component } from 'react';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import type { HOC } from 'recompose';
import { Card, CardHeader, CardActions, CardContent, TextField, Button } from 'material-ui';

import type { HOCBase } from 'types';

type ExportedProps = {
  onSignUp: ({
    username: string,
    password: string
  }) => void
};

const enhance: HOC<*, ExportedProps> = compose(
  withStateHandlers(
    { username: '', password: '', retypedPassword: '' },
    {
      updateUsername: () => (username: string) => ({ username }),
      updatePassword: () => (password: string) => ({ password }),
      updateRetypedPassword: () => (retypedPassword: string) => ({ retypedPassword })
    }
  ),
  withHandlers({
    onUsernameChange: ({ updateUsername }) => (event: Object) => {
      updateUsername(event.target.value);
    },
    onPasswordChange: ({ updatePassword }) => (event: Object) => {
      updatePassword(event.target.value);
    },
    onRetypedPassword: ({ updateRetypedPassword }) => (event: Object) => {
      updateRetypedPassword(event.target.value);
    },
    onSignUpButtonClick: props => () => {
      const { onSignUp, username, password } = props;
      onSignUp({ username, password });
    }
  })
);

type Props = HOCBase<typeof enhance>;

class SignUpForm extends Component<Props> {
  render() {
    const {
      username,
      password,
      retypedPassword,

      onSignUpButtonClick,
      onUsernameChange,
      onPasswordChange,
      onRetypedPassword
    } = this.props;

    const canSignUp = username && password === retypedPassword;

    return (
      <Card style={styles.card}>
        <CardHeader title="Login to Notebook" />
        <CardContent>
          <TextField
            placeholder="Username"
            label="Username"
            fullWidth
            value={username}
            onChange={onUsernameChange}
          />
          <TextField
            placeholder="Password"
            type="password"
            label="Password"
            fullWidth
            value={password}
            style={styles.text}
            onChange={onPasswordChange}
          />
          <TextField
            placeholder="Confirm Password"
            type="password"
            label="Confirm Password"
            fullWidth
            value={retypedPassword}
            style={styles.text}
            onChange={onRetypedPassword}
            error={Boolean(retypedPassword !== password && retypedPassword)}
          />
        </CardContent>
        <CardActions style={styles.actions}>
          <Button color="primary" onClick={onSignUpButtonClick} disabled={!canSignUp}>
            Sign Up
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default enhance(SignUpForm);

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
