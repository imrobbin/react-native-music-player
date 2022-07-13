import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
import { PlayerScreen } from '../screens';
import { MainStackRouteParamList } from './types';

const MainStack = createNativeStackNavigator<MainStackRouteParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Group>
        <MainStack.Screen name="Tabs" component={MainTabNavigator} />
      </MainStack.Group>
      <MainStack.Group screenOptions={{ presentation: 'modal' }}>
        <MainStack.Screen name="Player" component={PlayerScreen} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
