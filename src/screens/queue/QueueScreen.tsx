import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text, Box } from 'react-native-design-utility';
import TrackPlayer, { Track } from 'react-native-track-player';
import FastImage from 'react-native-fast-image';

import { makeHitSlop } from '../../constants';

const QueueScreen = (): JSX.Element => {
  const navigation = useNavigation();

  const [queue, setQueue] = React.useState<Track[]>([]);

  const getQueue = async () => {
    const tracks = await TrackPlayer.getQueue();
    setQueue(tracks);
  };

  useFocusEffect(
    React.useCallback(() => {
      getQueue();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box f={1} bg="white">
        {/* header with title */}
        <Box h={60} px="sm" mb="lg" dir="row" align="center">
          <Box f={0.2}>
            <TouchableOpacity
              onPress={navigation.goBack}
              hitSlop={makeHitSlop(20)}>
              <Text>Done</Text>
            </TouchableOpacity>
          </Box>
          <Box f={1} center>
            <Text bold center>
              Up Next
            </Text>
          </Box>
          <Box f={0.2} />
        </Box>

        {/* scrollview for queue tracks */}
        <ScrollView>
          {queue.map((track: Track) => (
            <Box h={90} px="sm" dir="row" key={track.id}>
              <Box h={70} w={70} radius={10} bg="blueLight" mr="sm">
                <FastImage
                  source={{ uri: `${track.artwork}` }}
                  style={styles.img}
                />
              </Box>
              <Box f={1}>
                <Text numberOfLines={2} bold>
                  {track.title}
                </Text>
                <Text numberOfLines={1} size="sm" color="grey">
                  {track.artist}
                </Text>
              </Box>
            </Box>
          ))}
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default QueueScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  img: { flex: 1, borderRadius: 10 },
});
