import {Themes} from 'assets/themes';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Metrics, {isIos} from 'utilities/metric';
interface Props {
  state: any;
  descriptors: any;
  navigation: any;
}
const StyledTabBar = (props: Props) => {
  const {state, descriptors, navigation} = props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={styles.tabButton}>
            <FastImage
              tintColor={isFocused ? Themes.Light.COLORS.black : '#989aa2'}
              source={options?.icon}
              style={[styles.tabIcon]}
            />
            {isFocused ? (
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: Themes.Light.COLORS.black,
                  },
                ]}>
                {options?.title || ''}
              </Text>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  txtBadge: {
    fontSize: 10,
  },
  badge: {
    backgroundColor: 'red',
    position: 'absolute',
    width: 12,
    height: 12,
    top: -2,
    right: -2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingBottom: isIos ? Metrics.safeBottomPadding : 0,
    shadowColor: Themes.Light.COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  tabButton: {
    marginHorizontal: 5,
    paddingTop: 9,
    alignItems: 'center',
    flex: 1,
  },
  tabIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  tabLabel: {
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 3,
  },
});

export default StyledTabBar;
