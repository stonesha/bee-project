import React, { Component } from 'react';
import './Map.css';
import ReactMapGL, {NavigationControl, FlyToInterpolator, Popup} from 'react-map-gl';
import {
  Editor,
  EditingMode,
  DrawLineStringMode,
  DrawPolygonMode,
  DrawPointMode,
} from "react-map-gl-draw";

import {Button, ButtonGroup } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import {FaRoute, FaDrawPolygon, FaEdit, FaMapMarkerAlt, FaMousePointer} from "react-icons/fa";

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
      features: [{
      }]
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
      case 'Marking':
        var modeHandler = new DrawPointMode();
        this.setState({modeHandler});
        break;
      default:
        var modeHandler = null;
        this.setState({modeHandler});
        break;
    }
  };

//Toolbar for buttons 
  _renderToolbar = () => {
    return (
      <div>
      <ButtonGroup
        style={{
        }}
          orientation='vertical'
      >
      <Tooltip title = "Default Cursor" placement = "right">
        <Button
          style = {{
           backgroundColor: "white",
           maxWidth: '20px',
           maxHeight:'30px',
           minWidth: '20px',
           minHeight: '30px'
          }}
          onClick={() => {this._switchMode(null);}}
          >
            <div>
              <FaMousePointer/> 
            </div> 
        </Button>
      </Tooltip>
      <Tooltip title = "Draw Line" placement = "right">
        <Button
          style = {{
           backgroundColor: "white",
           maxWidth: '20px',
           maxHeight:'30px',
           minWidth: '20px',
           minHeight: '30px'
          }}
          onClick={() => {this._switchMode('Polyline');}}
          >
            <div>
              <FaRoute/> 
            </div> 
        </Button>
      </Tooltip>

      <Tooltip title = "Draw Area" placement = "right">
        <Button 
        style = {{
          backgroundColor: "white",
          maxWidth: '25px',
          maxHeight:'30px',
          minWidth: '25px',
          minHeight: '30px'
        }} onClick={() => {this._switchMode('Polygon');}}>
          <div>
            <FaDrawPolygon/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Select and Drag" placement = "right">
        <Button 
        style = {{
          backgroundColor: "white",
          maxWidth: '25px',
          maxHeight:'30px',
          minWidth: '25px',
          minHeight: '30px'
        }} onClick={() => {this._switchMode('Editing');}}>
          <div>
            <FaEdit/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Mark Area" placement = "right">
        <Button 
        style = {{
          backgroundColor: "white",
          maxWidth: '25px',
          maxHeight:'30px',
          minWidth: '25px',
          minHeight: '30px'
        }} onClick={() => {this._switchMode('Marking');}}>
          <div>
            <FaMapMarkerAlt/>
          </div>
        </Button>
      </Tooltip>
      </ButtonGroup>
      </div>
    );
  };


  render() {
    return(
        <div>
        <ReactMapGL {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          //full list of styles here if you think one fits more
          //https://docs.mapbox.com/api/maps/#styles
          mapStyle="mapbox://styles/mapbox/dark-v10"
          onViewportChange={(viewport) => this.setState({viewport})}
          transitionDuration={100} 
          transitionInterpolator={new FlyToInterpolator()}
          doubleClickZoom={false}>
          <div style={{position: 'absolute', left: '1%', top: '1%'}}>
            <NavigationControl 
              style={{
                color: "black"}}
              captureDoubleClick="false"
            />
          </div>
          <div style={{position: 'absolute', left: '.94%', top: '15%'}}>
            {this._renderToolbar()}
          </div>
          <Editor
            // to make the lines/vertices easier to interact with
            clickRadius={12}
            mode={this.state.modeHandler}
            onSelect={(_) => {}}
            onUpdate={(data) => {
              this.setState({features: data})
            }}
          />
        </ReactMapGL>
        </div>
   );
  }
}

export default Map;
