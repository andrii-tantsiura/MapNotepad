import { FC, useState } from "react";
import { View } from "react-native";
import { Control, UseFormResetField } from "react-hook-form";
import { ValidateInputText } from "../../common/ValidateInputText";
import styles from "./styles";

import {
  LATITUDE_RULES,
  LONGITUDE_RULES,
  PIN_LABEL_RULES,
} from "../../../utils/validationRules";

export type PinFormFieldValues = {
  label: string;
  description: string;
  latitude: string;
  longitude: string;
};

interface IPinFormProps {
  control: Control<PinFormFieldValues, any>;
  resetField: UseFormResetField<PinFormFieldValues>;
}

export const PinForm: FC<IPinFormProps> = ({ control, resetField }) => {
  const [isManualCoordsEdit, setIsManualCoordsEdit] = useState(false);

  return (
    <View style={styles.container}>
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
  );
};
