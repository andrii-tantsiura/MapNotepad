import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useAppDispatch } from "../../../store/redux/store";
import { useSelector } from "react-redux";
import styles from "./styles";
import { PinItem } from "./components/PinItem";
import { FloatingActionButton } from "../../../components/sections";
import { HomeStackParamList } from "../../../navigation/HomeStack/types";
import { selectPins } from "../../../store/redux/slices/pinsSlice";
import { Typography } from "../../../components/common";
import { toggleFavoritePinStatus } from "../../../store/redux/actions/pin.actions";
import { Pin } from "../../../types/map";

const PLUS_ICON = require("../../../assets/icons/ic_plus.png");

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "AddPin"
>;

export const PinsScreen: FC = () => {
  const pins = useSelector(selectPins);
  const dispatch = useAppDispatch();

  const homeNavigation = useNavigation<HomeScreenNavigationProp>();

  const pressFavoriteStatusHandler = (pin: Pin) =>
    dispatch(toggleFavoritePinStatus(pin.id));

  const addPinHandler = () => homeNavigation.navigate("AddPin");

  return (
    <View style={styles.container}>
      <FlatList
        data={pins}
        contentContainerStyle={styles.pinsListContainer}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="lightPrimary">
              There are no added pins yet
            </Typography>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => (
          <PinItem
            data={item.item}
            onPressFavoriteStatus={pressFavoriteStatusHandler.bind(
              this,
              item.item
            )}
          />
        )}
      />
      <FloatingActionButton
        style={styles.addPinButton}
        source={PLUS_ICON}
        onPress={addPinHandler}
      />
    </View>
  );
};
