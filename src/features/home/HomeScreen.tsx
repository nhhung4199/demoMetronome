import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, PanResponder, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('screen');
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const defaultTime = 3000;
const SIZE = width * 0.9;
const SizeBox = 20;
const HomeScreen = () => {
  const [time, setTime] = useState(defaultTime);
  const rotate = useSharedValue(-50);
  const [pause, setPause] = useState(0);
  const [y, setY] = useState(height / 4 - SizeBox);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotate.value}deg`}],
    };
  });
  const hello = new Sound(
    'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
    '',
    error => {
      if (error) {
        console.log(error);
      }
    },
  );

  useEffect(() => {
    rotate.value = withTiming(-50, {duration: 100});
    rotate.value = withDelay(
      pause,
      withRepeat(withTiming(50, {duration: time}), -1, true),
    );
  }, [pause, time]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (e, gestureState) => {
        console.log(Number(gestureState.vy * 10));
        if (gestureState.vy > 0) {
          setY(y =>
            y - Number(gestureState.vy * 10) > 0
              ? y - Number(gestureState.vy * 10)
              : 0,
          );
        } else {
          setY(y =>
            y - Number(gestureState.vy * 10) > height / 4 - SizeBox
              ? height / 4 - SizeBox
              : y - Number(gestureState.vy * 10),
          );
        }
      },
      onPanResponderRelease: () => {},
    }),
  ).current;
  useEffect(() => {
    let value = y > 1 ? y : 1;
    setTime((value / (height / 4 - SizeBox)) * 1 * defaultTime);
  }, [y]);
  const onTouchStart = () => {
    setPause(999999);
  };
  const onTouchEnd = () => {
    setPause(0);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.mover, reanimatedStyle]}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}>
        <View style={[styles.hours]}>
          <View style={[styles.box, {bottom: y}]} />
        </View>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mover: {
    width: SIZE,
    height: '50%',
    position: 'absolute',
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hours: {
    position: 'relative',
    height: '50%',
    width: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 20,
  },
  box: {
    position: 'absolute',
    height: SizeBox,
    width: SizeBox,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
