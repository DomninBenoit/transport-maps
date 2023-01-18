/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState } from "react";
import "./style.scss";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Input from "../Input";
import { getAdresse } from "../../services/services";

const Maps = () => {
  const [lng, setLng] = useState(2.347);
  const [lat, setLat] = useState(48.859);
  const [zoom, setZoom] = useState(8);

  const handleSubmit = (event) => {
    event.preventDefault();
    getAdresse(event.target[0].value).then((data) => {
      setLng(data.features[0].geometry.coordinates[0]);
      setLat(data.features[0].geometry.coordinates[1]);
      setZoom(12);
    });
  };

  //use ref
  const mapRef = React.useRef();

  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  const onMapLoad = React.useCallback(() => {
    console.log("useCallback");
    mapRef.current.on("move", (event) => {
      console.log(event);
      setLng(event.viewState.longitude);
      setLat(event.viewState.latitude);
    });
  }, []);

  const renderSidebar = React.useMemo(() => {
    console.log("renderSidebar");
    return (
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | zoom: {zoom}
      </div>
    );
  }, [lng, lat, zoom]);

  const renderMarker = React.useMemo(() => {
    console.log("renderMarker");
    <Marker longitude={lng} latitude={lat} anchor="center" />;
  }, [lng, lat]);

  const renderMap = React.useMemo(() => {
    console.log("renderMap");
    return (
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        {renderMarker}
        <NavigationControl />
        <GeolocateControl ref={geolocateControlRef} trackUserLocation="false" />
      </Map>
    );
  }, [renderMarker, geolocateControlRef, onMapLoad]);

  console.log("rerender");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input />
      </form>
      {renderSidebar}
      {renderMap}
    </div>
  );
};

export default Maps;
