import React, { Component } from 'react';
import './App.css';
import ReactMapGL, {NavigationControl} from 'react-map-gl';
import {
  Editor,
  EditingMode,
  DrawLineStringMode,
  DrawPolygonMode,
} from "react-map-gl-draw";

const MODES = [
  { id: "drawPolyline", text: "Draw Polyline", handler: DrawLineStringMode },
  { id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
  { id: "editing", text: "Edit Feature", handler: EditingMode },
];

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        //Reno Latitude and Longitude
        latitude: 39.52766,
        longitude: -119.81353,
        zoom: 10
      },
      modeId: null,
      modeHandler: null,
    };
  }

  _switchMode = (evt) => {
    const modeId =
      evt.target.value === this.state.modeId ? null : evt.target.value;
    const mode = MODES.find((m) => m.id === modeId);
    const modeHandler = mode ? new mode.handler() : null;
    this.setState({ modeId, modeHandler });
  };

  _renderToolbar = () => {
    return (
      <div
        style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}
      >
        <select onChange={this._switchMode}>
          <option value="">--Please choose a draw mode--</option>
          {MODES.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.text}
            </option>
          ))}
        </select>
      </div>
    );
  };


  render() {
    return(
      <ReactMapGL {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        //full list of styles here if you think one fits more
        //https://docs.mapbox.com/api/maps/#styles
        mapStyle="mapbox://styles/mapbox/streets-v11"
        //if you want to read up on what these ... do
        //https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do
        onViewportChange={(viewport) => this.setState({viewport})}>
        <div style={{position: 'absolute', left: '1%', top: '1%'}}>
          <NavigationControl />
        </div>
        <Editor
          // to make the lines/vertices easier to interact with
          clickRadius={12}
          mode={this.state.modeHandler}
          onSelect={(_) => {}}
        />
        {this._renderToolbar()}
      </ReactMapGL>
   );
  }
}

class App extends Component {

  /*
  constructor(){
    super();
  }*/
  
  render() {
    return (
      <div>
        <div class="Map"><Map /></div>
      </div>
    )
  }
}

export default App;
