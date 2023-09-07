import React, { FC, useEffect, useRef } from "react";
import { MapMarker, MapMarkerProps } from "react-native-maps";

import { ICustomMarkerModel } from "../../../types/components";

interface CustomMarkerProps extends Omit<MapMarkerProps, "onPress"> {
  marker: ICustomMarkerModel;
  onPress: (marker: ICustomMarkerModel) => void;
}

export const CustomMarker: FC<CustomMarkerProps> = React.memo(
  ({ marker, onPress, ...restProps }) => {
    const ref = useRef<MapMarker | null>(null);

    useEffect(() => {
      marker.showCallout = ref.current?.showCallout;
      marker.hideCallout = ref.current?.hideCallout;
    }, [marker]);

    return (
      <MapMarker
        {...restProps}
        ref={ref}
        image={marker.icon}
        title={marker.label}
        description={marker.description}
        onPress={() => onPress(marker)}
      />
    );
  }
);
