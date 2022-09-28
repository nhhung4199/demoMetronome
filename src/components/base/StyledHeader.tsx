import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Normalize} from 'react-i18next';
import {Resource} from 'utilities/i18next';
import StyledText from './StyledText';
interface StyledHeaderProps {
  iconLeft?: any;
  iconRight?: any;
  title: Normalize<Resource>;
  onPressLeft?(): void;
  onPressRight?(): void;
  customStyle?: StyleProp<ViewStyle>;
  customStyleTitle?: StyleProp<TextStyle>;
}
const StyledHeader = ({
  iconLeft,
  iconRight,
  title,
  onPressLeft,
  onPressRight,
  customStyleTitle,
  customStyle,
}: StyledHeaderProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      <TouchableOpacity onPress={onPressLeft}>{iconLeft}</TouchableOpacity>
      <StyledText i18nText={title} customStyle={customStyleTitle} />
      <TouchableOpacity onPress={onPressRight}>{iconRight}</TouchableOpacity>
    </View>
  );
};

export default StyledHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
