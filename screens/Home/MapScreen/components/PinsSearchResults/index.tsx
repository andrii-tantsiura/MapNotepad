import { FC, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { PIN_GRAY_ICON } from "../../../../../assets/icons";
import { CustomButton, Typography } from "../../../../../components/common";
import { Separator } from "../../../../../components/sections";
import { textStyle_i11, textStyle_i13 } from "../../../../../constants";
import { IPins } from "../../../../../types";
import styles from "./styles";

const MAX_VISIBLE_PINS_COUNT = 4;

type PinSearchResultsProps = {
  pins: IPins;
};

export const PinsSearchResults: FC<PinSearchResultsProps> = ({ pins }) => {
  const [pinHeight, setPinHeight] = useState<number>(0);

  const listStyle = [
    {
      height:
        pins.length > MAX_VISIBLE_PINS_COUNT
          ? pinHeight * MAX_VISIBLE_PINS_COUNT
          : "auto",
    },
  ];

  return (
    <View style={styles.container}>
      {pins.length === 0 ? (
        <Typography style={[textStyle_i13, styles.nothingFoundText]}>
          Nothing found
        </Typography>
      ) : (
        <FlatList
          style={listStyle}
          data={pins}
          keyExtractor={(pin) => pin.id}
          renderItem={({ item: pin, index }) => (
            <View
              onLayout={({ nativeEvent: { layout } }) => {
                setPinHeight(layout.height);
              }}
            >
              <View style={styles.pinItem}>
                <CustomButton imageSource={PIN_GRAY_ICON} />

                <View>
                  <Typography
                    style={textStyle_i13}
                    lineBreakMode="tail"
                    numberOfLines={1}
                  >
                    {pin.label}
                  </Typography>

                  {/* TODO: show actual address */}
                  <Typography
                    style={textStyle_i11}
                    lineBreakMode="tail"
                    numberOfLines={1}
                  >
                    "Via Alessandro Solivetti, 17, 00168 Roma..."
                  </Typography>
                </View>
              </View>

              {index < pins.length - 1 && <Separator />}
            </View>
          )}
        />
      )}
    </View>
  );
};
