import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, Box } from 'react-native-design-utility';

import {
  LoadingIndicator,
  SearchEmpty,
  SearchResultTile,
} from '../../components';
import { ChannelService } from '../../services';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [recommendedChannels, setRecommendedChannels] = React.useState<[]>([]);

  React.useEffect(() => {
    const loadRecommendedChannel = async () => {
      setIsLoading(true);
      const { data, success } = await ChannelService.getRecommendedChannels();
      success ? setRecommendedChannels(data) : setIsError(true);
      setIsLoading(false);
    };
    loadRecommendedChannel();
  }, []);

  return (
    <Box f={1} bg="white">
      {isError ? (
        <Box f={1} center>
          <Text color="red">Something went wrong, please try again later.</Text>
        </Box>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={<>{!isLoading && <SearchEmpty />}</>}
          ListHeaderComponent={<>{isLoading && <LoadingIndicator />}</>}
          data={recommendedChannels ?? []}
          renderItem={({ item }) => <SearchResultTile item={item} />}
          keyExtractor={(item: any, index: number) => String(item.id + index)}
        />
      )}
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  listContentContainer: {
    paddingBottom: 45,
  },
});
