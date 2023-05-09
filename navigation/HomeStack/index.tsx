import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParams } from "./types";
import TabsStack from "../TabStack";
import { AddPinScreen } from "../../pages/Home/AddPinScreen";
import COLORS from "../../constants/colors";
import { BackButton, HeaderTitle } from "../../components/sections";

const Stack = createStackNavigator<HomeStackParams>();

const HomeStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Tabs"
    screenOptions={({ navigation }) => ({
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: COLORS.systemWhite,
      },
      headerTitle: HeaderTitle,
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
    })}
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
