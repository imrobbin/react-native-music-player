import React, { PropsWithChildren } from 'react';
import TrackPlayer, {
  State as TrackPlayerState,
  Track,
  usePlaybackState,
} from 'react-native-track-player';

interface PlayerContextType {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isEmpty: boolean;
  currentTrack: Track | null;
  play: (track: Track) => void;
  pause: () => void;
  playPauseAudio: () => void;
}

export const PlayerContext = React.createContext<PlayerContextType>({
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isEmpty: true,
  currentTrack: null,
  play: () => null,
  pause: () => null,
  playPauseAudio: () => null,
});

export const PlayerContextProvider = (
  props: PropsWithChildren<{}>,
): JSX.Element => {
  const playbackState = usePlaybackState();
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);

  const play = async (track: Track) => {
    console.log('play reached ', track);
    await TrackPlayer.add([track]);
    setCurrentTrack(track);
    await TrackPlayer.play();
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  const playPauseAudio = async () => {
    if (playbackState === TrackPlayerState.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };

  const value: PlayerContextType = {
    isPlaying: playbackState === TrackPlayerState.Playing,
    isPaused: playbackState === TrackPlayerState.Paused,
    isStopped: playbackState === TrackPlayerState.Stopped,
    isEmpty: playbackState === null,
    currentTrack: currentTrack,
    play: play,
    pause: pause,
    playPauseAudio: playPauseAudio,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => React.useContext(PlayerContext);
