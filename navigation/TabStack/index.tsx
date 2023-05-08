import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "./types";
import { FC, useContext } from "react";
import { Image } from "react-native";
import { PinsScreen } from "../../pages/PinsScreen";
import { MapScreen } from "../../pages/MapScreen";
import styles from "./styles";
import { SearchBar } from "../../components/sections";
import { AuthContext } from "../../store/AuthContextProvider";

const MAP_ICON = require("../../assets/icons/ic_map.png");
const PIN_ICON = require("../../assets/icons/ic_pin.png");

const Tabs = createBottomTabNavigator<TabStackParamList>();

const TabsStack: FC = () => {
  const authContext = useContext(AuthContext);

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: styles.tabBarLabel,
        header: () => (
          <SearchBar
            onRightButtonPress={() => {
              authContext.logout();
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.tabBarIcon}
              resizeMode="center"
              source={MAP_ICON}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Pins"
        component={PinsScreen}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.tabBarIcon}
              resizeMode="center"
              source={PIN_ICON}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsStack;
