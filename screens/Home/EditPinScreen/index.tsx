import { FC, useEffect } from "react";
import { View } from "react-native";
import { LatLng } from "react-native-maps";
import { useSelector } from "react-redux";

import { SAVE_ICON } from "../../../assets/icons";
import {
  PinForm,
  SelectLocationView,
  Separator,
} from "../../../components/sections";
import { useHeaderRightButton, useHookForm } from "../../../hooks";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import AlertService from "../../../services/AlertService";
import PinsService from "../../../services/PinsService";
import { updatePin } from "../../../store/redux/actions";
import { selectPins } from "../../../store/redux/slices";
import { useAppDispatch } from "../../../store/redux/store";
import { IPin, IPinForm } from "../../../types";
import styles from "./styles";

export const EditPinScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const pin = useSelector(selectPins).find((x) => x.id === route.params?.pinId);

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
    if (pin) {
      const pinToUpdate: IPin = {
        id: pin.id,
        label,
        description,
        location: {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude),
        },
        isFavorite: pin.isFavorite,
      };

      const updatePinResult = await PinsService.updatePin(pinToUpdate);

      if (updatePinResult.isSuccess) {
        dispatch(updatePin(pinToUpdate));

        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      } else {
        AlertService.error(updatePinResult.getMessage());
      }
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
