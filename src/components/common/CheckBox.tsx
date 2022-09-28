import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import React, {useState} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
interface Props {
  checked?: string;
  onPress(value: any): void;
  listCheckBox: any;
  customStyle?: StyleProp<ViewStyle>;
}
const CheckBox = ({customStyle, checked, listCheckBox, onPress}: Props) => {
  const [selected, setSelected] = useState(checked);
  const onSelected = value => {
    setSelected(value.label);
    onPress(value);
  };
  return (
    <View style={customStyle}>
      {listCheckBox.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.box}
          onPress={() => onSelected(item)}>
          <View
            style={{
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor:
                selected === item?.label ? 'green' : 'transparent',
            }}
          />
          <StyledText i18nText={item?.label} customStyle={styles.labels} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CheckBox;

const styles = ScaledSheet.create({
  box: {
    marginBottom: '10@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labels: {
    marginLeft: '10@s',
  },
});
