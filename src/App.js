import React, { Component } from 'react';
import './App.css';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DrawingManager
} from "@react-google-maps/api";
import {Button, ButtonGroup } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

//Variables for settings of Google Map
const libraries = ["places", "drawing"];

const mapContainerStyle = { //Style of Map container
  width: window.innerWidth,
  height: window.innerHeight,
};
const center = {
  lat: 39.52766,
  lng: -119.81353
};
const options = { //Seperate options, disabling defa
  disableDefaultUI: true,
  zoomControl: true,
};

///////////////////////////////////////


export default function App() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if(loadError) return "error loading maps";
  if(!isLoaded) return "loading";



  return  (
  <div>
    <GoogleMap 
    mapContainerStyle = {mapContainerStyle}
    zoom = {10}
    center = {center}
    options = {options}>

    </GoogleMap>
  </div>
  )
}
