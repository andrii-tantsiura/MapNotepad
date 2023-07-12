import { FC } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { LatLng } from "react-native-maps";

import { SAVE_ICON } from "../../../assets/icons";
import { IFormController } from "../../../components/common";
import {
  PinForm,
  PinFormFieldValues,
  SelectLocationView,
  Separator,
} from "../../../components/sections";
import { useHeaderRightButton } from "../../../hooks";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { addPin } from "../../../store/redux/actions";
import { useAppDispatch } from "../../../store/redux/store";
import { Pin } from "../../../types/map";
import styles from "./styles";

export const AddPinScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { control, watch, trigger, setValue, resetField, handleSubmit } =
    useForm<PinFormFieldValues>();

  const formController: IFormController = {
    control,
    resetField,
    trigger,
  };

  const setCoordinates = ({ latitude, longitude }: LatLng) => {
    setValue("latitude", String(latitude));
    setValue("longitude", String(longitude));

    trigger("latitude");
    trigger("longitude");
  };

  const savePinHandler = ({
    label,
    description,
    latitude,
    longitude,
  }: PinFormFieldValues) => {
    const newPin: Pin = {
      id: Date.now().toString(),
      label,
      description,
      location: {
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
      },
      isFavorite: true,
    };

    dispatch(addPin(newPin));

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const latitude = Number.parseFloat(watch("latitude"));
  const longitude = Number.parseFloat(watch("longitude"));

  useHeaderRightButton(navigation, SAVE_ICON, handleSubmit(savePinHandler));

  return (
    <>
      <Separator />

      <View style={styles.container}>
        <PinForm formController={formController} />

        <SelectLocationView
          latitude={latitude}
          longitude={longitude}
          onPickCoordinates={setCoordinates}
        />
      </View>
    </>
  );
};
