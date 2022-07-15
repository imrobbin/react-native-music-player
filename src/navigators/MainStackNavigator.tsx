import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
import { PlayerScreen, QueueScreen } from '../screens';
import { MainStackRouteParamList } from './types';

const MainStack = createNativeStackNavigator<MainStackRouteParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Group>
        <MainStack.Screen name="TabsScreen" component={MainTabNavigator} />
      </MainStack.Group>
      <MainStack.Group screenOptions={{ presentation: 'modal' }}>
        <MainStack.Screen name="PlayerScreen" component={PlayerScreen} />
        <MainStack.Screen name="QueueScreen" component={QueueScreen} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
