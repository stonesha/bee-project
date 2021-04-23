import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Map from './Map';

class App extends Component {
  state = {
    loading: true
  };
  componentDidMount () {
    demoAsyncCall().then(() => this.setState({ loading: false }));
    const script = document.createElement("Script");
    script.src = "https://unpkg.com/survey-react"
    script.async = true;
    document.body.appendChild(script)
  }
  /*
  constructor(){
    super();
  }*/
  
  render() {
    const { loading } = this.state;
    if(loading) {
      return null;
    }
    return (
      <div>
        <div id="app" class="loader"></div> 
        <Map />
      </div>
    )
  }
}

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 200));
}

export default App;
