import React, { useState } from "react";
import {TileLayer, MapContainer, LayersControl} from 'react-leaflet';
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import PopupInfo from "./PopupInfo";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import LeafletMyPosition from "./LeafletMyPosition";

//data access
import tmin from '../data/tmin.tiff';
import tmax from '../data/tmax.tiff';
import tminanom from '../data/tmin_anom.tiff';
import tmaxanom from '../data/tmax_anom.tiff';

import TminLayer from './TminLayer';
import TmaxLayer from "./TmaxLayer";
import TminAnomLayer from "./TminAnomLayer";
import TmaxAnomLayer from "./TmaxAnomLayer";

//use the correct marker icons
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapBody = () => {
  const center = [0, 0];

  return (
    <>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </Helmet>
    <ParentCont>
    <MapContainer className="map" center={center} zoom={2} scrollWheelZoom={false} doubleClickZoom={true}>

<PopupInfo/>

{/* menu for selecting layers */}
      <LayersControl position="topright">  
      
      <LayersControl.BaseLayer checked name="Base Layer">
        <TileLayer 
        className="tile"
        name="Base Layer"
        attribution='&amp;copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}/>
      </LayersControl.BaseLayer>

      <LayersControl.Overlay name="TMIN">
        <TminLayer className="min" url={tmin}/>
      </LayersControl.Overlay>

      <LayersControl.Overlay name="TMAX">
        <TmaxLayer name="TMAX" className="max" url={tmax}/>
      </LayersControl.Overlay>

      <LayersControl.Overlay name="TMIN ANOM">
        <TminAnomLayer className="tminanom" url={tminanom}/>
      </LayersControl.Overlay>

      <LayersControl.Overlay name="TMAX ANOM">
        <TmaxAnomLayer className="tmaxanom" url={tmaxanom}/>
      </LayersControl.Overlay>

{/* cant use LayersControl.Overlay for the layers cause they don't work well with Layergroup */}
{/* cant do each layer as baselayer cause then doesnt have geographical data, 
so must use Overlay, but then each Overlay layer is duplicated in options menu... */}

      </LayersControl>
      <LeafletMyPosition/>
    </MapContainer>
    </ParentCont>
  </>
  )
} 
export default MapBody;

const ParentCont = styled.div`
  background-color: #aad3df;
`