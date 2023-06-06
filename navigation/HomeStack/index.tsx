import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import { LEFT_BLUE_ICON } from "../../assets/icons";
import COLORS from "../../constants/colors";
import { ImageStyles, TextStyles } from "../../constants/globalStyles";
import { AddPinScreen } from "../../screens/Home/AddPinScreen";
import { EditPinScreen } from "../../screens/Home/EditPinScreen";
import TabsStack from "../TabStack";
import { HomeStackParamList } from "./types";

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Tabs"
    screenOptions={{
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: COLORS.systemWhite,
      },
      headerTitleStyle: TextStyles.header_i1,
      headerBackImage: () => (
        <Image style={ImageStyles.image_i1} source={LEFT_BLUE_ICON} />
      ),
    }}
  >
    <Stack.Screen
      name="Tabs"
      component={TabsStack}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="AddPin"
      component={AddPinScreen}
      options={{
        title: "Add pin",
      }}
    />

    <Stack.Screen
      name="EditPin"
      component={EditPinScreen}
      options={{
        title: "Edit pin",
      }}
    />
  </Stack.Navigator>
);

export default HomeStack;
