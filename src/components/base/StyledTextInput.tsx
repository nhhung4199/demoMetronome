import React from 'react';
import {
  Image,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {ScaledSheet} from 'react-native-size-matters';
import {Themes} from '../../assets/themes';
interface StyledInputProps {
  iconLeft?: any;
  iconRight?: any;
  onPressRight?(): void;
  value?: string;
  onChangeText(): void;
  customStyle?: StyleProp<ViewStyle>;
  customStyleInput?: StyleProp<TextStyle>;
}
const StyledTextInput = (props: StyledInputProps) => {
  const {
    iconLeft,
    iconRight,
    onPressRight = () => {},
    value,
    onChangeText,
    customStyle,
    customStyleInput,
  } = props;
  return (
    <View style={[styles.container, customStyle]}>
      {iconLeft && <Image source={iconLeft} />}
      <TextInput
        style={[styles.input, customStyleInput]}
        value={value}
        {...props}
        onChangeText={onChangeText}
        placeholderTextColor={Themes.Light.COLORS.black}
      />
      {iconRight && (
        <TouchableOpacity onPress={onPressRight}>
          <Image source={iconRight} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StyledTextInput;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: '10@s',
    borderRadius: '15@ms',
    borderColor: Themes.Light.COLORS.black,
    alignItems: 'center',
    marginBottom: '20@vs',
  },
  input: {
    paddingVertical: '15@vs',
    flex: 1,
    color: Themes.Light.COLORS.black,
    paddingHorizontal: '10@s',
  },
});
