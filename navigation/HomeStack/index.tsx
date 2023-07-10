import { createStackNavigator } from "@react-navigation/stack";

import { HeaderBackImage, HeaderTitle } from "../../components/sections";
import COLORS from "../../constants/colors";
import { AddPinScreen } from "../../screens/Home/AddPinScreen";
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
      headerTitle: HeaderTitle,
      headerBackImage: HeaderBackImage,
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
