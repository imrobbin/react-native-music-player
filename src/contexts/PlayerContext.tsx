import React, { PropsWithChildren } from 'react';
import TrackPlayer, {
  State as TrackPlayerState,
  Track,
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
  RepeatMode,
} from 'react-native-track-player';

interface PlayerContextType {
  isPlaying: boolean;
  isPaused: boolean;
  isReady: boolean;
  isStopped: boolean;
  isLoading: boolean;
  isEmpty: boolean;
  currentTrack: Track | null;
  play: (index: number, tracks: Track[]) => void;
  pause: () => void;
  playPauseAudio: () => void;
  setRepeatMode: () => void;
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
  isReady: false,
  isStopped: false,
  isLoading: false,
  isEmpty: true,
  currentTrack: null,
  play: () => null,
  pause: () => null,
  playPauseAudio: () => null,
  setRepeatMode: () => null,
  seekTo: () => null,
  goTo: () => null,
});

export const PlayerContextProvider = (
  props: PropsWithChildren<{}>,
): JSX.Element => {
  const playbackState = usePlaybackState();
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);

  useTrackPlayerEvents(events, async event => {
    if (event.type === Event.PlaybackError) {
      console.error('An error occured while playing the current track.');
    }

    if (event.type === Event.PlaybackTrackChanged) {
      console.log('Track Changed Result - ', event);
      const queue = await TrackPlayer.getQueue();
      if (event.nextTrack !== undefined) {
        setCurrentTrack(queue[event.nextTrack]);
      }
    }

    if (event.type === Event.PlaybackQueueEnded) {
      console.log('Queue Ended Result - ', event);
      // when queue ends, reset player and add last played track as currentTrack
      setCurrentTrack(null);
      // const pTrack = await TrackPlayer.getTrack(event.track);
      const queue = await TrackPlayer.getQueue();
      await TrackPlayer.reset();
      // await TrackPlayer.add(pTrack!);
      await TrackPlayer.add(queue);
      if (playbackState === TrackPlayerState.Ready) {
        // setCurrentTrack(pTrack);
        setCurrentTrack(queue[0]);
      }
    }
  });

  const play = async (selectedTrackIdx: number, tracks: Track[]) => {
    console.log('CurrentTrack to Play - ', tracks[selectedTrackIdx]);

    try {
      if (currentTrack && currentTrack.id !== tracks[selectedTrackIdx].id) {
        await TrackPlayer.reset();
      }

      await TrackPlayer.add(tracks);
      await TrackPlayer.skip(selectedTrackIdx);
      await TrackPlayer.play();
    } catch (error) {
      console.error('Add track error ', error);
    }
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

  const setRepeatMode = async () => {
    const queue = await TrackPlayer.getQueue();
    if (queue.length > 1) {
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    } else {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
    }
    console.log('repeat mode');
  };

  const value: PlayerContextType = {
    isPlaying: playbackState === TrackPlayerState.Playing,
    isPaused: playbackState === TrackPlayerState.Paused,
    isReady:
      playbackState === TrackPlayerState.Paused ||
      playbackState === TrackPlayerState.Stopped ||
      playbackState === TrackPlayerState.Ready,
    isStopped: playbackState === TrackPlayerState.Stopped,
    isLoading:
      playbackState === TrackPlayerState.Connecting ||
      playbackState === TrackPlayerState.Buffering,
    isEmpty: playbackState === null,
    currentTrack: currentTrack,
    play: play,
    pause: pause,
    playPauseAudio: playPauseAudio,
    setRepeatMode: setRepeatMode,
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
