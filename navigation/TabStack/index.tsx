import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image } from "react-native";

import { MAP_ICON, PIN_ICON } from "../../assets/icons";
import { ConfirmModal } from "../../components/modals";
import { SearchBar } from "../../components/sections";
import { AppColors, ImageStyles, textStyle_i3 } from "../../constants";
import { typographyStyleToTextStyle } from "../../helpers";
import { useAuth, usePins } from "../../hooks";
import { MapScreen, PinsScreen } from "../../screens/Home";
import { HomeScreenNavigationProp } from "../HomeStack/types";
import styles from "./styles";
import { TabStackParamList } from "./types";

const Tabs = createBottomTabNavigator<TabStackParamList>();

const TabsStack: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { signOut } = useAuth();
  const { fetchPins } = usePins();
  const [isLogoutDialogOpened, setIsLogoutDialogOpened] = useState(false);

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <>
      <ConfirmModal
        title="Log Out"
        description="Are you sure you want to logout?"
        confirmText="Log Out"
        visible={isLogoutDialogOpened}
        onConfirm={() => {
          setIsLogoutDialogOpened(false);
          signOut();
        }}
        onCancel={() => {
          setIsLogoutDialogOpened(false);
        }}
      />

      <Tabs.Navigator
        initialRouteName="Map"
        screenOptions={{
          tabBarActiveBackgroundColor: AppColors.lightVariant,
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: typographyStyleToTextStyle(textStyle_i3),
          header: () => (
            <SearchBar
              style={styles.searchBarContainer}
              onLeftButtonPress={() => navigation.navigate("Settings")}
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
              <Image style={ImageStyles.i1} source={MAP_ICON} />
            ),
          }}
        />

        <Tabs.Screen
          name="Pins"
          component={PinsScreen}
          options={{
            tabBarIcon: () => (
              <Image style={ImageStyles.i1} source={PIN_ICON} />
            ),
          }}
        />
      </Tabs.Navigator>
    </>
  );
};

export default TabsStack;
