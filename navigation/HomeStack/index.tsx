import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList } from "./types";
import TabsStack from "../TabStack";
import { AddPinScreen } from "../../pages/Home/AddPinScreen";
import COLORS from "../../constants/colors";
import { Image } from "react-native";
import { GlobalStyles } from "../../constants/styles";

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
      headerTitleStyle: GlobalStyles.headerTitle_i1,
      headerBackImage: () => (
        <Image
          style={GlobalStyles.image_i1}
          source={require("../../assets/icons/ic_left_blue.png")}
        />
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
