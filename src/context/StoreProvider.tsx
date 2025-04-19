import React, { useRef, useState } from "react";
import { createContext, useContext, useEffect } from "react";
import { AudioCategory, AudioTrack, AudioItem } from "../types";
interface StoreContextType {
  timer: number;
  setTimer: (value: number) => void;
  timerModal: boolean;
  setTimerModal: React.Dispatch<React.SetStateAction<boolean>>;
  audioRefs: React.RefObject<Record<string, HTMLAudioElement>>;
  playAll: () => void;
  pauseAll: () => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAll: () => void;
  activeTab: AudioCategory;
  setActiveTab: React.Dispatch<React.SetStateAction<AudioCategory>>;
  audioTracks: AudioTrack[];
  setAudioTracks: React.Dispatch<React.SetStateAction<AudioTrack[]>>;
  addAudioTrack: (audio: AudioItem, category: AudioCategory) => void;
  updateVolume: (trackId: string, volume: number) => void;
  removeAudioTrack: (trackId: string) => void;
  setTimerTimeout: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>;
  getCurrentCategoryTracks: () => AudioTrack[];
  updateAudioTracks: (data:{audio: AudioItem, category: AudioCategory}[])=>void;
}

const StoreContext = createContext<StoreContextType>({
  timer: 0,
  setTimer: () => {},
  timerModal: false,
  setTimerModal: () => {},
  audioRefs: { current: {} },
  playAll: () => {},
  pauseAll: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  toggleAll: () => {},
  activeTab: "sounds", // assuming "sounds" is of type AudioCategory
  setActiveTab: () => {},
  audioTracks: [],
  setAudioTracks: () => {},
  addAudioTrack: () => {},
  updateVolume: () => {},
  removeAudioTrack: () => {},
  setTimerTimeout: () => {},
  getCurrentCategoryTracks: () => [],
  updateAudioTracks: () => {},
});

export const useStore = () => {
  return useContext(StoreContext);
};
const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timer, _setTimer] = React.useState<number>(0);
  const [timerTimeout, setTimerTimeout] = React.useState<NodeJS.Timeout | null>(
    null
  );
  const [timerModal, setTimerModal] = React.useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AudioCategory>("sounds");
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);
  const prevTimerRef = useRef<number>(0);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  // Audio element refs
  const playAll = () => {
    // if(timer!==0){
    //   setTimer(timer);
    // }
    setIsPlaying(true);
    Object.keys(audioRefs.current).forEach((key) => {
      audioRefs.current[key].play();
    });
  };
  const pauseAll = () => {
    setIsPlaying(false);
    Object.keys(audioRefs.current).forEach((key) => {
      audioRefs.current[key].pause();
    });
  };

  const toggleAll = () => {
    if (isPlaying) {
      pauseAll();
    } else {
      playAll();
    }
  };
  // const [timerInterval, setTimerInterval] = React.useState<NodeJS.Timeout | null>(null);
  const setTimer = (value: number) => {
    if (timerTimeout) {
      clearTimeout(timerTimeout);
    }
    _setTimer(value);
  };
  // -----------------------------------------------------------------
  const updateVolume = (trackId: string, volume: number): void => {
    setAudioTracks((prev) =>
      prev.map((track) =>
        track.id === trackId ? { ...track, volume: volume } : track
      )
    );

    // Update actual audio element volume if it exists
    if (audioRefs.current[trackId]) {
      audioRefs.current[trackId].volume = volume;
    }
  };

  // Remove an audio track from the mixer
  const removeAudioTrack = (trackId: string): void => {
    setAudioTracks((prev) => prev.filter((track) => track.id !== trackId));

    // If this element has been initialized, remove it
    if (audioRefs.current[trackId]) {
      audioRefs.current[trackId].pause();
      delete audioRefs.current[trackId];
    }
  };
  
  const updateAudioTracks = (data: { audio: AudioItem; category: AudioCategory }[]) => {
    const newTracks = data.map(({ audio, category }) => ({
      ...audio,
      volume: audio.volume,
      category,
      
    }));

    setAudioTracks((prev) => {
      const updatedTracks = newTracks.filter(
        (newTrack) => !prev.some((track) => track.id === newTrack.id)
      );

      const remainingTracks = prev.filter((track) =>
        newTracks.some((newTrack) => newTrack.id === track.id)
      );

      return [...remainingTracks, ...updatedTracks];
    });

    // Update audioRefs
    Object.keys(audioRefs.current).forEach((key) => {
      if (!newTracks.some((track) => track.id === key)) {
        audioRefs.current[key].pause();
        delete audioRefs.current[key];
      }
    });

    newTracks.forEach((track) => {
      if (!audioRefs.current[track.id]) {
        audioRefs.current[track.id] = new Audio(track.path);
        audioRefs.current[track.id].volume = track.volume;
        audioRefs.current[track.id].preload = "auto"; // Preload the audio file

        if (isPlaying) {
          audioRefs.current[track.id].play();
        }
      }
    });
  };

  const addAudioTrack = (audio: AudioItem, category: AudioCategory): void => {
    // Check if audio is already added
    if (audioTracks.some((track) => track.id === audio.id)) {
      alert("This audio is already in your mix!");
      return;
    }

    // Add new track with default volume
    setAudioTracks((prev) => [
      ...prev,
      {
        ...audio,
        volume: 0.5,
        category,
      },
    ]);
    audioRefs.current[audio.id] = new Audio(audio.path); // Initialize the audio element
    audioRefs.current[audio.id].volume = 0.5; // Set default volume
    audioRefs.current[audio.id].loop = true; // 🔁 Make it loop
    audioRefs.current[audio.id].preload = "auto"; // Preload the audio



    if (isPlaying) {
      audioRefs.current[audio.id].play();
    }
  };

  const getCurrentCategoryTracks = (): AudioTrack[] => {
    return audioTracks.filter((track) => track.category === activeTab);
  };

  //-----------------------------------------------------------
  useEffect(() => {
    if (!isPlaying) return;
    if (timer < 0) {
      pauseAll();
      _setTimer(0);
      return;
    }
    if (timer === 0) {
      if(prevTimerRef.current!==0)pauseAll();
      prevTimerRef.current = 0;
      if (timerTimeout) {
        clearTimeout(timerTimeout);
      }

      return;
    }
    setTimerTimeout(
      setTimeout(() => {
        prevTimerRef.current = timer;
        _setTimer(timer - 1);
        if (audioTracks.length === 0) _setTimer(0);
      }, 1000)
    );
  }, [timer, isPlaying]);
  return (
    <StoreContext.Provider
      value={{
        timer,
        setTimer,
        timerModal,
        setTimerModal,
        audioRefs,
        playAll,
        pauseAll,
        isPlaying,
        setIsPlaying,
        toggleAll,
        activeTab,
        setActiveTab,
        audioTracks,
        setAudioTracks,
        updateVolume,
        removeAudioTrack,
        addAudioTrack,
        setTimerTimeout,
        getCurrentCategoryTracks,
        updateAudioTracks,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
