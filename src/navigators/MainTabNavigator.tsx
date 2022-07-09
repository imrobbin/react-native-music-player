import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import LibraryScreen from '../screens/library/LibraryScreen';
import SearchScreen from '../screens/search/SearchScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{title: 'Home'}}
        name="Home Stack"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};

const SearchStack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        options={{title: 'Search'}}
        name="Search Stack"
        component={SearchScreen}
      />
    </SearchStack.Navigator>
  );
};

const LibraryStack = createNativeStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        options={{title: 'Library'}}
        name="Library Stack"
        component={LibraryScreen}
      />
    </LibraryStack.Navigator>
  );
};

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator screenOptions={{headerShown: false}}>
      <MainTab.Screen name="Home" component={HomeStackNavigator} />
      <MainTab.Screen name="Library" component={LibraryStackNavigator} />
      <MainTab.Screen name="Search" component={SearchStackNavigator} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
