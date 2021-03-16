import React, { Component } from 'react';
import './Map.css';
import ReactMapGL, {NavigationControl, FlyToInterpolator} from 'react-map-gl';
import {
  Editor,
  EditingMode,
  DrawLineStringMode,
  DrawPolygonMode,
  DrawPointMode,
} from "react-map-gl-draw";
import Modal from './Modal';

import {Button, ButtonGroup } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import {FaRoute, 
  FaDrawPolygon, 
  FaEdit, 
  FaMapMarkerAlt, 
  FaMousePointer,
  FaUserFriends,
  FaArrowCircleRight,
  FaSync
} from "react-icons/fa";

//import MapViewDirections from 'react-native-maps-directions';

import {BiSend} from "react-icons/bs"

import Marker from './Marker';

import axios from 'axios';

var safe = [{}]
const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};

const buttonStyle = {
  backgroundColor: "white",
  maxWidth: '20px',
  maxHeight:'30px',
  minWidth: '20px',
  minHeight: '30px'  
}

const getData = () => {
  axios.get('https://hookb.in/dmZdBYxLmzU9RRzPgj8Y').then(Response)
  safe.push(Response)
  console.log(Response)
}

function sendData (data) {
  axios({
    method: 'post',
    url: 'https://hookb.in/VGY9yeb9OnTE22bwzor8',
    data: JSON.stringify({
      item1: data
    }),
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  })
  .then(function (response) {
    console.log(response);
  })
}

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
      }],
      uuid: null,
      isModalOpen: false,
    };
  }

  
  _switchMode = (evt) => {

    switch(evt) {
      case 'Polyline':
        this.setState({modeHandler: new DrawLineStringMode()});
        break;
      case 'Polygon':
        this.setState({modeHandler: new DrawPolygonMode()});
        break;
      case 'Editing':
        this.setState({modeHandler: new EditingMode()});
        break;
      case 'Marking':
        this.setState({modeHandler: new DrawPointMode()});
        break;
      default:
        this.setState({modeHandler: null});
        break;

    }
  };

//Toolbar for buttons 
  _renderToolbar = () => {
    return (
      <div>
      <ButtonGroup orientation='vertical'>
        
      <Tooltip title = "Default Cursor" placement = "right">
        <Button
          style = {buttonStyle}
          onClick={() => {this._switchMode(null);}}
          >
            <div>
              <FaMousePointer/> 
            </div> 
        </Button>
      </Tooltip>
      <Tooltip title = "Draw Line" placement = "right">
        <Button
          style = {buttonStyle}
          onClick={() => {this._switchMode('Polyline');}}
          >
            <div>
              <FaRoute/> 
            </div> 
        </Button>
      </Tooltip>

      <Tooltip title = "Draw Area" placement = "right">
        <Button 
          style = {buttonStyle} 
          onClick={() => {this._switchMode('Polygon');}}>
          <div>
            <FaDrawPolygon/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Edit" placement = "right">
        <Button 
        style = {buttonStyle}
 onClick={() => {this._switchMode('Editing');}}>
          <div>
            <FaEdit/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Mark Area" placement = "right">
        <Button 
        style = {buttonStyle}
        onClick={() => {this._switchMode('Marking');}}>
          <div>
            <FaMapMarkerAlt/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Database" placement = "right">
        <Button 
          style = {buttonStyle}
          onClick={() => {this.setState({isModalOpen: !this.state.isModalOpen});}}>
          <div>
            <FaUserFriends/>
          </div>
        </Button>
      </Tooltip>
      <Tooltip title = "Get/Refresh Data" placement = "right">
        <Button 
          style = {buttonStyle}
          onClick={() => {getData()}}>
          <div>
            <FaSync/>
          </div>
        </Button>
      </Tooltip>
      <Tooltip title = "Send Data" placement = "right">
        <Button 
          style = {buttonStyle}
          onClick={() => {sendData(this.state.features)}}>
          <div>
            <FaArrowCircleRight/>
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
          
     {/*     
        <MapViewDirections
          origin={origin}
          destination={destination}
       apikey={GOOGLE_MAPS_APIKEY}
      />
     */}
          {/*
         <div>
          <Marker
            lat={39.52766}
            lng={-119.81353}
            name="My Marker"
            color="blue"
          />
          </div>
          */}
          <div>
            <Modal isOpen={this.state.isModalOpen} onClose={() => this.setState({isModalOpen: !this.state.isModalOpen})}>
            <h1>Insert Database Here</h1>
            </Modal>
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
          <div style={{position: 'absolute', left: '.94%', top: '15%'}}>
            {this._renderToolbar()}
          </div>

        </ReactMapGL>
        </div>
   );
  }
}

export default Map;
