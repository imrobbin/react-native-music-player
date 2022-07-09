import React, {useState} from 'react';
import {FlatList, StyleSheet, TextInput} from 'react-native';
import {Box, Text} from 'react-native-design-utility';

import {theme} from '../../constants/theme';
import {ChannelService} from '../../services';
import {SearchEmpty, SearchLoading, SearchResultTile} from '../../components';

const SearchScreen = () => {
  const [term, setTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<[]>([]);

  const onSearch = async () => {
    setIsLoading(true);
    const {data, success} = await ChannelService.SearchChannels(term);
    success ? setSearchResults(data) : setIsError(true);
    setIsLoading(false);
  };

  return (
    <Box f={1} bg="white">
      <Box h={50} w="100%" px="sm" mt="sm" my="sm">
        <TextInput
          placeholder="Search podcast"
          style={styles.input}
          selectionColor={theme.color.blueLight}
          placeholderTextColor={theme.color.greyLight}
          onChangeText={setTerm}
          value={term}
          onSubmitEditing={onSearch}
          autoCorrect={false}
        />
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
          ListHeaderComponent={<>{isLoading && <SearchLoading />}</>}
          data={searchResults ?? []}
          renderItem={({item}) => <SearchResultTile item={item} />}
          keyExtractor={(item: any) => String(item.id)}
        />
      )}
    </Box>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    flex: 1,
    backgroundColor: theme.color.greyLightest,
    borderRadius: 10,
    paddingHorizontal: theme.space.sm,
    fontSize: theme.text.size.md,
    color: theme.color.black,
  },
  listContentContainer: {
    paddingBottom: 45,
  },
});
