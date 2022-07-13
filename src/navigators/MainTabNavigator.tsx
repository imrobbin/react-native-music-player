import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import {
  HomeScreen,
  LibraryScreen,
  SearchScreen,
  PodcastDetailsScreen,
} from '../screens';
import { theme } from '../constants/theme';
import { SearchStackRouteParamList } from './types';
import { MiniPlayer } from '../components';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ title: 'Home' }}
        name="HomeScreen"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};

const SearchStack = createNativeStackNavigator<SearchStackRouteParamList>();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        options={{ headerTitle: 'Search' }}
        name="Search"
        component={SearchScreen}
      />
      <SearchStack.Screen
        options={{ headerTitle: '', headerTintColor: theme.color.blueLight }}
        name="PodcastDetails"
        component={PodcastDetailsScreen}
      />
    </SearchStack.Navigator>
  );
};

const LibraryStack = createNativeStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        options={{ title: 'Library' }}
        name="LibraryScreen"
        component={LibraryScreen}
      />
    </LibraryStack.Navigator>
  );
};

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBar={tabsProps => (
        <>
          <MiniPlayer />
          <BottomTabBar {...tabsProps} />
        </>
      )}
      screenOptions={{
        headerShown: false,
        // tabBarStyle: { borderTopWidth: 0, elevation: 0 },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.color.blueLight,
      }}>
      <MainTab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
        name="HomeStack"
        component={HomeStackNavigator}
      />
      <MainTab.Screen
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ size, color }) => (
            <Icon name="inbox" color={color} size={size} />
          ),
        }}
        name="LibraryStack"
        component={LibraryStackNavigator}
      />
      <MainTab.Screen
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ size, color }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
        name="SearchStack"
        component={SearchStackNavigator}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
