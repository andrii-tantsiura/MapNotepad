import { FC, useState } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";
import {
  FloatingActionButton,
  FormikValidatedInputText,
} from "../../../components/sections";
import { IconButton, Separator } from "../../../components/common";
import {
  latitudeValidationSchema,
  longitudeValidationSchema,
} from "../../../utils/stringSchemas";

const LOCATION_ICON = require("../../../assets/icons/ic_location.png");
const SAVE_ICON = require("../../../assets/icons/ic_save.png");

const ValidationSchema = Yup.object().shape({
  longitude: longitudeValidationSchema,
  latitude: latitudeValidationSchema,
});

export const AddPinScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const submitHandler = (values: any) => {
    console.log("submit");
  };

  navigation.setOptions({
    headerRight: () => (
      <IconButton style={{ marginRight: 12 }} source={SAVE_ICON} />
    ),
  });

  return (
    <>
      <Separator />
      <View style={styles.container}>
        <Formik
          initialValues={{
            label: label,
            description: description,
            longitude: longitude,
            latitude: latitude,
          }}
          validationSchema={ValidationSchema}
          onSubmit={submitHandler}
        >
          {({ values, handleSubmit, ...formikProps }) => (
            <View style={styles.inputsContainer}>
              <FormikValidatedInputText
                title="Label"
                placeholder="Enter the label"
                valueName="label"
                value={values.label}
                {...formikProps}
              />
              <FormikValidatedInputText
                title="Description"
                placeholder="Write a description"
                valueName="description"
                value={values.description}
                {...formikProps}
              />
              <View style={styles.coordinatesContainer}>
                <View style={styles.coordinateContainer}>
                  <FormikValidatedInputText
                    keyboardType="numeric"
                    title="Coordinates"
                    placeholder="Longitude"
                    valueName="longitude"
                    value={values.longitude}
                    {...formikProps}
                  />
                </View>
                <View style={styles.coordinateContainer}>
                  <FormikValidatedInputText
                    keyboardType="numeric"
                    placeholder="Latitude"
                    valueName="latitude"
                    value={values.latitude}
                    {...formikProps}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
        <MapView style={styles.map}></MapView>
        <FloatingActionButton
          style={styles.locationButton}
          source={LOCATION_ICON}
        />
      </View>
    </>
  );
};
