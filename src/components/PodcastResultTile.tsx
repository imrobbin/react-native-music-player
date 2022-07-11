import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../constants/theme';

const PodcastResultTile = ({ item }: any): JSX.Element => {
  return (
    <Box px="sm">
      <Box dir="row">
        <Box w={50} h={50} radius={10} bg="blueLight" mr="sm">
          {/* {item.urls.image && (
            <Image source={{ uri: item.urls.image }} style={styles.img} />
          )} */}
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
        <TouchableOpacity>
          <Icon name="play-circle" size={40} color={theme.color.blueLight} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="pause-circle" size={40} color={theme.color.blueLight} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 10,
  },
});
export default PodcastResultTile;
