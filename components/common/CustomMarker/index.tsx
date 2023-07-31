import React, { FC, useEffect, useRef } from "react";
import { MapMarker, MapMarkerProps } from "react-native-maps";

import { IMarkerItemViewModel } from "../../../types/viewModels";

interface CustomMarkerProps extends MapMarkerProps {
  viewModel: IMarkerItemViewModel;
}

export const CustomMarker: FC<CustomMarkerProps> = React.memo(
  ({ viewModel, ...restProps }) => {
    const ref = useRef<MapMarker | null>(null);

    useEffect(() => {
      viewModel.showCallout = () => {
        ref.current?.showCallout();
      };
    }, [viewModel]);

    return (
      <MapMarker
        {...restProps}
        ref={ref}
        image={viewModel.icon}
        title={viewModel.label}
        description={viewModel.description}
      />
    );
  }
);
