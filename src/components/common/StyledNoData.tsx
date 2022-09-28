import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const NO_DATA_TEXT = 'Không có dữ liệu';
const LOGIN = 'Đăng nhập';

const StyledNoData = props => {
  return (
    <View style={[styles.container, props.customStyle]}>
      {props.loading ? (
        <View style={{alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <StyledText
          originText={props.text || NO_DATA_TEXT}
          customStyle={props.customStyleText}
        />
      )}
      {!!props.canRefresh && !props.loading ? (
        <TouchableOpacity
          onPress={props.onPressEmptyData}
          style={styles.buttonNoData}>
          <StyledText originText={LOGIN} customStyle={styles.textReload} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNoData: {
    backgroundColor: Themes.Light.COLORS.black,
    borderRadius: 20,
    marginVertical: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
    color: Themes.Light.COLORS.black,
    textAlign: 'center',
  },
  textReload: {
    margin: 10,
    color: Themes.Light.COLORS.black,
  },
});

export default StyledNoData;
