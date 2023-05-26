import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { ListRenderItemInfo, View } from "react-native";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { useSelector } from "react-redux";

import { PLUS_ICON } from "../../../assets/icons";
import { IconButton } from "../../../components/common";
import { EmptyView } from "../../../components/sections";
import { HomeStackParamList } from "../../../navigation/HomeStack/types";
import { toggleFavoritePinStatus } from "../../../store/redux/actions/pin.actions";
import { selectPins } from "../../../store/redux/slices/pinsSlice";
import { useAppDispatch } from "../../../store/redux/store";
import { Pin } from "../../../types/map";
import { scaleSize } from "../../../utils/dimensions";
import { PinActionMenu } from "./components/PinActionMenu";
import { PinItem } from "./components/PinItem";
import styles from "./styles";

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "AddPin"
>;

export const PinsScreen: FC = () => {
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const pins = useSelector(selectPins);

  const hidePinActionMenu = (rowMap: RowMap<Pin>, itemKey: string) => {
    rowMap[itemKey].closeRow();
  };

  const toggleFavoriteStatusHandler = (pin: Pin) =>
    dispatch(toggleFavoritePinStatus(pin.id));

  const addPinHandler = () => homeNavigation.navigate("AddPin");

  const deletePinHandler = (
    data: ListRenderItemInfo<Pin>,
    row: RowMap<Pin>
  ) => {
    console.log("delete pin");

    hidePinActionMenu(row, data.item.id);
  };

  const editPinHandler = (data: ListRenderItemInfo<Pin>, row: RowMap<Pin>) => {
    console.log("edit pin");

    hidePinActionMenu(row, data.item.id);
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        closeOnRowPress
        data={pins}
        keyExtractor={(item) => item.id}
        contentContainerStyle={pins.length === 0 && styles.emptyListContainer}
        ListEmptyComponent={() => (
          <EmptyView>There are no added pins yet</EmptyView>
        )}
        renderItem={(data, rowMap) => (
          <PinItem
            data={data.item}
            onPressFavoriteStatus={toggleFavoriteStatusHandler.bind(
              this,
              data.item
            )}
          />
        )}
        renderHiddenItem={(data, row) => (
          <PinActionMenu
            onDelete={deletePinHandler.bind(this, data, row)}
            onEdit={editPinHandler.bind(this, data, row)}
          />
        )}
        stopLeftSwipe={60}
        stopRightSwipe={-200}
        rightOpenValue={-scaleSize(112)}
      />

      <IconButton
        style={styles.addPinButton}
        source={PLUS_ICON}
        onPress={addPinHandler}
      />
    </View>
  );
};
