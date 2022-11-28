import { useMapEvents } from "react-leaflet";

const PopupInfo = () => {
    const map = useMapEvents({
        click(e) {
            console.log(e.latlng);
        },
    });

    return null;
};

export default PopupInfo;