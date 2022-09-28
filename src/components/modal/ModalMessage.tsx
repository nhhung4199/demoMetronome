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
  button?: Normalize<Resource>;
  title?: Normalize<Resource>;
  submit?(): void;
  content: string;
}
const ModalMessage = (props, ref) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState<DataProps>();
  useEffect(() => {
    ref.current = {showModal};
  }, []);
  const showModal = params => {
    setData(params);
    setIsShowModal(true);
  };
  const submit = () => {
    setIsShowModal(false);
    data?.submit?.();
  };
  const dismiss = () => {
    setIsShowModal(false);
  };
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationOutTiming={100}
      onBackdropPress={dismiss}
      isVisible={isShowModal}
      style={styles.modalCenter}
      useNativeDriverForBackdrop={true}>
      <View style={styles.modal}>
        <View style={styles.modalll}>
          <StyledText
            customStyle={styles.txtContentModal1}
            i18nText={data?.title}
          />
          <StyledText
            customStyle={styles.txtContentModal2}
            originText={data?.content}
          />
        </View>

        <StyledButton
          title={data?.button || 'button.yes'}
          customStyle={styles.btnSubmitStyle}
          onPress={submit}
        />
      </View>
    </Modal>
  );
};
const styles = ScaledSheet.create({
  modalCenter: {
    justifyContent: 'center',
  },
  modalll: {
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
  },
  txtContentModal1: {
    marginTop: '12@vs',
    color: Themes.Light.COLORS.black,
    fontSize: '16@ms',
    marginBottom: '17@vs',
  },
  modal: {
    backgroundColor: Themes.Light.COLORS.black,
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
});
export default forwardRef(ModalMessage);
