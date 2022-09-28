import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {Normalize} from 'react-i18next';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Resource} from 'utilities/i18next';
import {Themes} from '../../assets/themes';
import StyledText from '../base/StyledText';
interface StyledTextInputFormProps {
  control?: any;
  name?: string;
  labelTx?: Normalize<Resource>;
}
export const StyledTextInputForm = React.memo(
  (props: StyledTextInputFormProps) => {
    const {control, name} = props;
    if (!control && !name) {
      return <StyledText originText={props?.labelTx} />;
    }
    return <ControlledTextField {...props} />;
  },
);

/**
 * A component which has a label and an input together.
 */
const ControlledTextField = props => {
  const {
    name,
    placeholderTx,
    labelTx,
    leftIcon,
    preset = 'default',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    isPassword,
    defaultValue,
    control,
    rules,
    multiline,
    rightIcon,
    onPressRight = () => {},
    customStyle,
    unRequired,
    editable = true,
    customStyleLabels,
    customStyleInput,
    success,
    ...rest
  } = props;

  const [showSecure, setShowSecure] = useState(isPassword);

  const {field, fieldState} = useController({
    name,
    rules,
    defaultValue,
    control,
  });

  const toggleSecure = () => {
    setShowSecure(showSecure => !showSecure);
  };
  return (
    <View style={[styles.container, customStyle]}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <StyledText i18nText={labelTx} customStyle={customStyleLabels} />
          {!unRequired && (
            <Text style={{color: Themes.Light.COLORS.black}}> *</Text>
          )}
        </View>
        <Pressable
          style={[
            styles.containerStyles,
            fieldState?.error
              ? {borderColor: Themes.Light.COLORS.black}
              : success && {borderColor: Themes.Light.COLORS.black},
          ]}
          onPress={() => {
            if (!editable) {
              onPressRight();
            }
          }}>
          {leftIcon}

          <TextInput
            pointerEvents={!editable && onPressRight ? 'none' : undefined}
            placeholder={placeholderTx}
            placeholderTextColor={Themes.Light.COLORS.black}
            // underlineColorAndroid={'transparent'}
            secureTextEntry={showSecure}
            style={[styles.inputStyles, customStyleInput]}
            ref={forwardedRef}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            multiline={multiline}
            editable={editable}
            {...rest}
          />

          {rightIcon && (
            <TouchableOpacity onPress={onPressRight} style={{padding: 10}}>
              <Image source={rightIcon} />
            </TouchableOpacity>
          )}
          {/* {isPassword && (
            <TouchableOpacity onPress={toggleSecure} style={{padding: 10}}>
              {showSecure ? (
                <Image source={Images.ic_show_pass} />
              ) : (
                <Image source={Images.ic_hide_pass} />
              )}
            </TouchableOpacity>
          )} */}
        </Pressable>
      </View>
      {fieldState?.error && (
        <StyledText
          i18nText={fieldState?.error.message}
          customStyle={styles.txtError}
        />
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    marginBottom: '20@vs',
  },
  txtError: {
    color: Themes.Light.COLORS.black,
    paddingTop: '10@vs',
  },
  containerStyles: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: '15@s',
    borderRadius: '15@ms',
    borderColor: Themes.Light.COLORS.black,
    zIndex: -1,
  },
  inputStyles: {
    paddingVertical: '13@vs',
    flex: 1,
    color: Themes.Light.COLORS.black,
  },
});
