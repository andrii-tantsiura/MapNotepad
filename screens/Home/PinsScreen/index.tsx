import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { ListRenderItemInfo, View } from "react-native";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { useSelector } from "react-redux";

import { PLUS_ICON } from "../../../assets/icons";
import { IconButton } from "../../../components/common";
import { ConfirmModal } from "../../../components/modals/ConfirmModal";
import { EmptyView } from "../../../components/sections";
import { HomeStackParamList } from "../../../navigation/HomeStack/types";
import {
  deletePin,
  toggleFavoritePinStatus,
} from "../../../store/redux/actions/pin.actions";
import { selectPins } from "../../../store/redux/slices/pinsSlice";
import { useAppDispatch } from "../../../store/redux/store";
import { Pin } from "../../../types/map";
import {
  PIN_ACTION_MENU_WIDTH,
  PinActionMenu,
} from "./components/PinActionMenu";
import { PinItem } from "./components/PinItem/PinItem";
import styles from "./styles";

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "AddPin"
>;

const hidePinActionMenu = (
  rowMap: RowMap<Pin> | undefined,
  pinKey: string | undefined
) => {
  if (pinKey) {
    rowMap?.[pinKey]?.closeRow();
  }
};

export const PinsScreen: FC = () => {
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const [selectedPinRow, setSelectedPinRow] = useState<RowMap<Pin>>();
  const [selectedPinId, setSelectedPinId] = useState<string>();
  const [isRemovePinConfirmationShown, setIsRemovePinConfirmationVisible] =
    useState(false);

  const pins = useSelector(selectPins);

  const toggleFavoriteStatusHandler = (pin: Pin) =>
    dispatch(toggleFavoritePinStatus(pin.id));

  const deletePinHandler = (
    { item: pin }: ListRenderItemInfo<Pin>,
    row: RowMap<Pin>
  ) => {
    setSelectedPinId(pin.id);
    setSelectedPinRow(row);

    setIsRemovePinConfirmationVisible(true);
  };

  const confirmDeletePinHandler = () => {
    if (selectedPinId) {
      dispatch(deletePin(selectedPinId ?? ""));
    }

    setIsRemovePinConfirmationVisible(false);
  };

  const cancelDeletePinHandler = () => {
    setIsRemovePinConfirmationVisible(false);

    hidePinActionMenu(selectedPinRow, selectedPinId);
  };

  const editPinHandler = (
    { item: pin }: ListRenderItemInfo<Pin>,
    row: RowMap<Pin>
  ) => {
    hidePinActionMenu(row, pin.id);
  };

  const addPinHandler = () => homeNavigation.navigate("AddPin");

  const renderPinItem = ({ item: pin }: ListRenderItemInfo<Pin>) => (
    <PinItem
      data={pin}
      onPressFavoriteStatus={() => toggleFavoriteStatusHandler(pin)}
    />
  );

  const renderHiddenActionMenu = (
    pin: ListRenderItemInfo<Pin>,
    row: RowMap<Pin>
  ) => (
    <PinActionMenu
      onDelete={() => deletePinHandler(pin, row)}
      onEdit={() => editPinHandler(pin, row)}
    />
  );

  return (
    <View style={styles.container}>
      <ConfirmModal
        visible={isRemovePinConfirmationShown}
        title="Pin will be removed"
        description="Are you sure?"
        onConfirm={confirmDeletePinHandler}
        onCancel={cancelDeletePinHandler}
      />

      <SwipeListView
        onRowOpen={(pinKey) => {
          setSelectedPinId(pinKey);
        }}
        onRowClose={() => {
          setSelectedPinId("");
        }}
        data={pins}
        keyExtractor={({ id }) => id}
        contentContainerStyle={pins.length === 0 && styles.emptyListContainer}
        ListEmptyComponent={() => (
          <EmptyView>There are no added pins yet</EmptyView>
        )}
        renderItem={renderPinItem}
        renderHiddenItem={renderHiddenActionMenu}
        stopLeftSwipe={60}
        stopRightSwipe={-200}
        rightOpenValue={-PIN_ACTION_MENU_WIDTH}
      />

      <IconButton
        style={styles.addPinButton}
        source={PLUS_ICON}
        onPress={addPinHandler}
      />
    </View>
  );
};
