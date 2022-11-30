import React from "react";
import {TileLayer, MapContainer, LayersControl, LayerGroup} from 'react-leaflet';
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import PopupInfo from "./PopupInfo";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import LeafletMyPosition from "./LeafletMyPosition";
import ResetViewControl from '@20tab/react-leaflet-resetview';

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
    <MapContainer 
    className="map" 
    center={center} 
    zoom={2} 
    scrollWheelZoom={false} 
    doubleClickZoom={true}>
     <PopupInfo/>
     <ResetViewControl 
     title="Reset View"
     icon="↺"
     />
         
{/* menu for selecting layers */}
      <LayersControl position="topright">  
      
      <LayersControl.BaseLayer checked name="Base Map">
        <TileLayer 
        className="tile"
        name="Base Layer"
        attribution='&amp;copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}/>
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name='Topo Map'>
        <TileLayer
        className="topo"
        attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
        maxZoom={17}
        noWrap={true}/>
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name='Satellite Map'>
        <TileLayer
        className="satellite"
        url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
        subdomains={['mt1','mt2','mt3']}
        noWrap={true}/>
      </LayersControl.BaseLayer>
        
      <LayersControl.Overlay name="T-Min">
      {/* <LayerGroup> */}
        <TminLayer className="min" url={tmin} />
      {/* </LayerGroup> */}
      </LayersControl.Overlay>
      

      <LayerGroup>
      <LayersControl.Overlay name="T-Max">
        <TmaxLayer name="TMAX" className="max" url={tmax}/>
      </LayersControl.Overlay>
      </LayerGroup>

      <LayerGroup>
      <LayersControl.Overlay name="T-Min Anom">
        <TminAnomLayer className="tminanom" url={tminanom}/>
      </LayersControl.Overlay>
      </LayerGroup>

      <LayerGroup>
      <LayersControl.Overlay name="T-Max Anom">
        <TmaxAnomLayer className="tmaxanom" url={tmaxanom}/>
      </LayersControl.Overlay>
      </LayerGroup>
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