import React from 'react';
import {FlatList, StyleSheet, TextInput} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {theme} from '../../constants/theme';

const SearchScreen = () => {
  return (
    <Box f={1} bg="white">
      <Box h={50} w="100%" px="sm" mt="sm" my="sm">
        <TextInput
          placeholder="search podcast"
          style={styles.input}
          selectionColor={theme.color.blueLight}
        />
      </Box>
      <FlatList
        style={styles.list}
        data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}
        renderItem={() => (
          <Box h={90} dir="row" align="center" px="sm">
            <Box h={70} w={70} bg="blue" mr="sm" radius={10} />
            <Box>
              <Text bold>Ravindra Patle</Text>
              <Text size="xs" color="grey">
                This is sme title
              </Text>
              <Text size="xs" color="blueLight">
                400 episode
              </Text>
            </Box>
          </Box>
        )}
        keyExtractor={(item: any) => String(item.id)}
      />
    </Box>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    flex: 1,
    backgroundColor: theme.color.greyLighter,
    borderRadius: 10,
    paddingHorizontal: theme.space.sm,
    fontSize: theme.text.size.md,
  },
  list: {minHeight: '100%'},
});
