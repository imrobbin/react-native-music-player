import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchStackRouteParamList } from '../navigators/types';

// type SearchResultProps = {
//   urls: {logo_image: {original: string}};
//   title: string;
//   description: string;
// };

type SearchResultTileProp = NativeStackNavigationProp<
  SearchStackRouteParamList,
  'Search'
>;

const SearchResultTile = ({ item }: any): JSX.Element => {
  const navigation = useNavigation<SearchResultTileProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PodcastDetails', { searchData: item })
      }>
      <Box h={90} dir="row" align="center" px="sm">
        <Box h={70} w={70} bg="blue" mr="sm" radius={10}>
          {item.urls.logo_image.original && (
            <Image
              source={{ uri: item.urls.logo_image.original }}
              style={styles.img}
            />
          )}
        </Box>
        <Box f={1}>
          <Text bold>{item.title}</Text>
          <Text size="xs" color="grey" numberOfLines={1} capitalize>
            {item.channel_style}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 10,
  },
});
export default SearchResultTile;
