import React from 'react';
import { UtilityThemeProvider } from 'react-native-design-utility';
import { NavigationContainer } from '@react-navigation/native';
import TrackPlayer, { Capability } from 'react-native-track-player';

import { theme } from './src/constants/theme';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import { LoadingIndicator } from './src/components';
import { PlayerContextProvider } from './src/contexts/PlayerContext';

const App = (): JSX.Element => {
  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        TrackPlayer.updateOptions({
          stopWithApp: true,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.JumpForward,
            Capability.JumpBackward,
          ],
          compactCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            // Capability.JumpForward,
            // Capability.JumpBackward,
          ],
          forwardJumpInterval: 20,
          backwardJumpInterval: 20,
        });
        console.log('TrackPlayer setup done.');
        setIsReady(true);
      });
    })();

    return () => {
      destryPlayer();
    };
  }, []);

  const destryPlayer = async () => {
    await TrackPlayer.destroy();
  };

  return (
    <UtilityThemeProvider theme={theme}>
      {isReady ? (
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
