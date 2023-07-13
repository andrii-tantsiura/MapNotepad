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
import AlertService from "../../../services/AlertService";
import PinsService from "../../../services/PinsService";
import { addPin } from "../../../store/redux/actions";
import { useAppDispatch } from "../../../store/redux/store";
import { IPin, IPinPayload } from "../../../types/map";
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

  const savePinHandler = async ({
    label,
    description,
    latitude,
    longitude,
  }: PinFormFieldValues) => {
    const newPin: IPinPayload = {
      label,
      description,
      location: {
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
      },
      isFavorite: true,
    };

    const createPinResult = await PinsService.createPin(newPin);

    if (createPinResult.isSuccess && createPinResult.result) {
      const localPin: IPin = {
        id: createPinResult.result,
        ...newPin,
      };

      dispatch(addPin(localPin));

      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } else {
      AlertService.error(createPinResult.toString());
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
