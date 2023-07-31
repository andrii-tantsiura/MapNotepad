import { FC, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

import { Typography } from "../../../../../components/common";
import {
  DISPLAYED_PINS_SEARCH_RESULTS_MAX_COUNT,
  textStyle_i13,
} from "../../../../../constants";
import { IPinItemModel } from "../../../../../types/components";
import { FoundPin } from "../FoundPin";
import styles from "./styles";

type FoundPinsListProps = {
  pins: Array<IPinItemModel>;
  onPinPressed: (pin: IPinItemModel) => void;
};

export const FoundPinsList: FC<FoundPinsListProps> = ({
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
      keyboardShouldPersistTaps="always"
      data={pins}
      ListEmptyComponent={() => (
        <Typography style={[textStyle_i13, styles.nothingFoundText]}>
          Nothing found
        </Typography>
      )}
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
