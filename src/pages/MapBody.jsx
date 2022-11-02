// import styled from "styled-components";

// const MapBody = () => {
    
//     return (
//         <Wrapper>
//             <Container>
//                 <h1>Map Body</h1>
//             </Container>
            
//         </Wrapper>
//     )
// }
// export default MapBody;

// const Wrapper = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// `

// const Container = styled.div`
// height: 50vh;
// `



import React from "react";
import {
    TileLayer, 
    Marker, 
    Popup, 
    MapContainer, 
    LayersControl, 
    LayerGroup, 
    FeatureGroup, 
    Circle,
    } from 'react-leaflet';

import chroma from 'chroma-js';
import * as parseGeoraster from 'georaster-layer-for-leaflet';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import AddLocate from "../components/AddLocate";
import { Helmet } from 'react-helmet';
import L from "leaflet";
// import { useMap } from "react-leaflet"



const MapBody = () => {
    const center = [0.0, 0.0];

  //   const map = L.map('map', {
  //     center: [0, 0],
  //     zoom: 2,
  // });


    // const layerControl = L.control.layers().addTo(map);

    const url_to_geotiff_file_tmin = "../data/tmin.tiff";
    const url_to_geotiff_file_tmax = "../data/tmax.tiff";
    const url_to_geotiff_file_tminanom = "../data/tmin_anom.tiff";
    const url_to_geotiff_file_tmaxanom = "../data/tmax_anom.tiff";

   
   fetch(url_to_geotiff_file_tmin)
  .then(response => response.arrayBuffer() )
  .then(parseGeoraster)
  .then(georaster => {
    console.log("georaster:", georaster);

      // const min = georaster.mins[0];
      // const range = georaster.ranges[0];
      // const max = georaster.maxs[0];
       
    
    // available color scales can be found by running console.log(chroma.brewer);
    console.log("Chroma Color", chroma.brewer);
    const scale = chroma.scale('Spectral').domain([1, 0]);

    const tmin_layer = new GeoRasterLayer({
        georaster: georaster,
        opacity: 0.7,
        pixelValuesToColorFn: function (pixelValues) {
            const pixelValue = pixelValues[0]; 
            if (pixelValue === 0) return null;
            const scaledPixelValue = (pixelValue - min) / range;
            const color = scale(scaledPixelValue).hex();
            return color;
        },
        resolution: 256
    });
    console.log("Layer:", tmin_layer);

    // layerControl.addBaseLayer(tmin_layer, "Tmin");
    // map.fitBounds(tmin_layer.getBounds());

//     //rudimentary print out lat/long
    // map.on('click', function (e) {
    //     alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    // });
  });


    return (
      <>
      <Helmet>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </Helmet>
        <MapContainer
        className="map"
        center={center}
        zoom={2}
        scrollWheelZoom={false}
        doubleClickZoom={true}
        >
            <TileLayer
            attribution='&amp;copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
{/* layers attempt     */}
   <LayersControl position="topright">

{/* layer one */}
      <LayersControl.Overlay name="Temperature Max &nbsp &nbsp &nbsp">
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LayersControl.Overlay>

{/* layer two */}
      <LayersControl.Overlay name="Temp Max Anomolies">
      <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LayersControl.Overlay>

{/* layer three */}
      <LayersControl.Overlay checked name="Temperature Min &nbsp &nbsp &nbsp">
        <LayerGroup>
          <Circle
            center={center}
            pathOptions={{ fillColor: 'blue' }}
            radius={200}
          />
          <Circle
            center={center}
            pathOptions={{ fillColor: 'red' }}
            radius={100}
            stroke={false}
          />
          <LayerGroup>
            <Circle
              center={[51.51, -0.08]}
              pathOptions={{ color: 'green', fillColor: 'green' }}
              radius={100}
            />
          </LayerGroup>
        </LayerGroup>
      </LayersControl.Overlay>

{/* layer four */}
      <LayersControl.Overlay name="Temp Min Anomolies">
        <FeatureGroup pathOptions={{ color: 'purple' }}>
          <Popup>Popup in FeatureGroup</Popup>
          <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
      </LayersControl.Overlay>
    </LayersControl>
{/* ////////////////// */}

        <AddLocate/>
        </MapContainer>
        </>
    );
};
export default MapBody;

