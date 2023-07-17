import { FC } from "react";
import { View } from "react-native";
import { LatLng } from "react-native-maps";

import { SAVE_ICON } from "../../../assets/icons";
import {
  PinForm,
  SelectLocationView,
  Separator,
} from "../../../components/sections";
import { pinFormToPin } from "../../../helpers";
import { useHeaderRightButton, useHookForm, usePins } from "../../../hooks";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { IPinForm } from "../../../types";
import styles from "./styles";

export const AddPinScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { createPin } = usePins();

  const { formController, watch, setValue, handleSubmit } =
    useHookForm<IPinForm>();

  const setCoordinates = ({ latitude, longitude }: LatLng) => {
    setValue("latitude", String(latitude));
    setValue("longitude", String(longitude));

    formController.trigger("latitude");
    formController.trigger("longitude");
  };

  const savePinHandler = async (pinForm: IPinForm) => {
    const newPin = pinFormToPin(pinForm);

    const isPinCreated = await createPin(newPin);

    if (isPinCreated && navigation.canGoBack()) {
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
