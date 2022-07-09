import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {Image, StyleSheet} from 'react-native';

// type SearchResultProps = {
//   urls: {logo_image: {original: string}};
//   title: string;
//   description: string;
// };

const SearchResultTile = ({item}: any): JSX.Element => {
  return (
    <Box h={90} dir="row" align="center" px="sm">
      <Box h={70} w={70} bg="blue" mr="sm" radius={10}>
        {item.urls.logo_image.original && (
          <Image
            source={{uri: item.urls.logo_image.original}}
            style={styles.img}
          />
        )}
      </Box>
      <Box f={1}>
        <Text bold>{item.title}</Text>
        <Text size="xs" color="grey" numberOfLines={1}>
          {item.description}
        </Text>
      </Box>
    </Box>
  );
};

export default SearchResultTile;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 10,
  },
});
