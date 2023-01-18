/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState } from "react";
import "./style.scss";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Input from "../Input";
import { getAdresse } from "../../services/services";

const Maps = () => {
  const [lng, setLng] = useState(3.800461);
  const [lat, setLat] = useState(47.815083);
  const [zoom, setZoom] = useState(8);

  const handleSubmit = (event) => {
    event.preventDefault();
    getAdresse(event.target[0].value).then((data) => {
      setLng(data.features[0].geometry.coordinates[0]);
      setLat(data.features[0].geometry.coordinates[1]);
      setZoom(12);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input />
      </form>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | zoom: {zoom}
      </div>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{
          height: "100vh",
          width: "100vw",
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
        }}
      >
        <Marker
          longitude={lng}
          latitude={lat}
          pitchAlignment="viewport"
          zoom={zoom}
        />
        <NavigationControl />
        <GeolocateControl />
      </Map>
    </div>
  );
};

export default Maps;
