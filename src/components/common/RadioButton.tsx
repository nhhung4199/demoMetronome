import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  values?: string[];
  initialSelected?: string;
  row?: boolean;
  onSelected?(value: string): void;
  disabled?: boolean;
}

export const RadioButton = (props: Props) => {
  const {
    values = [],
    initialSelected = values[0],
    row = false,
    onSelected = () => {},
    disabled,
  } = props;
  const [x, setX] = useState(initialSelected);
  const onChangeSelected = value => {
    onSelected(value);
    setX(value);
  };
  return (
    <View style={[styles.container, {flexDirection: row ? 'row' : 'column'}]}>
      {values.map((item: any, index) => {
        return (
          <View key={index} style={styles.ratioFemale}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => !disabled && onChangeSelected(item)}>
              <View style={styles.btnRatio}>
                {item === x ? <View style={styles.ratioCircle} /> : null}
              </View>
              <StyledText i18nText={item} customStyle={styles.title} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  title: {
    fontSize: 13,
  },
  button: {
    paddingRight: 84,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratioFemale: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 15,
  },
  btnRatio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Themes.Light.COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  ratioCircle: {
    height: 16,
    width: 16,
    borderRadius: 12,
    backgroundColor: Themes.Light.COLORS.black,
  },
});
