import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../constants/theme';

import { usePlayerContext } from '../contexts/PlayerContext';

const MiniPlayer = (): JSX.Element => {
  const playerContext = usePlayerContext();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return <></>;
  }

  return (
    <Box h={75} bg="white" px="sm" style={styles.playerTop}>
      <Box dir="row" f={1} align="center" justify="between">
        <Box
          h={50}
          w={50}
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
          <Text numberOfLines={1}>{playerContext.currentTrack.title}</Text>
        </Box>
        <Box>
          {playerContext.isPaused ? (
            <TouchableOpacity onPress={() => playerContext.playPauseAudio()}>
              <Icon name="play" size={30} color={theme.color.blueLight} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => playerContext.pause()}>
              <Icon name="pause" size={30} color={theme.color.blueLight} />
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  imgBox: { overflow: 'hidden' },
  img: { flex: 1, borderRadius: 10 },
  playerTop: {
    borderTopWidth: 1,
    borderTopColor: theme.color.greyLightest,
  },
});

export default MiniPlayer;
