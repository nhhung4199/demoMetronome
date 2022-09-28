import {Themes} from 'assets/themes';
import * as React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

const StyledIndicator = props => {
  return (
    <ActivityIndicator
      color={Themes.Light.COLORS.black}
      size={'small'}
      style={styles.container}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StyledIndicator;
