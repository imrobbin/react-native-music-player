import React, { useEffect, useState } from 'react';
import { UtilityThemeProvider } from 'react-native-design-utility';
import { NavigationContainer } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

import { theme } from './src/constants/theme';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import { LoadingIndicator } from './src/components';
import { PlayerContextProvider } from './src/contexts/PlayerContext';
import { PlayerSetupService } from './src/services';

const App = (): JSX.Element => {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const isPlayerSetup = await PlayerSetupService();
      setIsPlayerReady(isPlayerSetup);
    })();

    return () => {
      destroyPlayer();
    };
  }, []);

  const destroyPlayer = async () => {
    await TrackPlayer.destroy();
  };

  return (
    <UtilityThemeProvider theme={theme}>
      {isPlayerReady ? (
        <PlayerContextProvider>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </PlayerContextProvider>
      ) : (
        <LoadingIndicator />
      )}
    </UtilityThemeProvider>
  );
};

export default App;
