import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "./types";
import { useContext, useState } from "react";
import { Image } from "react-native";
import styles from "./styles";
import COLORS from "../../constants/colors";
import { AuthContext } from "../../store/AuthContextProvider";
import { SearchBar } from "../../components/sections";
import { ConfirmModal } from "../../components/modals/ConfirmModal";
import { MapScreen } from "../../pages/Home/MapScreen";
import { PinsScreen } from "../../pages/Home/PinsScreen";
import { GlobalStyles } from "../../constants/styles";

const MAP_ICON = require("../../assets/icons/ic_map.png");
const PIN_ICON = require("../../assets/icons/ic_pin.png");

const Tabs = createBottomTabNavigator<TabStackParamList>();

const TabsStack: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [isLogoutDialogOpened, setIsLogoutDialogOpened] = useState(false);

  return (
    <>
      <ConfirmModal
        title="Log Out"
        description="Are you sure you want to logout?"
        confirmText="Log Out"
        visible={isLogoutDialogOpened}
        onConfirm={() => {
          setIsLogoutDialogOpened(false);
          authContext.logout();
        }}
        onCancel={() => {
          setIsLogoutDialogOpened(false);
        }}
      />
      <Tabs.Navigator
        initialRouteName="Map"
        screenOptions={{
          tabBarActiveBackgroundColor: COLORS.lightVariant,
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: styles.tabBarLabel,
          header: () => (
            <SearchBar
              style={styles.searchBarContainer}
              onRightButtonPress={() => {
                setIsLogoutDialogOpened(true);
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
                style={GlobalStyles.image_i1}
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
                style={GlobalStyles.image_i1}
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
