import { FC, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { LatLng } from "react-native-maps";

import { IconButton } from "../../../components/common";
import {
  PinForm,
  PinFormFieldValues,
  SelectLocationView,
  Separator,
} from "../../../components/sections";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { addPin } from "../../../store/redux/actions/pin.actions";
import { useAppDispatch } from "../../../store/redux/store";
import { Pin } from "../../../types/map";
import styles from "./styles";

const SAVE_ICON = require("../../../assets/icons/ic_save.png");

export const AddPinScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { control, watch, trigger, setValue, resetField, handleSubmit } =
    useForm<PinFormFieldValues>({
      defaultValues: {
        label: "",
        description: "",
        latitude: "",
        longitude: "",
      },
      mode: "onTouched",
    });

  const coordinatesSelectedHandler = (coordinate: LatLng) => {
    setValue("latitude", String(coordinate.latitude));
    setValue("longitude", String(coordinate.longitude));

    trigger("latitude");
    trigger("longitude");
  };

  const savePinHandler = (values: PinFormFieldValues) => {
    const newPin: Pin = {
      id: Date.now().toString(),
      label: values.label,
      description: values.description,
      location: {
        latitude: Number.parseFloat(values.latitude),
        longitude: Number.parseFloat(values.longitude),
      },
      isFavorite: true,
    };

    dispatch(addPin(newPin));

    navigation.goBack();
  };

  const latitude = Number.parseFloat(watch("latitude"));
  const longitude = Number.parseFloat(watch("longitude"));

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
          onSelectCoordinates={coordinatesSelectedHandler}
        />
      </View>
    </>
  );
};
