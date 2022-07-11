import React from 'react';
import { Box, Text } from 'react-native-design-utility';

const ShowError = () => {
  return (
    <Box f={1} mx="sm">
      <Text color="grey">
        Unable to get episodes, please try again later...
      </Text>
    </Box>
  );
};

export default ShowError;
