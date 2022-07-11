import { StyleSheet } from 'react-native';
import React from 'react';
import { Box } from 'react-native-design-utility';

const ListItemSeparator = () => {
  return (
    <Box w="100%" px="sm" my="sm">
      <Box style={{ height: StyleSheet.hairlineWidth }} bg="greyLighter" />
    </Box>
  );
};

export default ListItemSeparator;
