import { ActionIcon } from "@mantine/core";
import React, { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { CurrentLocation } from "tabler-icons-react";
import LeafletControl from "./LeafletControl";

const LeafletMyPosition = ({ zoom = 17 }) => {
    const [loading, setLoading] = useState(false);
    
    const map = useMapEvents({
        locationfound(e) {
            map.flyTo(e.latlng, zoom);
            setLoading(false);
        },
    });

    return (
        <LeafletControl position={"bottomleft"}>
          <ActionIcon
            onClick={() => {
              setLoading(true);
              map.locate();
            }}
            loading={loading}
            variant={"filled"}
          >
            <CurrentLocation />
          </ActionIcon>
        </LeafletControl>
      );
    };

export default LeafletMyPosition;