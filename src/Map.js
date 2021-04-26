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

// const geojsontest = [{
//   type: "FeatureCollection",
//   features: [
//     {type: 'Feature', geometry: 'LineString', coordinates: '[[39, 119], [41, 121]]'}
//   ]
// }];

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
      userLocation: {},
      modeHandler: null,
      features: [{
      }],
      isModalOpen: false,
      togglePopup: false,
      isSelect: null,
      safe: 0,
      newLat: 0,
      newLong: 0,
      data : [
        {sourcePosition: [39.52766, -119.81353], targetPosition: [40.52766, -120.81353]}
      ],
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
        onClick={() => {this.setState({isModalOpen: !this.state.isModalOpen});}}>
          <div>
            <FaArrowCircleRight/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Get Safe Count" placement = "right">
        <Button 
        style = {buttonStyle}
        onClick={() => {this._getSafeCount(this.state.safe)}}>
          <div>
            <FaUserFriends/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Get Acknowledged Count" placement = "right">
        <Button 
        style = {buttonStyle}
        onClick={() => {this._getAckCount(this.state.safe)}}>
          <div>
            <FaThumbsUp/>
          </div>
        </Button>
      </Tooltip>

      <Tooltip title = "Get Location" placement = "right">
        <Button 
        style = {buttonStyle}
        onClick={() => {this._getLocation(this.state.location)}}>
          <div>
            <FaCompressArrowsAlt/>
          </div>
        </Button>
      </Tooltip>

      </ButtonGroup>
      </div>
    );
  };

  

  _sendRecentFeature = async (feature) => {
    console.log(feature);

    try {
      const response = await API.post('/Input_Location', feature);
      console.log("Response from server: " , response);
    } catch (e) {
      console.log("Something went wrong, error : ", e);
    }

  };

  _getSafeCount = async (count) => {
    try {
      const response = await API.get('/Return_Safe_Count', count);
      console.log("Response from server: " , response);
      var object = JSON.stringify(response.data);
      alert(object);
      console.log(response);
      return response;
    } catch (e) {
      console.log("Something went wrong, error : ", e);
    }
  }

  _getAckCount = async (acknowledge) => {
    try {
      const response = await API.get('/Return_Acknowledge_Count', acknowledge);
      console.log("Response from server: " , response);
      var object = JSON.stringify(response.data);
      alert(object);
      console.log(response);
      return response;
    } catch (e) {
      console.log("Something went wrong, error : ", e);
    }
  }

  _getLocation = async (location) => {
    try {
      const response = await API.get('/Get_User_Locations', location);
      console.log("Response from server: " , response);
      var object = JSON.stringify(response.data);
      var split = object.split('|');
      // for(var i = 1; i < split.length - 1; i++)
      // {
      //  console.log(split[i]);
       
      //   // if(split[i].includes('n'))
      //   //   var test = split[i].split('l');
      //   //   console.log("hello "+ split[i]);
      // }
      //  var test = split[19].split(' ');
      //  console.log(test[0]);
      //  console.log(test[1]);
      console.log(object);
      alert(object);
      
      // this.state.newLat = test[0];
      // this.state.newLong = test[1];

      // console.log(this.state.newLat);

    } catch (e) {
      console.log("Something went wrong, error : ", e);
    }
  }

  // _setUserLocation = () => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //      let setUserLocation = {
  //          lat: position.coords.latitude,
  //          long: position.coords.longitude
  //       };
  //      let newViewport = {
  //         height: "100vh",
  //         width: "100vw",
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         zoom: 10
  //       };
  //       this.setState({
  //         viewport: newViewport,
  //         userLocation: setUserLocation
  //      });
  //   });
  // };


  _sendPopup = () => {
      Prompt.Popup.plugins().prompt('', 'Type your name', function (value) {
      Prompt.Popup.alert('You typed: ' + value);
  });
  }


  render() {
    const {route} = this.props;
    const layers = [
      new LineLayer ({id: 'line-layer', data})
    ]
    return(
        <div>
        {/* <DeckGL layers={[layers]} initialViewState={{ ...this.state.viewport}} controller={true}></DeckGL> */}
        
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

          <div>
            <Modal isOpen={this.state.isModalOpen} onClose={() => this.setState({isModalOpen: !this.state.isModalOpen})}>
              <SurveyComponent />
            </Modal>
          </div>
          <div>

            
          <Marker 
          latitude={39.52766}
          longitude={-119.81353}
          offsetLeft={-20}
          offsetTop={-10}>
            
          {/* <Markers
            lat={39.52766}
            lng={-119.81353}
            name="My Marker"
            color="blue"
          /> */}
          <img class = "img" src = 'location.png' />
          </Marker> 
          </div>

          <Editor
            // to make the lines/vertices easier to interact with
            clickRadius={12}
            mode={this.state.modeHandler}
            onSelect={(featureStyle) => {
            }}

            onUpdate={(data) => {
              this.setState({features: data});
              if(data.editType === "addFeature") {//only send data upon finishing a feature
                this._sendRecentFeature(data.data[data.data.length - 1].geometry);//get most recent feature
                //this.setState({isModalOpen: !this.state.isModalOpen});
                this._switchMode('Editing');
              }
            }}
            
          />
        {/* <Source id='polylineLayer' type='geojson' data={layerRoute}>
        <Layer
          id='lineLayer'
          type='line'
          source='layerRoute'
          layout={{
           'line-join': 'round',
           'line-cap': 'round',
          }}
          paint={{
           'line-color': 'rgba(3, 170, 238, 0.5)',
            'line-width': 5,
          }}
        />
      </Source> */}

        </ReactMapGL>
        

        </div>
   );
  }
}

export default Map;
