import { useNavigation } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useState } from "react";
import { ListRenderItemInfo, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { PLUS_ICON } from "../../../assets/icons";
import { IconButton } from "../../../components/common";
import { ConfirmModal } from "../../../components/modals";
import { EmptyView } from "../../../components/sections";
import { IconButtonStyles } from "../../../constants/styles";
import {
  pinItemModelToPinModel,
  pinModelToPinItemModel,
} from "../../../converters";
import { usePins } from "../../../hooks";
import { HomeScreenNavigationProp } from "../../../navigation/HomeStack/types";
import { TabProps } from "../../../navigation/TabStack/types";
import { stopSearchAction } from "../../../store/redux/actions";
import { selectSearch } from "../../../store/redux/slices";
import { useAppDispatch } from "../../../store/redux/store";
import { IPinItemModel } from "../../../types/components";
import { IPinModel } from "../../../types/models";
import { PinItem } from "./components/PinItem";
import styles from "./styles";

export const PinsScreen: FC<TabProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();

  const {
    pins,
    isPinsLoading,
    fetchPins,
    getPinsBySearchQuery,
    togglePinFavoriteStatus,
    deletePin,
  } = usePins();
  const { searchQuery } = useSelector(selectSearch);

  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [pinsItems, setPinsList] = useState<IPinItemModel[]>([]);

  const togglePinFavoriteStatusHandler = useCallback((pin: IPinItemModel) => {
    const pinData: IPinModel = pinItemModelToPinModel(pin);

    togglePinFavoriteStatus(pinData);
  }, []);

  const pinPressedHandler = useCallback(
    (pin: IPinItemModel) => {
      dispatch(stopSearchAction());

      const pinData: IPinModel = pinItemModelToPinModel(pin);

      navigation.navigate("Map", { pin: pinData });
    },
    [navigation, dispatch]
  );

  const editPinHandler = useCallback(
    (pin: IPinItemModel) =>
      homeNavigation.navigate("EditPin", {
        pin: pinItemModelToPinModel(pin),
      }),
    [homeNavigation]
  );

  const deletePinHandler = useCallback(
    (pin: IPinItemModel) => setSelectedPinId(pin.key),
    [setSelectedPinId]
  );

  const confirmDeletePinHandler = () => {
    if (selectedPinId) {
      deletePin(selectedPinId);
    }

    setSelectedPinId(null);
  };

  const cancelDeletePinHandler = () => setSelectedPinId(null);

  const addPinHandler = () => homeNavigation.navigate("AddPin");

  useEffect(() => {
    const filteredPins = searchQuery ? getPinsBySearchQuery(searchQuery) : pins;
    const newPinsList = filteredPins.map((x) => pinModelToPinItemModel(x));

    setPinsList(newPinsList);
  }, [pins, searchQuery]);

  return (
    <View style={styles.container}>
      <ConfirmModal
        visible={Boolean(selectedPinId)}
        title="Pin will be removed"
        description="Are you sure?"
        onConfirm={confirmDeletePinHandler}
        onCancel={cancelDeletePinHandler}
      />
      <FlatList
        keyboardShouldPersistTaps="always"
        data={pinsItems}
        keyExtractor={(item) => item.key}
        renderItem={({ item: pin }: ListRenderItemInfo<IPinItemModel>) => (
          <PinItem
            pin={pin}
            onPress={pinPressedHandler}
            onPressFavoriteStatus={togglePinFavoriteStatusHandler}
            onDelete={deletePinHandler}
            onEdit={editPinHandler}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isPinsLoading} onRefresh={fetchPins} />
        }
        contentContainerStyle={
          pinsItems.length === 0 && styles.emptyListContainer
        }
        ListEmptyComponent={() => (
          <EmptyView>
            {searchQuery ? "Nothing found" : "There are no added pins yet"}
          </EmptyView>
        )}
      />

      <IconButton
        style={IconButtonStyles.floating}
        backgroundColor="primary"
        imageSource={PLUS_ICON}
        onPress={addPinHandler}
      />
    </View>
  );
};
