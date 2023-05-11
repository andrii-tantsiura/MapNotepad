import { FC, createRef, useEffect, useState } from "react";
import { View } from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
} from "react-native-maps";
import * as Location from "expo-location";
import styles from "./styles";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import { FloatingActionButton } from "../../../components/sections";
import { IconButton, InputText, Separator } from "../../../components/common";
import AlertService from "../../../services/AlertService";
import { ErrorMessages } from "../../../enums/errorMessages";

const LOCATION_ICON = require("../../../assets/icons/ic_location.png");
const SAVE_ICON = require("../../../assets/icons/ic_save.png");

export const AddPinScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const mapRef = createRef<MapView>();

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const [isPinSaveDisabled, setIsPinSaveDisabled] = useState(true);

  const initialRegion = {
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const setCoordinate = (coordinate: LatLng) => {
    const { latitude, longitude } = coordinate;

    setLatitude(String(latitude));
    setLongitude(String(longitude));
  };

  const markerDragEndHandler = (e: MarkerDragStartEndEvent) =>
    setCoordinate(e.nativeEvent.coordinate);

  const mapPressHandler = (e: MapPressEvent) =>
    setCoordinate(e.nativeEvent.coordinate);

  const setCurrentPositionHandlerAsync = () => {
    (async () => {
      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;

      setLatitude(String(latitude));
      setLongitude(String(longitude));
    })();
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        AlertService.error(ErrorMessages.LOCATION_PERMISSION_DENIED);
        return;
      }

      setCurrentPositionHandlerAsync();
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          disabled={isPinSaveDisabled}
          style={{ marginRight: 12 }}
          source={SAVE_ICON}
        />
      ),
    });
  }, [isPinSaveDisabled]);

  useEffect(() => {
    mapRef.current?.animateToRegion({
      ...initialRegion,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
  }, [latitude, longitude]);

  return (
    <>
      <Separator />
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <InputText title="Label" placeholder="Enter the label" />
          <InputText title="Description" placeholder="Write a description" />
          <View style={styles.coordinatesContainer}>
            <View style={styles.coordinateContainer}>
              <InputText
                keyboardType="numeric"
                title="Coordinates"
                placeholder="Longitude"
                value={longitude}
              />
            </View>
            <View style={styles.coordinateContainer}>
              <InputText
                keyboardType="numeric"
                placeholder="Latitude"
                value={latitude}
              />
            </View>
          </View>
        </View>
        <MapView
          style={styles.map}
          ref={mapRef}
          initialRegion={initialRegion}
          onPress={mapPressHandler}
        >
          <Marker
            image={require("../../../assets/icons/ic_marker.png")}
            draggable
            coordinate={{
              latitude: Number(latitude),
              longitude: Number(longitude),
            }}
            title={label}
            description={description}
            onDragEnd={markerDragEndHandler}
          />
        </MapView>
        <FloatingActionButton
          style={styles.locationButton}
          source={LOCATION_ICON}
          onPress={setCurrentPositionHandlerAsync}
        />
      </View>
    </>
  );
};
