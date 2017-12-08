import React, { Component } from 'react';

export default class App extends Component {
  state = {
    color: 'red'
  };

  handleColorChange = () => {
    this.setState({ color: 'blue' });
  };

  render() {
    const { color } = this.state;
    return (
      <div style={{ color }}>
        Hello World
        <button onClick={this.handleColorChange}>change color</button>
      </div>
    );
  }
}
