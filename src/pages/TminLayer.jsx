import { useEffect, useRef } from "react";
import proj4 from "proj4";
import { useLeafletContext } from "@react-leaflet/core";
import { LayerGroup, useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import chroma from "chroma-js";

window.proj4 = proj4;

const TminLayer = ({ url }) => {
    const geoTiffLayerRef = useRef();
    const context = useLeafletContext();
    const map = useMap();

    useEffect(() => {
    const container = context.layerContainer || context.map;
    fetch(url, {
    mode: "no-cors"
    })
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
        parseGeoraster(arrayBuffer).then((georaster) => {
            const min = georaster.mins[0];
            const range = georaster.ranges[0];
            const scale = chroma.scale('Spectral').domain([1, 0]);
            const options = {
            pixelValuesToColorFn: function (pixelValues) {
            var pixelValue = pixelValues[0]; 
            if (pixelValue === 0) return null;
            const scaledPixelValue = (pixelValue - min) / range;
            const color = scale(scaledPixelValue).hex();
            return color;
                },
                resolution: 256,
                opacity: 0.7
            }
            
            options.georaster = georaster;
            // console.log("georaster:", georaster)

            geoTiffLayerRef.current = new GeoRasterLayer(options);
            container.addLayer(geoTiffLayerRef.current);
            // map.fitBounds(geoTiffLayerRef.current.getBounds());
            })
        })
        return () => {
            // container.removeLayer(geoTiffLayerRef.current);
        };
    }, [context, url, map]);

    return null;
};

export default TminLayer;




