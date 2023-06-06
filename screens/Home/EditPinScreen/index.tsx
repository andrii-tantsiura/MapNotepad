import { FC, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { LatLng } from "react-native-maps";
import { useSelector } from "react-redux";

import { SAVE_ICON } from "../../../assets/icons";
import { IconButton } from "../../../components/common";
import {
  PinForm,
  PinFormFieldValues,
  SelectLocationView,
  Separator,
} from "../../../components/sections";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { updatePin } from "../../../store/redux/actions/pin.actions";
import { selectPins } from "../../../store/redux/slices/pinsSlice";
import { useAppDispatch } from "../../../store/redux/store";
import { Pin } from "../../../types/map";
import styles from "./styles";

export const EditPinScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const pin = useSelector(selectPins).find((x) => x.id === route.params?.pinId);

  const { control, watch, trigger, setValue, resetField, handleSubmit } =
    useForm<PinFormFieldValues>({
      defaultValues: {
        label: "",
        description: "",
        latitude: pin?.location.latitude.toString(),
        longitude: pin?.location.longitude.toString(),
      },
      mode: "onTouched",
    });

  const setCoordinates = ({ latitude, longitude }: LatLng) => {
    setValue("latitude", String(latitude));
    setValue("longitude", String(longitude));

    trigger("latitude");
    trigger("longitude");
  };

  const coordinatesPickedHandler = (coordinates: LatLng) =>
    setCoordinates(coordinates);

  const savePinHandler = (values: PinFormFieldValues) => {
    if (pin) {
      const newPin: Pin = {
        id: pin.id,
        label: values.label,
        description: values.description,
        location: {
          latitude: Number.parseFloat(values.latitude),
          longitude: Number.parseFloat(values.longitude),
        },
        isFavorite: pin.isFavorite,
      };

      dispatch(updatePin(newPin));
    }

    navigation.goBack();
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          style={{ marginRight: 12 }}
          source={SAVE_ICON}
          onPress={handleSubmit(savePinHandler)}
        />
      ),
    });
  }, []);

  return (
    <>
      <Separator />

      <View style={styles.container}>
        <PinForm control={control} resetField={resetField} />

        <SelectLocationView
          latitude={latitude}
          longitude={longitude}
          shouldRequestLocationInitially={false}
          onPickCoordinates={coordinatesPickedHandler}
        />
      </View>
    </>
  );
};
