import React, { Component } from 'react';
import './Map.css';
import ReactMapGL, {NavigationControl, FlyToInterpolator} from 'react-map-gl';
import {
  Editor,
  EditingMode,
  DrawLineStringMode,
  DrawPolygonMode,
} from "react-map-gl-draw";

import {Button, ButtonGroup } from '@material-ui/core';

import {FaRoute, FaDrawPolygon, FaEdit} from "react-icons/fa";


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
      modeHandler: null,
    };
  }

  _switchMode = (evt) => {
    switch(evt) {
      case 'Polyline':
        var modeHandler = new DrawLineStringMode();
        this.setState({modeHandler});
        break;
      case 'Polygon':
        var modeHandler = new DrawPolygonMode();
        this.setState({modeHandler});
        break;
      case 'Editing':
        var modeHandler = new EditingMode();
        this.setState({modeHandler});
        break;
      default:
        var modeHandler = null;
        this.setState({modeHandler});
        break;
    }
  };

  _renderToolbar = () => {
    return (
      <div>
      <ButtonGroup
        style={{
          backgroundColor: "black"}}
        orientation='vertical'
      >
        <Button 
        style = {{
          color: "white"
        }}
          onClick={() => {this._switchMode('Polyline');}}
        ><FaRoute />
        </Button>

        <Button 
        style = {{
          color: "white"
        }} onClick={() => {this._switchMode('Polygon');}}
        ><FaDrawPolygon />
        </Button>

        <Button 
        style = {{
          color: "white"
        }} onClick={() => {this._switchMode('Editing');}}
        ><FaEdit /></Button>

      </ButtonGroup>
      </div>
    );
  };


  render() {
    return(
        <div class="Map">
        <ReactMapGL {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          //full list of styles here if you think one fits more
          //https://docs.mapbox.com/api/maps/#styles
          mapStyle="mapbox://styles/mapbox/dark-v10"
          onViewportChange={(viewport) => this.setState({viewport})}
          transitionDuration={100} 
          transitionInterpolator={new FlyToInterpolator()}>
          <div style={{position: 'absolute', left: '1%', top: '1%'}}>
            <NavigationControl 
              style={{
                color: "black"}}
              captureDoubleClick="false"
            />
          </div>
          <div style={{position: 'absolute', left: '1%', top: '15%'}}>
            {this._renderToolbar()}
          </div>
          <Editor
            // to make the lines/vertices easier to interact with
            clickRadius={12}
            mode={this.state.modeHandler}
            onSelect={(_) => {}}
          />
        </ReactMapGL>
        </div>
   );
  }
}

export default Map;
