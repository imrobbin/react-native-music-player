import React from 'react';
import { Box, Text } from 'react-native-design-utility';

const SearchEmpty = () => {
  return (
    <Box f={1} center h={300}>
      <Text color="grey">No Podcasts, please search something...</Text>
    </Box>
  );
};

export default SearchEmpty;
