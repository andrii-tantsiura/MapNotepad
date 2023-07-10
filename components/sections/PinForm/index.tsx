import { FC, useState } from "react";
import { View } from "react-native";

import styles from "./styles";

import {
  LATITUDE_RULES,
  LONGITUDE_RULES,
  PIN_LABEL_RULES,
} from "../../../helpers";
import { IFormController, InformativeTextInput } from "../../common";

export type PinFormFieldValues = {
  label: string;
  description: string;
  latitude: string;
  longitude: string;
};

interface IPinFormProps {
  formController: IFormController;
}

export const PinForm: FC<IPinFormProps> = ({ formController }) => {
  const [isManualCoordsEdit, setIsManualCoordsEdit] = useState(false);

  const setManualCoordsEditHandler = () => setIsManualCoordsEdit(true);
  const resetManualCoordsEditHandler = () => setIsManualCoordsEdit(false);

  return (
    <View style={styles.container}>
      {!isManualCoordsEdit && (
        <View>
          <InformativeTextInput
            formController={formController}
            name="label"
            rules={PIN_LABEL_RULES}
            title="Label"
            placeholder="Write a label"
          />

          <InformativeTextInput
            formController={formController}
            name="description"
            title="Description"
            placeholder="Write a description"
          />
        </View>
      )}

      <View style={styles.coordinatesContainer}>
        <View style={styles.coordinateContainer}>
          <InformativeTextInput
            formController={formController}
            name="longitude"
            keyboardType="numeric"
            title="Coordinates"
            placeholder="Longitude"
            maxLength={10}
            rules={LONGITUDE_RULES}
            onFocus={setManualCoordsEditHandler}
            onSubmitEditing={resetManualCoordsEditHandler}
          />
        </View>

        <View style={styles.coordinateContainer}>
          <InformativeTextInput
            formController={formController}
            name="latitude"
            rules={LATITUDE_RULES}
            keyboardType="numeric"
            maxLength={10}
            placeholder="Latitude"
            onFocus={setManualCoordsEditHandler}
            onSubmitEditing={resetManualCoordsEditHandler}
          />
        </View>
      </View>
    </View>
  );
};
