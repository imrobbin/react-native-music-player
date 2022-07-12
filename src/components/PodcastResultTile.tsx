import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../constants/theme';
import { usePlayerContext } from '../contexts/PlayerContext';

const PodcastResultTile = ({ item }: any): JSX.Element => {
  const playerContext = usePlayerContext();
  return (
    <Box px="sm">
      <Box dir="row">
        <Box
          w={50}
          h={50}
          radius={10}
          bg="blueLight"
          mr="sm"
          style={styles.imgBox}>
          {item.urls.image && (
            <Image source={{ uri: item.urls.image }} style={styles.img} />
          )}
        </Box>
        <Box justify="center" f={1}>
          <Text size="sm" bold numberOfLines={2}>
            Episode {item.episode_number}: {item.title}
          </Text>
        </Box>
      </Box>

      <Box mt="sm">
        <Text numberOfLines={2} color="grey" size="sm">
          {item.description}
        </Text>
      </Box>
      <Box dir="row" mt="sm" align="center" justify="between">
        <Text color="grey" size="sm">
          Publish Date
        </Text>
        {playerContext.currentTrack !== null &&
        playerContext.currentTrack.id === item.id ? (
          <TouchableOpacity onPress={() => playerContext.playPauseAudio()}>
            <Icon
              name={playerContext.isPaused ? 'play-circle' : 'pause-circle'}
              size={40}
              color={theme.color.blueLight}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              playerContext.play({
                id: item.id,
                url: item.urls.high_mp3,
                title: `${item.episode_number} : ${item.title}`,
                artwork: item.urls.image,
              });
            }}>
            <Icon name="play-circle" size={40} color={theme.color.blueLight} />
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  imgBox: { overflow: 'hidden' },
  img: {
    flex: 1,
    borderRadius: 10,
  },
});
export default PodcastResultTile;
