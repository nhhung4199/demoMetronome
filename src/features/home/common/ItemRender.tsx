import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ItemRender = ({item}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        padding: 200,
        backgroundColor: 'grey',
        marginBottom: 1,
      }}>
      <Text>{item.jobResId}</Text>
    </View>
  );
};

export default React.memo(ItemRender);

const styles = StyleSheet.create({});
