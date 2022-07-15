import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

import { theme } from '../constants/theme';
import { usePlayerContext } from '../contexts/PlayerContext';
import { humanDuration } from '../helpers';
import getDateTime from '../helpers/dateTime';

const PodcastResultTile = ({ index, item, tracks }: any): JSX.Element => {
  const playerContext = usePlayerContext();
  const currentTrack = playerContext.currentTrack;

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
          {item.artwork && (
            <FastImage source={{ uri: item.artwork }} style={styles.img} />
          )}
        </Box>
        <Box justify="center" f={1}>
          <Text
            size="sm"
            bold
            numberOfLines={2}
            style={
              currentTrack !== null && currentTrack.id === item.id
                ? styles.selectedTrack
                : null
            }>
            {item.title}
          </Text>
        </Box>
      </Box>

      {item.description && (
        <Box mt="sm">
          <Text numberOfLines={2} color="grey" size="sm">
            {item.description}
          </Text>
        </Box>
      )}

      <Box dir="row" mt="sm" align="center" justify="between">
        <Box>
          <Text color="grey" size="sm">
            {getDateTime(item.date)} &bull; {humanDuration(item.duration)}
          </Text>
        </Box>

        <Box>
          {currentTrack !== null && currentTrack.id === item.id ? (
            <TouchableOpacity onPress={() => playerContext.playPauseAudio()}>
              <Icon
                name={playerContext.isReady ? 'play-circle' : 'pause-circle'}
                size={30}
                color={theme.color.blueLight}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                playerContext.play(index, tracks);
              }}>
              {/* {
                  id: item.id,
                  url: item.urls.high_mp3,
                  title: item.title,
                  artwork: item.urls.image,
                  artist: item.user.username,
                  album: item.channel.title,
                } */}
              <Icon
                name="play-circle"
                size={30}
                color={theme.color.greyLight}
              />
            </TouchableOpacity>
          )}
        </Box>
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
  selectedTrack: {
    color: theme.color.blueLight,
  },
});
export default PodcastResultTile;
