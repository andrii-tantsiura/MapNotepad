import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { LatLng } from "react-native-maps";
import { useSelector } from "react-redux";

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
import { updatePin } from "../../../store/redux/actions";
import { selectPins } from "../../../store/redux/slices";
import { useAppDispatch } from "../../../store/redux/store";
import { Pin } from "../../../types/map";
import styles from "./styles";

export const EditPinScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const pin = useSelector(selectPins).find((x) => x.id === route.params?.pinId);

  const { control, watch, trigger, setValue, resetField, handleSubmit } =
    useForm<PinFormFieldValues>();

  const formController: IFormController = {
    control,
    trigger,
    resetField,
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
    if (pin) {
      const pinToUpdate: Pin = {
        id: pin.id,
        label,
        description,
        location: {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude),
        },
        isFavorite: pin.isFavorite,
      };

      dispatch(updatePin(pinToUpdate));
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const latitude = Number.parseFloat(watch("latitude"));
  const longitude = Number.parseFloat(watch("longitude"));

  useEffect(() => {
    if (pin) {
      setValue("label", pin.label);
      setValue("description", pin.description ?? "");
      setValue("latitude", pin.location.latitude.toString());
      setValue("longitude", pin.location.longitude.toString());
    }
  }, [pin]);

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
