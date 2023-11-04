import { createStackNavigator } from "@react-navigation/stack";

import { HeaderBackImage, HeaderTitle } from "../../components/sections";
import { useAppTheme } from "../../hooks";
import {
  AddPinScreen,
  EditPinScreen,
  SettingsScreen,
} from "../../screens/Home";
import TabsStack from "../TabStack";
import { HomeStackParamList } from "./types";

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  const { appColors } = useAppTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: appColors.background,
        },
        headerLeftContainerStyle: {
          paddingLeft: 8,
        },
        headerLeftLabelVisible: false,
        headerTitle: HeaderTitle,
        headerBackImage: HeaderBackImage,
      }}
    >
      <Stack.Screen
        name="Home"
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

      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
