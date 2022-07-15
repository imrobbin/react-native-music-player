import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';

import { theme } from '../../constants/theme';
import { ChannelService } from '../../services';
import {
  SearchEmpty,
  LoadingIndicator,
  SearchResultTile,
} from '../../components';

const SearchScreen = () => {
  const [term, setTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<[]>([]);

  const onSearch = async () => {
    setIsLoading(true);
    const { data, success } = await ChannelService.getSearchChannels(term);
    success ? setSearchResults(data) : setIsError(true);
    setIsLoading(false);
  };

  return (
    <Box f={1} bg="white">
      <Box h={50} w="100%" px="sm" my="sm">
        <Box
          dir="row"
          h={40}
          align="center"
          bg="greyLightest"
          radius={10}
          px="sm">
          <Box mr="sm">
            <Icon name="search" size={24} color={theme.color.greyDark} />
          </Box>
          <TextInput
            placeholder="Search Podcast"
            style={styles.input}
            selectionColor={theme.color.blueLight}
            placeholderTextColor={theme.color.greyLight}
            onChangeText={setTerm}
            value={term}
            onSubmitEditing={onSearch}
            autoCorrect={false}
          />
        </Box>
      </Box>

      {isError ? (
        <Box f={1} center>
          <Text color="red">Something went wrong, please try again later.</Text>
        </Box>
      ) : (
        <FlatList
          keyboardShouldPersistTaps="never"
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={<>{!isLoading && <SearchEmpty />}</>}
          ListHeaderComponent={<>{isLoading && <LoadingIndicator />}</>}
          data={searchResults ?? []}
          renderItem={({ item }) => <SearchResultTile item={item} />}
          keyExtractor={(item: any) => String(item.id)}
        />
      )}
    </Box>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: theme.text.size.sm,
    color: theme.color.black,
  },
  listContentContainer: {
    paddingBottom: 45,
  },
});
