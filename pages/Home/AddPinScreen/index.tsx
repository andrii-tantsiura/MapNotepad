import { FC, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { LatLng } from "react-native-maps";
import { FieldValues, useForm } from "react-hook-form";
import styles from "./styles";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { IconButton, Separator } from "../../../components/common";
import { PinForm, SelectLocationMapView } from "../../../components/sections";

const SAVE_ICON = require("../../../assets/icons/ic_save.png");

export const AddPinScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { control, watch, trigger, setValue, resetField, handleSubmit } =
    useForm({
      defaultValues: {
        label: "",
        description: "",
        latitude: "",
        longitude: "",
      },
      mode: "onTouched",
    });

  const setCoordinates = (coordinate: LatLng) => {
    setValue("latitude", String(coordinate.latitude));
    setValue("longitude", String(coordinate.longitude));

    trigger("latitude");
    trigger("longitude");
  };

  const savePinHandler = (values: FieldValues) => {};

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
        <SelectLocationMapView
          latitude={latitude}
          longitude={longitude}
          setCoordinates={setCoordinates}
        />
      </View>
    </>
  );
};
