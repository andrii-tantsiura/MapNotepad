import { FC, createRef, useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
} from "react-native-maps";
import * as Location from "expo-location";
import { FieldValues, useForm } from "react-hook-form";
import styles from "./styles";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { FloatingActionButton } from "../../../components/sections";
import { IconButton, Separator } from "../../../components/common";
import AlertService from "../../../services/AlertService";
import { ErrorMessages } from "../../../enums/errorMessages";
import { ValidateInputText } from "../../../components/common/ValidateInputText";
import {
  LATITUDE_RULES,
  LONGITUDE_RULES,
  PIN_LABEL_RULES,
} from "../../../utils/validationRules";

const LOCATION_ICON = require("../../../assets/icons/ic_location.png");
const SAVE_ICON = require("../../../assets/icons/ic_save.png");

const defaultLatitude = 51.5079145;
const defaultLongitude = -0.0899163;

export const AddPinScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [isPinSaveDisabled, setIsPinSaveDisabled] = useState(true);
  const [lastValidLatitude, setLastValidLatitude] = useState(defaultLatitude);
  const [lastValidLongitude, setLastValidLongitude] =
    useState(defaultLongitude);

  const mapViewRef = createRef<MapView>();

  const { control, handleSubmit, setValue, resetField, watch, trigger } =
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
  };

  const markerDraggedHandler = (e: MarkerDragStartEndEvent) => {
    setValidatedCoordinates(e.nativeEvent.coordinate);
  };

  const mapPressedHandler = (e: MapPressEvent) => {
    setValidatedCoordinates(e.nativeEvent.coordinate);
  };

  const setCurrentPositionHandler = async () => {
    const { coords } = await Location.getCurrentPositionAsync();

    setValidatedCoordinates(coords);

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

  useEffect(() => {
    mapViewRef.current?.animateToRegion({
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      latitude: lastValidLatitude,
      longitude: lastValidLongitude,
    });
  }, [lastValidLatitude, lastValidLongitude]);

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
  }, [isPinSaveDisabled]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        await setCurrentPositionHandler();
      } else {
        AlertService.error(ErrorMessages.LOCATION_PERMISSION_DENIED);
      }
    })();
  }, []);

  return (
    <>
      <Separator />
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
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
              />
            </View>
          </View>
        </View>

        <MapView
          style={styles.map}
          ref={mapViewRef}
          onPress={mapPressedHandler}
        >
          <Marker
            draggable
            image={require("../../../assets/icons/ic_marker.png")}
            coordinate={{
              latitude: lastValidLatitude,
              longitude: lastValidLongitude,
            }}
            onDragEnd={markerDraggedHandler}
          />
        </MapView>

        <FloatingActionButton
          style={styles.locationButton}
          source={LOCATION_ICON}
          onPress={setCurrentPositionHandler}
        />
      </View>
    </>
  );
};
