import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { ListRenderItemInfo, View } from "react-native";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { useSelector } from "react-redux";

import { PLUS_ICON } from "../../../assets/icons";
import { CustomButton } from "../../../components/common";
import { ConfirmModal } from "../../../components/modals";
import { EmptyView } from "../../../components/sections";
import { CustomButtonStyles } from "../../../constants";
import { HomeStackParamList } from "../../../navigation/HomeStack/types";
import AlertService from "../../../services/AlertService";
import PinsService from "../../../services/PinsService";
import {
  deletePin,
  toggleFavoritePinStatus,
} from "../../../store/redux/actions";
import { selectPins } from "../../../store/redux/slices";
import { useAppDispatch } from "../../../store/redux/store";
import { IPin } from "../../../types";
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
  rowMap: RowMap<IPin> | undefined,
  pinKey: string | undefined
) => {
  if (pinKey) {
    rowMap?.[pinKey]?.closeRow();
  }
};

export const PinsScreen: FC = () => {
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const [selectedPinRow, setSelectedPinRow] = useState<RowMap<IPin>>();
  const [selectedPinId, setSelectedPinId] = useState<string>();
  const [isRemovePinConfirmationShown, setIsRemovePinConfirmationVisible] =
    useState(false);

  const pins = useSelector(selectPins);

  const toggleFavoriteStatusHandler = async (pin: IPin) => {
    const toggleFavoriteStatusResult =
      await PinsService.toggleFavoritePinStatus(pin);

    if (
      toggleFavoriteStatusResult.isSuccess &&
      toggleFavoriteStatusResult.result
    ) {
      dispatch(toggleFavoritePinStatus(pin.id));
    } else {
      AlertService.error(toggleFavoriteStatusResult.getMessage());
    }
  };

  const deletePinHandler = (
    { item: pin }: ListRenderItemInfo<IPin>,
    row: RowMap<IPin>
  ) => {
    setSelectedPinId(pin.id);
    setSelectedPinRow(row);

    setIsRemovePinConfirmationVisible(true);
  };

  const confirmDeletePinHandler = async () => {
    if (selectedPinId) {
      const deletePinResult = await PinsService.deletePin(selectedPinId);

      if (deletePinResult.isSuccess) {
        dispatch(deletePin(selectedPinId));
      } else {
        AlertService.error(deletePinResult.getMessage());
      }
    }

    setIsRemovePinConfirmationVisible(false);
  };

  const cancelDeletePinHandler = () => {
    setIsRemovePinConfirmationVisible(false);

    hidePinActionMenu(selectedPinRow, selectedPinId);
  };

  const editPinHandler = (
    { item: pin }: ListRenderItemInfo<IPin>,
    row: RowMap<IPin>
  ) => {
    hidePinActionMenu(row, pin.id);

    homeNavigation.navigate("EditPin", { pinId: pin.id });
  };

  const addPinHandler = () => homeNavigation.navigate("AddPin");

  const renderPinItem = ({ item: pin }: ListRenderItemInfo<IPin>) => (
    <PinItem
      data={pin}
      onPressFavoriteStatus={() => toggleFavoriteStatusHandler(pin)}
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

      <CustomButton
        style={CustomButtonStyles.roundFloating_i2}
        imageSource={PLUS_ICON}
        onPress={addPinHandler}
      />
    </View>
  );
};
