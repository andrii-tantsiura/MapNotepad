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
import { pinDataToPinItem, pinItemToPinData } from "../../../converters";
import { usePins } from "../../../hooks";
import { HomeStackParamList } from "../../../navigation/HomeStack/types";
import { TabProps } from "../../../navigation/TabStack/types";
import { selectPinsSearch } from "../../../store/redux/slices";
import { IPinData } from "../../../types/data";
import { IPinItemData } from "../../../types/ui";
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

export const PinsScreen: FC<TabProps> = ({ navigation }) => {
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();

  const {
    isPinsLoading,
    fetchPins,
    togglePinFavoriteStatus,
    deletePin,
    filterPinsBySearchQuery,
    getPins,
  } = usePins();

  const [selectedPinRow, setSelectedPinRow] = useState<RowMap<IPinItemData>>();
  const [selectedPinId, setSelectedPinId] = useState<string>();
  const [isRemovePinConfirmationShown, setIsRemovePinConfirmationVisible] =
    useState(false);

  const { searchQuery } = useSelector(selectPinsSearch);

  const pins = searchQuery ? filterPinsBySearchQuery(searchQuery) : getPins();
  const displayedPins = pins.map((x) => pinDataToPinItem(x));

  const togglePinFavoriteStatusHandler = (pin: IPinItemData) => {
    const pinData: IPinData = pinItemToPinData(pin);

    togglePinFavoriteStatus(pinData);
  };

  const pinPressedHandler = (pin: IPinItemData) => {
    const pinData: IPinData = pinItemToPinData(pin);

    navigation.navigate("Map", { pin: pinData });
  };

  const deletePinHandler = (
    { item: pin }: ListRenderItemInfo<IPinItemData>,
    row: RowMap<IPinItemData>
  ) => {
    setSelectedPinId(pin.key);
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
    { item: pin }: ListRenderItemInfo<IPinItemData>,
    row: RowMap<IPinItemData>
  ) => {
    hideActionMenu(row, pin.key);

    homeNavigation.navigate("EditPin", { pinId: pin.key });
  };

  const addPinHandler = () => homeNavigation.navigate("AddPin");

  const renderPinItem = ({ item: pin }: ListRenderItemInfo<IPinItemData>) => (
    <PinItem
      pin={pin}
      onPress={pinPressedHandler}
      onPressFavoriteStatus={togglePinFavoriteStatusHandler}
    />
  );

  const renderHiddenActionMenu = (
    pin: ListRenderItemInfo<IPinItemData>,
    row: RowMap<IPinItemData>
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
        data={displayedPins}
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
