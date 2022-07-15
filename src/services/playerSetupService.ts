import TrackPlayer, { Capability } from 'react-native-track-player';

export const PlayerSetupService = async (): Promise<boolean> => {
  let isPlayerSetup = false;

  try {
    await TrackPlayer.getCurrentTrack();
    isPlayerSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        // Capability.SkipToNext,
        // Capability.SkipToPrevious,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        // Capability.SkipToNext,
        // Capability.SkipToPrevious,
        // Capability.JumpForward,
        // Capability.JumpBackward,
      ],
      forwardJumpInterval: 20,
      backwardJumpInterval: 20,
      progressUpdateEventInterval: 2,
    });
    isPlayerSetup = true;
  } finally {
    console.log('Setup Service - Player Setup Done');
    return isPlayerSetup;
  }
};

// <View style={styles.labelContainer}>
//         <Text style={styles.labelText}>
//           {new Date(progress.position * 1000).toISOString().slice(14, 19)}
//         </Text>
//         <Text style={styles.labelText}>
//           {new Date((progress.duration - progress.position) * 1000)
//             .toISOString()
//             .slice(14, 19)}
//         </Text>
//       </View>
