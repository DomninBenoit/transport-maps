/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-webpack-loader-syntax */
import React from "react";
import "./style.scss";
import Map, { GeolocateControl, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Input from "../Input";
import { getAdresse } from "../../services/services";
import mapboxgl from "mapbox-gl";

const Maps = () => {
  //use ref
  const mapRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    getAdresse(event.target[0].value).then((data) => {
      if (mapRef.current) {
        const marker = new mapboxgl.Marker({ draggable: true });

        marker.setLngLat([
          data.features[0].geometry.coordinates[0],
          data.features[0].geometry.coordinates[1],
        ]);

        mapRef.current
          .flyTo({
            center: [
              data.features[0].geometry.coordinates[0],
              data.features[0].geometry.coordinates[1],
            ],
            zoom: 15,
          })
          .addTo(marker);
      }
    });
  };

  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  const onMapLoad = React.useCallback(() => {
    console.log("useCallback");
    mapRef.current.on("move", (event) => {});
  }, []);

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
        <NavigationControl />
        <GeolocateControl ref={geolocateControlRef} trackUserLocation="false" />
      </Map>
    );
  }, [geolocateControlRef, onMapLoad]);

  console.log("rerender");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input />
      </form>
      {renderMap}
    </div>
  );
};

export default Maps;
