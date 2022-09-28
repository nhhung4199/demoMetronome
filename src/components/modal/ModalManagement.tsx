import React from 'react';
import {StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';
import RootSiblings from 'react-native-root-siblings';
var modalControl: any = [];
const modalManagement = () => {
  const modalIzeRef = React.createRef<any>();
  const show = (id, contentModal) => {
    const modal = modalControl.find(item => item.id === id);
    if (!modal) {
      let sibling: any = new RootSiblings(
        <Modalize ref={modalIzeRef}>{contentModal}</Modalize>,
        () => {
          console.log('------------------------');
          const newRef = {...modalIzeRef};
          sibling.id = id;
          sibling.ref = newRef;
          modalControl.push(sibling);
          modalIzeRef.current?.open();
          console.log('modalControl', modalControl);
        },
      );
    } else {
      modal.ref.current?.open();
    }
  };
  const destroySibling = () => {
    let lastSibling = modalControl.pop();
    lastSibling && lastSibling.destroy();
  };
  return {show, destroySibling};
};

export default modalManagement;

const styles = StyleSheet.create({});
