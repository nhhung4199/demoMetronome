/*
 * platform/application wide metrics for proper styling
 */
import {Dimensions, Platform} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

const {width, height} = Dimensions.get('screen');

const safeTopPadding = isIos ? initialWindowMetrics?.insets.top : 20;
const safeBottomPadding = isIos
  ? initialWindowMetrics?.insets.bottom === 0
    ? 10
    : initialWindowMetrics?.insets.bottom
  : 20;

const Metrics = {
  navBarHeight: isIos ? 54 : 66,
  screenHeight: width < height ? height : width,
  screenWidth: width < height ? width : height,
  safeBottomPadding,
  safeTopPadding,
};

export default Metrics;
