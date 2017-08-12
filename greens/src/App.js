import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import carrot from './cyberscooty-carrot-300px.png'
import Widget from './Widget'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "", 
      randomNumber: ""
    };
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
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>San Francisco, Welcome to React. {this.state.body}</h2>
          </div>
          <ul className="App-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <p><button onClick={(e) => this.fetchHello()}>fetch data from python</button></p>

          <Widget {...this.state} fetchRandomNumber={this.fetchRandomNumber.bind(this)} />


          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" render={() => <Widget {...this.state} fetchRandomNumber={this.fetchRandomNumber.bind(this)} />} />
          <Route path="/topics" component={Topics}/>
        </div>
      </Router>
    );
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
    <img src={carrot} alt="carrot" />
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul className="App-nav">
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default App;

