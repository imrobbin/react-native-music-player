import React from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet } from 'react-native';
import { useProgress } from 'react-native-track-player';
import { Box, Text } from 'react-native-design-utility';

import { theme } from '../constants/theme';
import { humanDuration } from '../helpers';
import { usePlayerContext } from '../contexts/PlayerContext';

const ProgressSlider = () => {
  const { duration, position } = useProgress();
  const playerContext = usePlayerContext();

  const getTotalTime = (): string => {
    return String(humanDuration(duration - position));
  };
  const getCurrentTime = (): string => {
    return String(humanDuration(position));
  };
  return (
    <>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor={theme.color.blueLight}
        maximumTrackTintColor={`${theme.color.blueLightest}`}
        thumbTintColor={theme.color.blueLight}
        onSlidingComplete={(value: number) => {
          playerContext.goTo(value);
        }}
      />
      <Box px="sm" dir="row" align="center" justify="between">
        <Text color="grey" size="sm">
          {getCurrentTime()}
        </Text>
        <Text color="grey" size="sm">
          -{getTotalTime()}
        </Text>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  slider: { width: '100%' },
});

export default ProgressSlider;
