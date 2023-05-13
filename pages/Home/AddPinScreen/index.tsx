import { FC, useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { LatLng } from "react-native-maps";
import { FieldValues, useForm } from "react-hook-form";
import styles from "./styles";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { IconButton, Separator } from "../../../components/common";
import { ValidateInputText } from "../../../components/common/ValidateInputText";
import {
  LATITUDE_RULES,
  LONGITUDE_RULES,
  PIN_LABEL_RULES,
} from "../../../utils/validationRules";
import { SelectLocationMapView } from "../../../components/sections/SelectLocationMapView";

const SAVE_ICON = require("../../../assets/icons/ic_save.png");

const defaultLatitude = 51.5079145;
const defaultLongitude = -0.0899163;

export const AddPinScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [isPinSaveDisabled, setIsPinSaveDisabled] = useState(true);
  const [lastValidLatitude, setLastValidLatitude] = useState(defaultLatitude);
  const [lastValidLongitude, setLastValidLongitude] =
    useState(defaultLongitude);

  const [isManualCoordsEdit, setIsManualCoordsEdit] = useState(false);

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

  const setValidatedCoordinates = (coordinate: LatLng) => {
    const { latitude, longitude } = coordinate;

    setValue("latitude", String(latitude));
    setValue("longitude", String(longitude));

    trigger("latitude");
    trigger("longitude");
  };

  const savePinHandler = (values: FieldValues) => {};

  const { latitude: enteredLatitude, longitude: enteredLongitude } = watch();

  useEffect(() => {
    const parsedLatitude = Number.parseFloat(enteredLatitude);
    const parsedLongitude = Number.parseFloat(enteredLongitude);

    if (!isNaN(parsedLatitude)) {
      setLastValidLatitude(parsedLatitude);
    }

    if (!isNaN(parsedLongitude)) {
      setLastValidLongitude(parsedLongitude);
    }
  }, [enteredLatitude, enteredLongitude]);

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
        <View style={styles.inputsContainer}>
          {!isManualCoordsEdit && (
            <View>
              <ValidateInputText
                control={control}
                resetField={resetField}
                name="label"
                rules={PIN_LABEL_RULES}
                title="Label"
                placeholder="Write a label"
              />

              <ValidateInputText
                control={control}
                resetField={resetField}
                name="description"
                title="Description"
                placeholder="Write a description"
              />
            </View>
          )}

          <View style={styles.coordinatesContainer}>
            <View style={styles.coordinateContainer}>
              <ValidateInputText
                control={control}
                resetField={resetField}
                name="longitude"
                keyboardType="numeric"
                title="Coordinates"
                placeholder="Longitude"
                maxLength={10}
                rules={LONGITUDE_RULES}
                onFocus={() => {
                  setIsManualCoordsEdit(true);
                }}
                onSubmitEditing={() => {
                  setIsManualCoordsEdit(false);
                }}
              />
            </View>

            <View style={styles.coordinateContainer}>
              <ValidateInputText
                control={control}
                resetField={resetField}
                name="latitude"
                rules={LATITUDE_RULES}
                keyboardType="numeric"
                maxLength={10}
                placeholder="Latitude"
                onFocus={() => {
                  setIsManualCoordsEdit(true);
                }}
                onSubmitEditing={() => {
                  setIsManualCoordsEdit(false);
                }}
              />
            </View>
          </View>
        </View>

        <SelectLocationMapView
          latitude={lastValidLatitude}
          longitude={lastValidLongitude}
          setCoordinates={setValidatedCoordinates}
        />
      </View>
    </>
  );
};
