import { FC, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { LatLng } from "react-native-maps";

import { SAVE_ICON } from "../../../assets/icons";
import { CustomButton, IFormController } from "../../../components/common";
import {
  PinForm,
  PinFormFieldValues,
  SelectLocationView,
  Separator,
} from "../../../components/sections";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { addPin } from "../../../store/redux/actions";
import { useAppDispatch } from "../../../store/redux/store";
import { Pin } from "../../../types/map";
import styles from "./styles";

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

  const coordinatesPickedHandler = (coordinates: LatLng) =>
    setCoordinates(coordinates);

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
        <CustomButton
          containerStyle={{ marginRight: 12 }}
          imageSource={SAVE_ICON}
          onPress={handleSubmit(savePinHandler)}
        />
      ),
    });
  }, []);

  return (
    <>
      <Separator />

      <View style={styles.container}>
        <PinForm formController={formController} />

        <SelectLocationView
          latitude={latitude}
          longitude={longitude}
          onPickCoordinates={coordinatesPickedHandler}
        />
      </View>
    </>
  );
};
