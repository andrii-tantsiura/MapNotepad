import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";

import { MAP_ICON, PIN_ICON } from "../../assets/icons";
import { ConfirmModal } from "../../components/modals";
import { SearchBar } from "../../components/sections";
import { AppColors, ImageStyles, textStyle_i3 } from "../../constants";
import { typographyStyleToTextStyle } from "../../helpers";
import { useAuth, usePins } from "../../hooks";
import { MapScreen, PinsScreen } from "../../screens/Home";
import { setPinsSearchQueryAction } from "../../store/redux/actions";
import { selectPinsSearch } from "../../store/redux/slices";
import { useAppDispatch } from "../../store/redux/store";
import styles from "./styles";
import { TabStackParamList } from "./types";

const Tabs = createBottomTabNavigator<TabStackParamList>();

const TabsStack: React.FC = () => {
  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const { fetchPins } = usePins();
  const { searchQuery } = useSelector(selectPinsSearch);
  const [pinsSearchQuery, setPinsSearchQuery] = useState<string | undefined>(
    searchQuery
  );

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLogoutDialogOpened, setIsLogoutDialogOpened] = useState(false);

  const pinsSearchQueryChangeHandler = (text: string) => {
    setPinsSearchQuery(text);
    dispatch(setPinsSearchQueryAction(text));
  };

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
          logout();
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
          tabBarStyle: {
            display: isSearchFocused ? "none" : "flex",
          },
          tabBarLabelStyle: typographyStyleToTextStyle(textStyle_i3),
          header: () => (
            <SearchBar
              style={styles.searchBarContainer}
              value={pinsSearchQuery}
              onFocusChange={setIsSearchFocused}
              onTextChange={pinsSearchQueryChangeHandler}
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
