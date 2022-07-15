import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Box } from 'react-native-design-utility';

import {
  ListItemSeparator,
  LoadingIndicator,
  PodcastResultHeader,
  PodcastResultTile,
  ShowError,
} from '../../components';
import { SearchStackRouteParamList } from '../../navigators/types';
import { ChannelService } from '../../services';

type NavigationParams = RouteProp<SearchStackRouteParamList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const { searchData } = useRoute<NavigationParams>().params ?? {};
  const [audioClips, setAudioClips] = useState<[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  React.useEffect(() => {
    const loadChannelData = async () => {
      setIsLoading(true);
      const { data, success } = await ChannelService.getChannelAudioClips(
        searchData.id,
      );
      // console.log('searchData - ', searchData);
      // console.log('Audio Clips data - ', data);
      success ? setAudioClips(data) : setIsError(true);
      setIsLoading(false);
    };
    loadChannelData();
  }, [searchData]);

  return (
    <Box f={1} bg="white">
      <FlatList
        data={audioClips ?? []}
        keyExtractor={(item: any) => String(item.id)}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        ListHeaderComponent={
          <>
            <PodcastResultHeader searchData={searchData} />
            {isLoading && <LoadingIndicator />}
            {isError && <ShowError />}
          </>
        }
        renderItem={({ item, index }) => (
          <PodcastResultTile index={index} item={item} tracks={audioClips} />
        )}
      />
    </Box>
  );
};

export default PodcastDetailsScreen;
