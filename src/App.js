import React, { Component } from 'react';
import './App.css';
import ReactMapGL from 'react-map-gl';

class Map extends Component {

  constructor() {
    super();
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        //Reno Latitude and Longitude
        latitude: 39.52766,
        longitude: -119.81353,
        zoom: 10
      }
    };
  }

  render() {
    return(
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        //full list of styles here if you think one fits more
        //https://docs.mapbox.com/api/maps/#styles
        mapStyle="mapbox://styles/mapbox/streets-v11"
        //if you want to read up on what these ... do
        //https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
   );
  }
}

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      //for setting the div element to fullscreen
      full: {
        height: '100%',
        width: '100%'
      }
    }
  }
  
  render() {
    return (
      <div>
        <div style={this.state.full}><Map /></div>
      </div>
    )
  }
}

export default App;
