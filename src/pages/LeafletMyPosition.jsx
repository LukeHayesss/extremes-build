import { ActionIcon } from "@mantine/core";
import React, { useState } from "react";
import { useMapEvents } from "react-leaflet";
import LeafletControl from "./LeafletControl";
import { FaLocationArrow } from "react-icons/fa";
import styled from "styled-components";

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
            variant={"light"}
          >
            <Icon>
              <FaLocationArrow size={17}/>
            </Icon>
          </ActionIcon>
        </LeafletControl>
      );
    };

export default LeafletMyPosition;

const Icon = styled.div`
  color: black; 
  padding-top: 3px;
`
