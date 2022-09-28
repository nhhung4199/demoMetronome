import {Themes} from 'assets/themes';
import StyledButton from 'components/base/StyledButton';
import StyledText from 'components/base/StyledText';
import React, {forwardRef, useEffect, useState} from 'react';
import {Normalize} from 'react-i18next';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {ScaledSheet} from 'react-native-size-matters';
import {Resource} from 'utilities/i18next';
interface DataProps {
  labelButtonRight?: Normalize<Resource>;
  title?: Normalize<Resource>;
  submit?(): void;
}
const ModalConfirm = (props, ref) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState<DataProps>();
  useEffect(() => {
    ref.current = {showModal};
  }, []);
  const showModal = option => {
    setIsShowModal(true);
    setData(option);
  };
  const submit = () => {
    setIsShowModal(false);
    data?.submit?.();
    setData({});
  };
  const dismiss = () => {
    setIsShowModal(false);
    setData({});
  };
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationOutTiming={100}
      onBackdropPress={dismiss}
      isVisible={isShowModal}
      style={styles.modal}
      useNativeDriverForBackdrop={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <StyledText
            customStyle={styles.txtContentModal1}
            i18nText={data?.title}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <StyledButton
            title={'button.no'}
            customStyle={[styles.btnSubmitStyle, styles.buttonNo]}
            customStyleTitle={styles.white}
            onPress={dismiss}
          />
          <StyledButton
            title={
              data?.labelButtonRight ? data?.labelButtonRight : 'button.yes'
            }
            customStyle={styles.btnSubmitStyle}
            onPress={submit}
            customStyleTitle={styles.white}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = ScaledSheet.create({
  modal: {
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  txtContentModal2: {
    color: Themes.Light.COLORS.black,
    fontSize: '12@ms',
    textAlign: 'center',
    paddingHorizontal: '10@s',
    marginBottom: '15@vs',
  },
  btnSubmitStyle: {
    marginTop: '24@vs',
    flex: 1,
  },
  txtContentModal1: {
    marginTop: '12@vs',
    color: Themes.Light.COLORS.black,
    fontSize: '16@ms',
  },
  container: {
    backgroundColor: '#ffffff',
    paddingBottom: '30@vs',
    paddingTop: '40@vs',
    borderRadius: 5,
    paddingHorizontal: '20@s',
  },
  icon: {
    width: '82@ms',
    height: '87@ms',
  },
  iconClose: {
    width: '24@ms',
    height: '24@ms',
  },
  close: {
    position: 'absolute',
    top: -30,
    right: 0,
  },
  buttonNo: {
    marginRight: '15@s',
    backgroundColor: Themes.Light.COLORS.black,
  },
  white: {
    color: '#ffffff',
  },
});
export default forwardRef(ModalConfirm);
