import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from 'features/home/HomeScreen';
import React from 'react';
import navigationConfigs from '../config/options';
import {TAB_NAVIGATION_ROOT} from '../config/routes';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationConfigs}>
      <Stack.Screen
        name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_SCREEN}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
