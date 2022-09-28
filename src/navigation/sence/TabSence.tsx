import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Images from 'assets';
import navigationConfigs from 'navigation/config/options';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TAB_NAVIGATION_ROOT} from '../../navigation/config/routes';
import StyledTabBar from '../StyledTabBar';
import HomeStack from './HomeStack';

const MainTab = createBottomTabNavigator();

const MainTabContainer = () => {
  const {t} = useTranslation();
  const ArrayTabs = [
    {
      name: TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT,
      title: t('bottomTab.home'),
      component: HomeStack,
      icon: 'Images.ic_tab_home',
    },
  ];
  return (
    <MainTab.Navigator
      backBehavior="order"
      screenOptions={navigationConfigs}
      initialRouteName={TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT}
      tabBar={props => <StyledTabBar {...props} />}>
      {ArrayTabs.map((item, index) => (
        <MainTab.Screen
          key={`${index}`}
          options={({navigation}) => {
            const {routes} = navigation.getState();
            const {state} = routes[index];
            if (state) {
              if (state.index !== 0) {
                return {
                  title: item.title,
                  icon: item.icon,
                  tabBarVisible: false,
                };
              }
            }
            return {
              title: item.title,
              icon: item.icon,
              tabBarVisible: true,
            };
          }}
          {...item}
        />
      ))}
    </MainTab.Navigator>
  );
};

export default MainTabContainer;
