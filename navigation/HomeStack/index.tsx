import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList } from "./types";
import TabsStack from "../TabStack";
import { AddPinScreen } from "../../pages/Home/AddPinScreen";
import COLORS from "../../constants/colors";
import { Image } from "react-native";
import { ComponentStyles } from "../../constants/styles";

const LEFT_ICON = require("../../assets/icons/ic_left_blue.png");

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
      headerTitleStyle: ComponentStyles.headerTitle_i1,
      headerBackImage: () => (
        <Image style={ComponentStyles.image_i1} source={LEFT_ICON} />
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
  </Stack.Navigator>
);

export default HomeStack;
