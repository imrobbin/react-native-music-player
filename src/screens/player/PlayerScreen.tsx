import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Text, Box } from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

import ProgressSlider from '../../components/ProgressSlider';
import { theme } from '../../constants/theme';
import { usePlayerContext } from '../../contexts/PlayerContext';
import { MainStackRouteParamList } from '../../navigators/types';
import { makeHitSlop } from '../../constants';

const { width, height } = Dimensions.get('window');

type PlayerScreenProp = NativeStackNavigationProp<
  MainStackRouteParamList,
  'QueueScreen'
>;

const PlayerScreen = (): JSX.Element => {
  const playerContext = usePlayerContext();
  const navigation = useNavigation<PlayerScreenProp>();

  const track = playerContext.currentTrack;

  if (!track) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box f={1} bg="white">
        {/* Header with Title */}
        <Box h={60} px="sm" mb="xl" dir="row" align="center">
          <Box f={0.2} align="start">
            <TouchableOpacity
              onPress={navigation.goBack}
              hitSlop={makeHitSlop(20)}>
              <Icon name="chevron-down" size={30} color={theme.color.black} />
            </TouchableOpacity>
          </Box>
          <Box f={1} center>
            <Text bold size="sm">
              {track.album}
            </Text>
          </Box>
          <Box f={0.2} align="end">
            <TouchableOpacity
              onPress={() => navigation.navigate('QueueScreen')}
              hitSlop={makeHitSlop(20)}>
              <Icon name="list" size={30} color={theme.color.black} />
            </TouchableOpacity>
          </Box>
        </Box>

        {/* Banner Image */}
        <Box center style={styles.imgContainer} mb="xl">
          <FastImage source={{ uri: `${track.artwork}` }} style={styles.img} />
        </Box>

        <Box center mb="md" mt="md">
          <Text bold>{track.title}</Text>
          <Text color="grey" size="sm">
            {track.artist}
          </Text>
        </Box>

        {/* progress slider */}
        <Box>
          <ProgressSlider />
        </Box>

        {/* media controls */}
        <Box dir="row" align="center" justify="center">
          <Box>
            <TouchableOpacity onPress={() => playerContext.seekTo(-10)}>
              <Icon name="rotate-ccw" size={30} color={theme.color.blueLight} />
            </TouchableOpacity>
          </Box>
          <Box mx="md">
            {playerContext.isPaused ? (
              <TouchableOpacity onPress={() => playerContext.playPauseAudio()}>
                <Icon name="play" size={50} color={theme.color.blueLight} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => playerContext.pause()}>
                <Icon name="pause" size={50} color={theme.color.blueLight} />
              </TouchableOpacity>
            )}
          </Box>
          <Box>
            <TouchableOpacity onPress={() => playerContext.seekTo()}>
              <Icon name="rotate-cw" size={30} color={theme.color.blueLight} />
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
    // height: `${(((height * 3) / 5) * 100) / height}%`,
    // height is 50%
    height: `${((height / 2) * 100) / height}%`,
  },
  img: {
    width: width - theme.space.sm * 2,
    height: width - theme.space.sm * 2,
    borderRadius: 10,
  },
});

export default PlayerScreen;
