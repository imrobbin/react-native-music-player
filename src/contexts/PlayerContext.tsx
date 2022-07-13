import React, { PropsWithChildren } from 'react';
import TrackPlayer, {
  State as TrackPlayerState,
  Track,
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';

interface PlayerContextType {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isConnecting: boolean;
  isEmpty: boolean;
  currentTrack: Track | null;
  play: (track: Track) => void;
  pause: () => void;
  playPauseAudio: () => void;
  seekTo: (amount?: number) => void;
  goTo: (amount: number) => void;
}

const events = [
  Event.PlaybackTrackChanged,
  Event.PlaybackQueueEnded,
  Event.PlaybackError,
];

export const PlayerContext = React.createContext<PlayerContextType>({
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isConnecting: false,
  isEmpty: true,
  currentTrack: null,
  play: () => null,
  pause: () => null,
  playPauseAudio: () => null,
  seekTo: () => null,
  goTo: () => null,
});

export const PlayerContextProvider = (
  props: PropsWithChildren<{}>,
): JSX.Element => {
  const playbackState = usePlaybackState();
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }

    // if (event.type === Event.PlaybackTrackChanged) {
    //   console.log('Track Changed track - ', event.track);
    //   console.log('Track Changed position - ', event.position);
    //   console.log('Track Changed nextTrack - ', event.nextTrack);
    // }

    if (event.type === Event.PlaybackQueueEnded) {
      console.log('Queue Ended track - ', event.track);
      console.log('Queue Ended position - ', event.position);
      setCurrentTrack(null);
    }
  });

  const play = async (track: Track) => {
    console.log('CurrentTrack to play - ', track);
    await TrackPlayer.add([track]);
    setCurrentTrack(track);
    await TrackPlayer.play();
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  const playPauseAudio = async () => {
    if (playbackState === TrackPlayerState.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  // left right button to seek forward and backward
  const seekTo = async (amount = 15) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + amount);
  };

  // seek forward and backward with slider
  const goTo = async (amount: number) => {
    await TrackPlayer.seekTo(amount);
  };

  const value: PlayerContextType = {
    isPlaying: playbackState === TrackPlayerState.Playing,
    isPaused: playbackState === TrackPlayerState.Paused,
    isStopped: playbackState === TrackPlayerState.Stopped,
    isConnecting: playbackState === TrackPlayerState.Connecting,
    isEmpty: playbackState === null,
    currentTrack: currentTrack,
    play: play,
    pause: pause,
    playPauseAudio: playPauseAudio,
    seekTo: seekTo,
    goTo: goTo,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => React.useContext(PlayerContext);
