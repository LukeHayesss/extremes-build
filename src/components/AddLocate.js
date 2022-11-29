// import { useEffect } from "react"
// import { useMap } from "react-leaflet"
// import Locate from "leaflet.locatecontrol"
// import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"

// const AddLocate = () => {
//   // Access the map context with the useMap hook
//   const map = useMap();

//   // Add locate control once the map loads
//   useEffect(() => {
//     const locateOptions = {
//       position: "bottomleft",
//       flyTo: true,
//     }
//     const locateControl = new Locate(locateOptions)
//     locateControl.addTo(map);
    
//   }, [])

//   return null
// }

// export default AddLocate;