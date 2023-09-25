import { FC, useEffect, useState } from "react";
import { ViewStyle } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Typography } from "../../../../../components/common";
import { Separator } from "../../../../../components/sections";
import {
  DISPLAYED_PINS_SEARCH_RESULTS_MAX_COUNT,
  textStyle_i13,
} from "../../../../../constants";
import { pinModelToPinItemModel } from "../../../../../converters";
import { IPinItemModel } from "../../../../../types/components";
import { IPinModel } from "../../../../../types/models";
import { FoundPin } from "../FoundPin";
import { FOUND_PIN_HEIGHT } from "../FoundPin/styles";
import styles from "./styles";

const emptyListView = () => (
  <Typography style={[textStyle_i13, styles.nothingFoundText]}>
    Nothing found
  </Typography>
);

type FoundPinsListProps = {
  pins: Array<IPinModel>;
  onPinPressed: (pin: IPinItemModel) => void;
};

export const FoundPinsList: FC<FoundPinsListProps> = ({
  pins,
  onPinPressed,
}) => {
  const [displayedPins, setDisplayedPins] = useState<IPinItemModel[]>([]);
  const [pinsListStyle, setPinsListStyle] = useState<ViewStyle[]>();

  useEffect(() => {
    const displayedPins: IPinItemModel[] = pins.map((x) =>
      pinModelToPinItemModel(x)
    );

    setDisplayedPins(displayedPins);
  }, [pins]);

  useEffect(() => {
    const pinsListStyle: ViewStyle[] = [
      {
        height:
          pins.length > DISPLAYED_PINS_SEARCH_RESULTS_MAX_COUNT
            ? FOUND_PIN_HEIGHT * DISPLAYED_PINS_SEARCH_RESULTS_MAX_COUNT
            : "auto",
      },
    ];

    setPinsListStyle(pinsListStyle);
  }, [pins.length]);

  return (
    <FlatList
      style={[styles.container, pinsListStyle]}
      keyboardShouldPersistTaps="always"
      data={displayedPins}
      ItemSeparatorComponent={() => <Separator />}
      ListEmptyComponent={emptyListView}
      renderItem={({ item }) => <FoundPin pin={item} onPress={onPinPressed} />}
    />
  );
};
