import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { ListRenderItemInfo, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { useSelector } from "react-redux";

import { PLUS_ICON } from "../../../assets/icons";
import { CustomButton } from "../../../components/common";
import { ConfirmModal } from "../../../components/modals";
import { EmptyView } from "../../../components/sections";
import { CustomButtonStyles } from "../../../constants";
import { usePins } from "../../../hooks";
import { HomeStackParamList } from "../../../navigation/HomeStack/types";
import { selectPinsSearch } from "../../../store/redux/slices";
import { IPin } from "../../../types";
import { hideActionMenu } from "../../../utils";
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

export const PinsScreen: FC = () => {
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();

  const {
    isPinsLoading,
    fetchPins,
    togglePinFavoriteStatus: toggleFavoriteStatus,
    deletePin,
    filterPinsBySearchQuery,
    getPins,
  } = usePins();

  const [selectedPinRow, setSelectedPinRow] = useState<RowMap<IPin>>();
  const [selectedPinId, setSelectedPinId] = useState<string>();
  const [isRemovePinConfirmationShown, setIsRemovePinConfirmationVisible] =
    useState(false);

  const { searchQuery } = useSelector(selectPinsSearch);

  const pins = searchQuery ? filterPinsBySearchQuery(searchQuery) : getPins();

  const deletePinHandler = (
    { item: pin }: ListRenderItemInfo<IPin>,
    row: RowMap<IPin>
  ) => {
    setSelectedPinId(pin.id);
    setSelectedPinRow(row);

    setIsRemovePinConfirmationVisible(true);
  };

  const confirmDeletePinHandler = () => {
    if (selectedPinId) {
      deletePin(selectedPinId);
    }

    setIsRemovePinConfirmationVisible(false);
  };

  const cancelDeletePinHandler = () => {
    setIsRemovePinConfirmationVisible(false);

    hideActionMenu(selectedPinRow, selectedPinId);
  };

  const editPinHandler = (
    { item: pin }: ListRenderItemInfo<IPin>,
    row: RowMap<IPin>
  ) => {
    hideActionMenu(row, pin.id);

    homeNavigation.navigate("EditPin", { pinId: pin.id });
  };

  const addPinHandler = () => homeNavigation.navigate("AddPin");

  const renderPinItem = ({ item: pin }: ListRenderItemInfo<IPin>) => (
    <PinItem
      data={pin}
      onPressFavoriteStatus={() => toggleFavoriteStatus(pin)}
    />
  );

  const renderHiddenActionMenu = (
    pin: ListRenderItemInfo<IPin>,
    row: RowMap<IPin>
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
        refreshControl={
          <RefreshControl refreshing={isPinsLoading} onRefresh={fetchPins} />
        }
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
          <EmptyView>
            {searchQuery ? "Nothing found" : "There are no added pins yet"}
          </EmptyView>
        )}
        renderItem={renderPinItem}
        renderHiddenItem={renderHiddenActionMenu}
        stopLeftSwipe={60}
        stopRightSwipe={-200}
        rightOpenValue={-PIN_ACTION_MENU_WIDTH}
      />

      <CustomButton
        style={CustomButtonStyles.roundFloating_i2}
        imageSource={PLUS_ICON}
        onPress={addPinHandler}
      />
    </View>
  );
};
