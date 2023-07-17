import { FC, useEffect } from "react";
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
import { IPin, IPinForm } from "../../../types";
import styles from "./styles";

export const EditPinScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const { pins, updatePin } = usePins();

  const editedPin = pins.find((x) => x.id === route.params?.pinId);

  const { formController, watch, setValue, handleSubmit } =
    useHookForm<IPinForm>();

  const setCoordinates = ({ latitude, longitude }: LatLng) => {
    setValue("latitude", String(latitude));
    setValue("longitude", String(longitude));

    formController.trigger("latitude");
    formController.trigger("longitude");
  };

  const savePinHandler = async (pinForm: IPinForm) => {
    if (editedPin) {
      const pinToUpdate: IPin = {
        ...pinFormToPin(pinForm),
        id: editedPin.id,
        isFavorite: editedPin.isFavorite,
      };

      const isPinUpdated = await updatePin(pinToUpdate);

      if (isPinUpdated && navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };

  const latitude = Number.parseFloat(watch("latitude"));
  const longitude = Number.parseFloat(watch("longitude"));

  useEffect(() => {
    if (editedPin) {
      setValue("label", editedPin.label);
      setValue("description", editedPin.description ?? "");
      setValue("latitude", editedPin.location.latitude.toString());
      setValue("longitude", editedPin.location.longitude.toString());
    }
  }, [editedPin]);

  useHeaderRightButton(navigation, SAVE_ICON, handleSubmit(savePinHandler));

  return (
    <>
      <Separator />

      <View style={styles.container}>
        <PinForm formController={formController} />

        <SelectLocationView
          latitude={latitude}
          longitude={longitude}
          shouldRequestLocationInitially={false}
          onPickCoordinates={setCoordinates}
        />
      </View>
    </>
  );
};
