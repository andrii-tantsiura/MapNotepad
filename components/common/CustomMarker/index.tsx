import React, { FC, useEffect, useRef } from "react";
import { MapMarker, MapMarkerProps } from "react-native-maps";

import { ICustomMarkerItemModel } from "../../../types/components";

interface CustomMarkerProps extends MapMarkerProps {
  model: ICustomMarkerItemModel;
}

export const CustomMarker: FC<CustomMarkerProps> = React.memo(
  ({ model, ...restProps }) => {
    const ref = useRef<MapMarker | null>(null);

    useEffect(() => {
      model.showCallout = () => {
        ref.current?.showCallout();
      };
    }, [model]);

    return (
      <MapMarker
        {...restProps}
        ref={ref}
        image={model.icon}
        title={model.label}
        description={model.description}
      />
    );
  }
);
