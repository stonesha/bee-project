import React, { Component } from 'react';
import DeckGL, { GeoJsonLayer , LineLayer} from "deck.gl";
import './Map.css';
import ReactMapGL, {NavigationControl, FlyToInterpolator, Popup, Marker} from 'react-map-gl';
import {
  Editor,
  EditingMode,
  DrawLineStringMode,
  DrawPolygonMode,
  DrawPointMode,
  Source,
  Layer,
} from "react-map-gl-draw";
import Modal from './Modal';
import SurveyComponent from './utils/utils.js';
import Prompt from './utils/utils.js';
//import * from './utils/routes.js'

import {Button, ButtonGroup } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import {FaRoute, 
  FaDrawPolygon, 
  FaEdit, 
  FaMapMarkerAlt, 
  FaMousePointer,
  FaUserFriends,
  FaArrowCircleRight,
  FaCompressArrowsAlt,
  FaThumbsUp
} from "react-icons/fa";

import {BiSend} from "react-icons/bs"

import Markers from './Marker';
import API from './utils/API';

var safe = [{}]

const buttonStyle = {
  backgroundColor: "white",
  maxWidth: '20px',
  maxHeight:'30px',
  minWidth: '20px',
  minHeight: '30px'  
}
const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
];

const PrettyPrintJson = ({data}) => (<div><pre>{ 
  JSON.stringify(data, null, 2) }</pre></div>);

const geojsontest = [{
  "type": "LineString",
  "coordinates": [[39, 119], [41, 121]]
}];

const layerRoute = new GeoJsonLayer({
  id: "geojson-layer",
  data,
  filled: true,
  stroked: false,
  extruded: true,
  pickable: true,
  lineJointRounded: true,
  getRadius: 50,
  getElevation: 30,
  lineWidthScale: 20,})

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
      isModalOpen: false,
      safe: 0,
      acknowledged: 0,
      userLocation: 0
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
// When a new tool is selected, switchMode is changed to the appropriate case corresponding
//to the draw tools
  _renderToolbar = () => {
    return (
      <div>
      <ButtonGroup orientation='vertical'>
        
      <Tooltip title = "Default Cursor" placement = "right">
        <Button
          style = {buttonStyle}
          onClick={() => {this._switchMode(null);}} //on click, call switchmode and change to null
          >
            
            <div>
              <FaMousePointer/> 
            </div> 
        </Button>
      </Tooltip>
      <Tooltip title = "Draw Line" placement = "right">
        <Button
          style = {buttonStyle}
          onClick={() => {this._switchMode('Polyline');}} //on click, call switchMode function and change to Polylin
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

      <Tooltip title = "Mark End Point" placement = "right">
        <Button 
        style = {buttonStyle}
        onClick={() => {this._switchMode('Marking');}}>
          <div>
            <FaMapMarkerAlt/>
          </div>
        </Button>
      </Tooltip>
      
      <Tooltip title = "Send Evacuation Instructions" placement = "right">
        <Button 
        style = {buttonStyle}
        //When Evacuation Instrcutions button is pressed, sets the modal state to true
        //When set to true, it will open the report functionality
        onClick={() => {this.setState({isModalOpen: !this.state.isModalOpen});}}> 
          <div>
            <FaArrowCircleRight/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Get Safe Count" placement = "right">
        <Button 
        style = {buttonStyle}
        //Runs getSafeCount with the state of safe
        onClick={() => {this._getSafeCount(this.state.safe)}}>
          <div>
            <FaUserFriends/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Get Acknowledged Count" placement = "right">
        <Button 
        style = {buttonStyle}
        //Runs getSafeCount with the state of acknowledged
        onClick={() => {this._getAckCount(this.state.acknowledged)}}>
          <div>
            <FaThumbsUp/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Get Location" placement = "right">
        <Button 
        style = {buttonStyle}
        //Runs getSafeCount with the state of userLocation
        onClick={() => {this._getLocation(this.state.userLocation)}}>
          <div>
            <FaCompressArrowsAlt/>
          </div>
        </Button>
      </Tooltip>

      </ButtonGroup>
      </div>
    );
  };

  

//When called, sends the completed drawing of the user to the database
//sends in JSON format
  _sendRecentFeature = async (feature) => {
    console.log(feature);

    try {
      const response = await API.post('/Input_Location', feature); //URL
      console.log("Response from server: " , response);
    } catch (e) {
      console.log("Something went wrong, error : ", e);
    }

  };

//Returns the safe count from the web server
  _getSafeCount = async (count) => {
    try {
      const response = await API.get('/Return_Safe_Count', count); //URL
      console.log("Response from server: " , response);
      var object = JSON.stringify(response.data); //stringify to use in alert
      alert(object);
      console.log(response);
      return response;
    } catch (e) {
      console.log("Something went wrong, error : ", e);
    }
  }

//Returns the users who have acknowledged the hazard
  _getAckCount = async (acknowledge) => {
    try {
      const response = await API.get('/Return_Acknowledge_Count', acknowledge); //URL
      console.log("Response from server: " , response);
      var object = JSON.stringify(response.data); //stringify to use in alert
      alert(object);
      console.log(response);
      return response;
    } catch (e) {
      console.log("Something went wrong, error : ", e);
    }
  }

  //Returns the coordinates of the mobile users location
  _getLocation = async (location) => {
    try {
      const response = await API.get('/Get_User_Locations', location);
      console.log("Response from server: " , response);
      var object = JSON.stringify(response.data);
      var split = object.split('|');
      console.log(object);
      alert(object);
    } catch (e) {
      console.log("Something went wrong, error : ", e);
    }
  }

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

          <div style={{position: 'absolute', left: '1%', top: '1%'}}
          //renders the zoom control
          >
            <NavigationControl
              style={{
                color: "black"}}
              captureDoubleClick="false"
            />
          </div>

              
          <div style={{position: 'absolute', left: '.94%', top: '15%'}}
          //Renders the toolbar 
          >
            {this._renderToolbar()}
          </div>

          <div
          //Whenever the report functionality is open, the modal window wil render the survey component
          >
            <Modal isOpen={this.state.isModalOpen} onClose={() => this.setState({isModalOpen: !this.state.isModalOpen})}>
              <SurveyComponent />
            </Modal>
          </div>

          <Editor
            // to make the lines/vertices easier to interact with
            clickRadius={12}
            mode={this.state.modeHandler} //modeHandler is changed depending on tool selected
            onSelect={(featureStyle) => {
            }}
            //OnUpdate is a state of the drawing tools whenever a feature is drawnm
            onUpdate={(data) => {
              this.setState({features: data}); //data drawn is written to the array features
              if(data.editType === "addFeature") {//only send data upon finishing a feature
                this._sendRecentFeature(data.data[data.data.length - 1].geometry);//get most recent feature
                this._switchMode('Editing');
              }
            }}
            
          />

        </ReactMapGL>
        </div>
   );
  }
}

export default Map;
