import i18n from 'i18next';
import {Alert} from 'react-native';

const CustomAlertMessage = (
  content?: string,
  okOnPress = () => {},
  OKButtonTitle?: string,
  isOnlyCloseModal = false,
) => {
  if (isOnlyCloseModal) {
    Alert.alert(i18n.t('message.txtNotification'), content, [
      {
        text: i18n.t('button.ok'),
        onPress: okOnPress,
      },
    ]);
  } else {
    Alert.alert(i18n.t('message.txtNotification'), content, [
      {
        text: i18n.t('button.txtCancel'),
      },

      {
        text: OKButtonTitle || i18n.t('button.ok'),
        onPress: okOnPress,
      },
    ]);
  }
};

export default CustomAlertMessage;
