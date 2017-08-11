import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import carrot from './cyberscooty-carrot-300px.png'
import Widget from './Widget'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {body: "", randomNumber: ""};
  }
  fetchHello() {
    fetch('/u/')
    .then(function(response) {
      return response.text()
    }).then(function(body) {
      this.setState({...this.state, body})
    }.bind(this))
  }
  fetchRandomNumber() {
    fetch('/u/rn')
    .then(function(response) {
      return response.text()
    }).then((randomNumber) => {
      this.setState({...this.state, randomNumber})
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

        <Widget {...this.state} fetchRandomNumber={this.fetchRandomNumber.bind(this)} />
        
      </div>
    );
  }
}

export default App;
