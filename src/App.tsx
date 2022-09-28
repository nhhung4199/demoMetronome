import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'navigation/NavigationService';
import Navigation from 'navigation/sence/RootSence';
import React from 'react';
import './utilities/i18next';
import {RootSiblingParent, RootSiblingPortal} from 'react-native-root-siblings';

const App = () => {
  return (
    <RootSiblingParent>
      <NavigationContainer ref={navigationRef}>
        <Navigation />
      </NavigationContainer>
    </RootSiblingParent>
  );
};

export default App;
