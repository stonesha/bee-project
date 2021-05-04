import React, { Component } from 'react';
import './App.css';
import Map from './Map';

class App extends Component {
  state = {
    loading: true
  };
  componentDidMount () {
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }
  /*
  constructor(){
    super();
  }*/
  
  render() {
    const { loading } = this.state;
    if(loading) { //Loading State
      return null;
    }

    //renders loading state and Map from Map.js
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
