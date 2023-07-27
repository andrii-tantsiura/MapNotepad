import { FC, memo, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Typography } from "../../../../../components/common";
import {
  DISPLAYED_PINS_SEARCH_RESULTS_MAX_COUNT,
  textStyle_i13,
} from "../../../../../constants";
import { IPin, IPins } from "../../../../../types";
import { FoundPin } from "../FoundPin";
import styles from "./styles";

type PinSearchResultsProps = {
  pins: IPins;
  onPinPressed: (pin: IPin) => void;
};

export const FoundPinsList: FC<PinSearchResultsProps> = ({
  pins,
  onPinPressed,
}) => {
  const [pinHeight, setPinHeight] = useState<number>(0);

  const pinsListStyle = [
    {
      height:
        pins.length > DISPLAYED_PINS_SEARCH_RESULTS_MAX_COUNT
          ? pinHeight * DISPLAYED_PINS_SEARCH_RESULTS_MAX_COUNT
          : "auto",
    },
  ];

  return (
    <FlatList
      style={[styles.container, pinsListStyle]}
      data={pins}
      ListEmptyComponent={() => (
        <Typography style={[textStyle_i13, styles.nothingFoundText]}>
          Nothing found
        </Typography>
      )}
      keyExtractor={(pin) => pin.id}
      renderItem={({ item, index }) => (
        <FoundPin
          pin={item}
          isLastItem={index === pins.length - 1}
          onPinHeightChanged={setPinHeight}
          onPinPressed={onPinPressed}
        />
      )}
    />
  );
};
