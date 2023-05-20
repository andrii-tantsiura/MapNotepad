import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { PLUS_ICON } from "../../../assets/icons";
import { IconButton } from "../../../components/common";
import { EmptyView } from "../../../components/sections";
import { HomeStackParamList } from "../../../navigation/HomeStack/types";
import { toggleFavoritePinStatus } from "../../../store/redux/actions/pin.actions";
import { selectPins } from "../../../store/redux/slices/pinsSlice";
import { useAppDispatch } from "../../../store/redux/store";
import { Pin } from "../../../types/map";
import { PinItem } from "./components/PinItem";
import styles from "./styles";

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

      <IconButton
        style={styles.addPinButton}
        source={PLUS_ICON}
        onPress={addPinHandler}
      />
    </View>
  );
};
