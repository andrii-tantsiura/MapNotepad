import { FC, useMemo, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

import { Typography } from "../../../../../components/common";
import {
  DISPLAYED_PINS_SEARCH_RESULTS_MAX_COUNT,
  textStyle_i13,
} from "../../../../../constants";
import { pinModelToPinItemModel } from "../../../../../converters";
import { IPinItemModel } from "../../../../../types/components";
import { IPinModelsArray } from "../../../../../types/models";
import { FoundPin } from "../FoundPin";
import styles from "./styles";

const emptyListView = () => (
  <Typography style={[textStyle_i13, styles.nothingFoundText]}>
    Nothing found
  </Typography>
);

type FoundPinsListProps = {
  pins: IPinModelsArray;
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

  const foundPins: IPinItemModel[] = useMemo(
    () => pins.map((x) => pinModelToPinItemModel(x)),
    [pins]
  );

  return (
    <FlatList
      style={[styles.container, pinsListStyle]}
      keyboardShouldPersistTaps="always"
      data={foundPins}
      ListEmptyComponent={emptyListView}
      renderItem={({ item, index }) => (
        <FoundPin
          pin={item}
          isLastItem={index === pins.length - 1}
          onHeightChange={setPinHeight}
          onPress={onPinPressed}
        />
      )}
    />
  );
};
