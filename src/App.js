import React, { Component } from 'react';
import './App.css';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

//avoids too many rerenders
const libraries = ["places"];
const mapContainerStyle = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const center = {
  lat: 39.52766,
  lng: -119.81353
}

export default function App() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if(loadError) return "error loading maps";
  if(!isLoaded) return "loading";

  return <div>
    <GoogleMap 
    mapContainerStyle = {mapContainerStyle}
    zoom = {10}
    center = {center}>

    </GoogleMap>
  </div>
}
