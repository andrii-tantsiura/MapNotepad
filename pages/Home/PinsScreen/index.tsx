import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/redux/store";
import styles from "./styles";
import { PinItem } from "./components/PinItem";
import { EmptyView, FloatingActionButton } from "../../../components/sections";
import { HomeStackParamList } from "../../../navigation/HomeStack/types";
import { selectPins } from "../../../store/redux/slices/pinsSlice";
import { toggleFavoritePinStatus } from "../../../store/redux/actions/pin.actions";
import { Pin } from "../../../types/map";

const PLUS_ICON = require("../../../assets/icons/ic_plus.png");

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "AddPin"
>;

export const PinsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const pins = useSelector(selectPins);

  const homeNavigation = useNavigation<HomeScreenNavigationProp>();

  const pressFavoriteStatusHandler = (pin: Pin) =>
    dispatch(toggleFavoritePinStatus(pin.id));

  const addPinHandler = () => homeNavigation.navigate("AddPin");

  return (
    <View style={styles.container}>
      <FlatList
        data={pins}
        contentContainerStyle={pins.length === 0 && styles.emptyListContainer}
        ListEmptyComponent={() => (
          <EmptyView>There are no added pins yet</EmptyView>
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
