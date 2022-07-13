import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Text } from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProgress } from 'react-native-track-player';

import { theme } from '../constants/theme';
import { usePlayerContext } from '../contexts/PlayerContext';
import LoadingIndicator from './LoadingIndicator';
import { MainStackRouteParamList } from '../navigators/types';

type MiniPlayerProp = NativeStackNavigationProp<
  MainStackRouteParamList,
  'Player'
>;

const MiniPlayer = (): JSX.Element => {
  const playerContext = usePlayerContext();
  const navigation = useNavigation<MiniPlayerProp>();
  const { duration, position } = useProgress();

  const [sliderWidth, setSliderWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    let currentPostionInPer = (position * 100) / duration;
    setSliderWidth(currentPostionInPer);
  }, [duration, position]);

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return <></>;
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Player')}>
      <Box h={65} bg="white" style={styles.playerTop}>
        <Box style={[styles.playerSlider, { width: `${sliderWidth}%` }]} />
        <Box dir="row" f={1} px="sm" align="center" justify="between">
          <Box
            h={40}
            w={40}
            bg="blueLight"
            radius={10}
            mr="sm"
            style={styles.imgBox}>
            {playerContext.currentTrack.artwork && (
              <Image
                source={{ uri: `${playerContext.currentTrack.artwork}` }}
                style={styles.img}
              />
            )}
          </Box>
          <Box f={1} mr="sm">
            <Text bold size="sm" numberOfLines={1}>
              {playerContext.currentTrack.title}
            </Text>
            <Text size="sm" color="greyLight" numberOfLines={1}>
              {playerContext.currentTrack.artist}
            </Text>
          </Box>
          <Box>
            {playerContext.isConnecting ? (
              <LoadingIndicator />
            ) : (
              <>
                {playerContext.isPaused ? (
                  <TouchableOpacity
                    onPress={() => playerContext.playPauseAudio()}>
                    <Icon name="play" size={30} color={theme.color.blueLight} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => playerContext.pause()}>
                    <Icon
                      name="pause"
                      size={30}
                      color={theme.color.blueLight}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          </Box>
        </Box>

        {/* <Box mb={4} align="center" style={styles.playerBottom}>
          <ProgressSlider />
        </Box> */}
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imgBox: { overflow: 'hidden' },
  img: { flex: 1, borderRadius: 10 },
  playerTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.color.blueLighter,
  },
  playerSlider: {
    position: 'absolute',
    top: -1,
    left: 0,
    right: 0,
    zIndex: 100,
    // width: '70%',
    borderTopWidth: StyleSheet.hairlineWidth * 5,
    borderTopColor: theme.color.blueLight,
  },
  playerBottom: {
    height: StyleSheet.hairlineWidth * 10,
  },
});

export default MiniPlayer;
