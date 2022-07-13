import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, Box } from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import ProgressSlider from '../../components/ProgressSlider';

import { theme } from '../../constants/theme';
import { usePlayerContext } from '../../contexts/PlayerContext';

const { width, height } = Dimensions.get('window');

const PlayerScreen = (): JSX.Element => {
  const playerContext = usePlayerContext();
  const navigation = useNavigation();

  const track = playerContext.currentTrack;

  if (!track) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box f={1} bg="white" pt="md">
        {/* Header with Title */}
        <Box px="md" mb={theme.space.xl} dir="row">
          <Box f={0.2}>
            <TouchableOpacity
              onPress={navigation.goBack}
              hitSlop={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}>
              <Icon
                name="chevron-down"
                size={30}
                color={theme.color.blueLight}
              />
            </TouchableOpacity>
          </Box>
          <Box f={1} center>
            <Text bold size="sm">
              {track.album}
            </Text>
          </Box>
          <Box f={0.2} />
        </Box>

        {/* Banner Image */}
        <Box center style={styles.imgContainer}>
          <Image source={{ uri: `${track.artwork}` }} style={styles.img} />
        </Box>

        <Box center mb="md" px="md">
          <Text bold>{track.title}</Text>
          <Text color="grey" size="sm">
            {track.artist}
          </Text>
        </Box>

        <Box px="xs">
          <ProgressSlider />
        </Box>

        <Box dir="row" align="center" justify="center">
          <Box>
            <TouchableOpacity onPress={() => playerContext.seekTo(-10)}>
              <Icon name="rotate-ccw" size={40} color={theme.color.blueLight} />
            </TouchableOpacity>
          </Box>
          <Box mx="md">
            {playerContext.isPaused ? (
              <TouchableOpacity onPress={() => playerContext.playPauseAudio()}>
                <Icon name="play" size={60} color={theme.color.blueLight} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => playerContext.pause()}>
                <Icon name="pause" size={60} color={theme.color.blueLight} />
              </TouchableOpacity>
            )}
          </Box>
          <Box>
            <TouchableOpacity onPress={() => playerContext.seekTo()}>
              <Icon name="rotate-cw" size={40} color={theme.color.blueLight} />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgContainer: {
    // height is 60%
    height: `${(((height * 3) / 5) * 100) / height}%`,
  },
  img: {
    width: width - theme.space.md * 2,
    height: width - theme.space.md * 2,
    borderRadius: 10,
  },
});

export default PlayerScreen;
