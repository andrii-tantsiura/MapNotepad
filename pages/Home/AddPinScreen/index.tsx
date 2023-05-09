import { FC } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Typography } from "../../../components/common";
import { HomeScreenProps } from "../../../navigation/HomeStack/types";

export const AddPinScreen: FC<HomeScreenProps> = () => (
  <View style={styles.container}>
    <Typography color="lightPrimary">Add pin screen</Typography>
  </View>
);
