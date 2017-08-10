import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {body: ""};
  }
  fetchHello() {
    const me = this
    fetch('/u/')
    .then(function(response) {
      return response.text()
    }).then(function(body) {
      me.setState({...me.state, body})
    })
  }
  componentDidMount() {
    this.fetchHello();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React. {this.state.body}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p><button onClick={(e) => this.fetchHello()}>fetch data from python</button></p>
      </div>
    );
  }
}

export default App;
