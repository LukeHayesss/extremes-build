import { useState } from "react";
import { useMapEvents, Popup, Marker} from "react-leaflet";

const PopupInfo = () => {
    const [markers, setMarkers] = useState([]);

    const map = useMapEvents({
        click(e) {
            const newMarker = e.latlng
            setMarkers([...markers, newMarker]);
            // console.log(e.latlng)
        },
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
