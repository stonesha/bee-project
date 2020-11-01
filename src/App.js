import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import logo from './logo.svg';
import './App.css';


mapboxgl.accessToken = "pk.eyJ1Ijoic3RvbmVzaGEiLCJhIjoiY2tnYnlpNGtuMDE3ODJ1bnlnZWZkYmlycyJ9.l1HxrvvA6pOOflL5igumHw";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
    }
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
  }

  render() {
    return (
      <div>
        <div ref = {el => this.mapContainer = el} />
      </div>
    )
  }
}

export default App;
