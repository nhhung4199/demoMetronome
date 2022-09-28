import React from 'react';
import {Normalize} from 'react-i18next';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Resource} from 'utilities/i18next';
import StyledText from './StyledText';
interface StyledTextProps {
  title: Normalize<Resource>;
  onPress(): void;
  customStyle?: StyleProp<ViewStyle>;
  customStyleTitle?: StyleProp<TextStyle>;
  disable?: boolean;
  loading?: boolean;
}
const StyledButton = ({
  title,
  onPress,
  customStyle,
  disable,
  customStyleTitle,
  loading,
}: StyledTextProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, customStyle]}
      disabled={disable}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <StyledText
          i18nText={title}
          customStyle={[styles.title, customStyleTitle]}
        />
      )}
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  title: {},
});
