import { FiClock, FiPlay, FiHeart, FiPause } from "react-icons/fi";
import React, { useState } from "react";
import { useStore } from "../context/StoreProvider";
import Timer from "./Timer";
import SaveMixModal from "./SaveMixModal";
import { LocalStorageMix } from "../types";
const SoundControls: React.FC = () => {
  const {
    timerModal,
    setTimerModal,
    timer,
    setTimer,
    playAll,
    pauseAll,
    isPlaying,
    toggleAll,
    audioRefs,
    audioTracks,
  } = useStore();
  const [showModal, setShowModal] = useState(false);

  const handleSave = (mixName: string) => {
    const savedMixes = JSON.parse(localStorage.getItem(LocalStorageMix.savedMix) || "[]");
    localStorage.setItem(
      LocalStorageMix.savedMix,
      JSON.stringify([...savedMixes, {name: mixName,data: audioTracks }])
    );
    setShowModal(false);
  };

  const openTimer = () => {
    if (timer === 0) {
      setTimerModal(true);
    } else {
      setTimer(0);
    }
  };
  const timeFormatted = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <>
      <div className="flex md:justify-around font-semibold  justify-center text-black  rounded-2xl space-x-16 py-4  shadow-neutral-400/70 shadow-md">
        <button
          onClick={openTimer}
          className="flex cursor-pointer flex-col items-center  transition-colors"
        >
          <div className={`w-11 h-11  flex items-center justify-center mb-1 ${timer!=0? "text-white":""}  `}>
            <FiClock className="w-5 h-5" />
          </div>
          <span className={`text-sm ${timer!=0? "text-white":""} `}>
            {timer === 0 ? `Set Timer` : timeFormatted(timer)}
          </span>
        </button>

        <button
          onClick={toggleAll}
          disabled={Object.keys(audioRefs.current).length == 0}
          className={`flex ${
            Object.keys(audioRefs.current).length == 0
              ? "cursor-not-allowed"
              : "cursor-pointer"
          } flex-col items-center  transition-colors`}
        >
          <div className="w-12 h-12  flex items-center justify-center mb-1  ">
            {isPlaying && audioTracks.length > 0 ? (
              <FiPause className="w-5 h-5 text-white" onClick={pauseAll} />
            ) : (
              <FiPlay className="w-5 h-5 " onClick={playAll} />
            )}
          </div>
          <span className={`text-sm  ${isPlaying ? "text-white" : ""}`}>
            {isPlaying ? "Pause" : "Play"}
          </span>
        </button>

        <button
          disabled={audioTracks.length == 0}
          onClick={() => setShowModal(true)}
          className={`flex ${
            audioTracks.length == 0 ? "cursor-not-allowed" : "cursor-pointer"
          } flex-col items-center  transition-colors`}
        >
          <div className="w-12 h-12 flex items-center justify-center mb-1  ">
            <FiHeart className="w-5 h-5" />
          </div>
          <span className="text-sm ">Save Mix</span>
        </button>
      </div>
      {timerModal && <Timer />}
      {showModal && (
        <SaveMixModal
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default SoundControls;
