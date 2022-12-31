import { useState } from "react";
import { useMapEvents, Popup, Marker} from "react-leaflet";

const PopupInfo = () => {
    const [markers, setMarkers] = useState([]);

    const map = useMapEvents({
        async click(e) {
            const newMarker = e.latlng
            setMarkers([...markers, newMarker])
            console.log(e.latlng, "info")
            //access coordinates to load the python script
            const response = await fetch(`/?sel_lat=${e.latlng.lat}&sel_lon=${e.latlng.lng}`,
                {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                }}); 
            console.log(response, 'TESTING PROMISE')  
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }         
            const result = response.json();         
            console.log('result is: ', JSON.stringify(result, null, 4));  
    }
})
    return (
        <>
        {markers.map((marker, index) => 
            <Marker position={marker} key={index}>
                <Popup>Latitude: ({marker.lat})<br></br>Longitude: ({marker.lng})</Popup>
            </Marker>)}
        </>
    );
};

export default PopupInfo;
