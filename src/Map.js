import React, { Component } from 'react';
import './Map.css';
import ReactMapGL, {NavigationControl} from 'react-map-gl';
import {
  Editor,
  EditingMode,
  DrawLineStringMode,
  DrawPolygonMode,
} from "react-map-gl-draw";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';

const useStyles = withStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

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
      >
      <ButtonGroup
        orientation="vertical"
        color="default"
        variant="contained"
        aria-label="draw controls"
      >
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
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
          mapStyle="mapbox://styles/mapbox/streets-v11"
          //if you want to read up on what these ... do
          //https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do
          onViewportChange={(viewport) => this.setState({viewport})}>
          <div style={{position: 'absolute', left: '1%', top: '1%'}}>
            <NavigationControl />
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
