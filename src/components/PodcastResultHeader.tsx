import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import FastImage from 'react-native-fast-image';

const PodcastResultHeader = ({ searchData }: any): JSX.Element => {
  return (
    <>
      <Box dir="row" px="sm" my="sm">
        {searchData.urls.logo_image.original && (
          <Box w={150} h={150} radius={10} mr="sm" bg="blueLight">
            <FastImage
              source={{ uri: searchData.urls.logo_image.original }}
              style={styles.img}
            />
          </Box>
        )}
        <Box f={1} justify="center">
          <Text size="xl" bold>
            {searchData.title}
          </Text>
          <Text size="xs" color="blueLight">
            Follow
          </Text>
        </Box>
      </Box>

      <Box px="sm">
        <Text>{searchData.description}</Text>
        <Text bold size="md" my="md">
          All Episodes
        </Text>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  img: { flex: 1, borderRadius: 10 },
});

export default PodcastResultHeader;
