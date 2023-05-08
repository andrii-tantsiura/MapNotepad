import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "./types";
import { FC, useContext, useState } from "react";
import { Image } from "react-native";
import { PinsScreen } from "../../pages/PinsScreen";
import { MapScreen } from "../../pages/MapScreen";
import styles from "./styles";
import { SearchBar } from "../../components/sections";
import { AuthContext } from "../../store/AuthContextProvider";
import { ConfirmModal } from "../../components/modals/ConfirmModal";

const MAP_ICON = require("../../assets/icons/ic_map.png");
const PIN_ICON = require("../../assets/icons/ic_pin.png");

const Tabs = createBottomTabNavigator<TabStackParamList>();

const TabsStack: FC = () => {
  const authContext = useContext(AuthContext);
  const [isLogoutOpened, setIsLogoutOpened] = useState(false);

  return (
    <>
      <ConfirmModal
        title="Log Out"
        description="Are you sure you want to logout?"
        confirmText="Log Out"
        visible={isLogoutOpened}
        onConfirm={() => {
          setIsLogoutOpened(false);
          authContext.logout();
        }}
        onCancel={() => {
          setIsLogoutOpened(false);
        }}
      />

      <Tabs.Navigator
        screenOptions={{
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: styles.tabBarLabel,
          header: () => (
            <SearchBar
              onRightButtonPress={() => {
                setIsLogoutOpened(true);
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
    </>
  );
};

export default TabsStack;
