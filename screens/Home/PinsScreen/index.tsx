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
import {
  pinItemModelToPinModel,
  pinModelToPinItemModel,
} from "../../../converters";
import { usePins } from "../../../hooks";
import { HomeStackParamList } from "../../../navigation/HomeStack/types";
import { TabProps } from "../../../navigation/TabStack/types";
import { selectPinsSearch } from "../../../store/redux/slices";
import { IPinItemModel } from "../../../types/components";
import { IPinModel } from "../../../types/models";
import { hideActionMenu } from "../../../utils";
import {
  PIN_ACTION_MENU_WIDTH,
  PinActionMenu,
} from "./components/PinActionMenu";
import { PinItem } from "./components/PinItem";
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

  const [selectedPinRow, setSelectedPinRow] = useState<RowMap<IPinItemModel>>();
  const [selectedPinId, setSelectedPinId] = useState<string>();
  const [isRemovePinConfirmationShown, setIsRemovePinConfirmationVisible] =
    useState(false);

  const { searchQuery } = useSelector(selectPinsSearch);

  const pins = searchQuery ? filterPinsBySearchQuery(searchQuery) : getPins();
  const displayedPins = pins.map((x) => pinModelToPinItemModel(x));

  const togglePinFavoriteStatusHandler = (pin: IPinItemModel) => {
    const pinData: IPinModel = pinItemModelToPinModel(pin);

    togglePinFavoriteStatus(pinData);
  };

  const pinPressedHandler = (pin: IPinItemModel) => {
    const pinData: IPinModel = pinItemModelToPinModel(pin);

    navigation.navigate("Map", { pin: pinData });
  };

  const deletePinHandler = (
    { item: pin }: ListRenderItemInfo<IPinItemModel>,
    row: RowMap<IPinItemModel>
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
    { item: pin }: ListRenderItemInfo<IPinItemModel>,
    row: RowMap<IPinItemModel>
  ) => {
    hideActionMenu(row, pin.key);

    homeNavigation.navigate("EditPin", { pinId: pin.key });
  };

  const addPinHandler = () => homeNavigation.navigate("AddPin");

  const renderPinItem = ({ item: pin }: ListRenderItemInfo<IPinItemModel>) => (
    <PinItem
      pin={pin}
      onPress={pinPressedHandler}
      onPressFavoriteStatus={togglePinFavoriteStatusHandler}
    />
  );

  const renderHiddenActionMenu = (
    pin: ListRenderItemInfo<IPinItemModel>,
    row: RowMap<IPinItemModel>
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
