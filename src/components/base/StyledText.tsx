import {Themes} from 'assets/themes';
import i18next from 'i18next';
import * as React from 'react';
import {memo} from 'react';
import {Normalize, useTranslation} from 'react-i18next';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Resource} from 'utilities/i18next';

interface StyledTextProps extends TextProps {
  customStyle?: StyleProp<TextStyle> | any;
  i18nParams?: any;
  gradient?: any;
}

interface StyledTextWithOriginValue extends StyledTextProps {
  originText?: string;
  i18nText?: Normalize<Resource> | any;
}

interface StyledTextWithI18nValue extends StyledTextProps {
  originText?: never;
  i18nText?: Normalize<Resource> | any;
}

type StyledTextCombineProps =
  | StyledTextWithOriginValue
  | StyledTextWithI18nValue;

const StyledText = (props: StyledTextCombineProps) => {
  const {t} = useTranslation();
  const {originText, i18nText, i18nParams, customStyle} = props;
  let value;

  if (originText) {
    value = originText;
  } else if (i18nText || i18next.exists(i18nText || '', i18nParams)) {
    value = t(i18nText as Normalize<Resource>, i18nParams);
  } else {
    value = i18nText || '';
  }

  return (
    <Text style={[styles.txtDefault, customStyle]} {...props}>
      {value}
    </Text>
  );
};

const styles = ScaledSheet.create({
  txtDefault: {
    color: Themes.Light.COLORS.black,
    fontSize: 14,
  },
});

export default memo(StyledText);
