import { FC } from "react";
import { View } from "react-native";
import { LatLng } from "react-native-maps";

import { SAVE_ICON } from "../../../assets/icons";
import {
  PinForm,
  SelectLocationView,
  Separator,
} from "../../../components/sections";
import { useHeaderRightButton } from "../../../hooks";
import { useHookForm } from "../../../hooks/useHookForm";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import AlertService from "../../../services/AlertService";
import PinsService from "../../../services/PinsService";
import { addPin } from "../../../store/redux/actions";
import { useAppDispatch } from "../../../store/redux/store";
import { IPin, IPinForm, IPinPayload } from "../../../types";
import styles from "./styles";

export const AddPinScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { formController, watch, setValue, handleSubmit } =
    useHookForm<IPinForm>();

  const setCoordinates = ({ latitude, longitude }: LatLng) => {
    setValue("latitude", String(latitude));
    setValue("longitude", String(longitude));

    formController.trigger("latitude");
    formController.trigger("longitude");
  };

  const savePinHandler = async ({
    label,
    description,
    latitude,
    longitude,
  }: IPinForm) => {
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
      const pin: IPin = {
        id: createPinResult.result,
        ...newPin,
      };

      dispatch(addPin(pin));

      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } else {
      AlertService.error(createPinResult.getMessage());
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
