import React, { useEffect } from "react";
import { AudioTrack } from "../types";

interface AudioPlayerProps {
  currentCategoryTracks: AudioTrack[];
  updateVolume: (trackId: string, volume: number) => void;
  removeAudioTrack: (id: string) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentCategoryTracks,
  updateVolume,
  removeAudioTrack,
}) => {
  useEffect(() => {
    console.log("Current Category Tracks:", currentCategoryTracks);
  }, [currentCategoryTracks]);

  return (
    <div className="space-y-4">
      {currentCategoryTracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center  p-2 bg-neutral-300/10 rounded-md gap-3"
        >
          {/* Track name */}
          <p className="text-white drop-shadow-[1px_1px_8px_rgba(171,24,82,0.6)] font-medium w-30  truncate">{track.name}</p>

          {/* Volume control */}
          <div className="flex items-center flex-grow gap-2">
            <span className="text-xs text-white drop-shadow-[1px_1px_8px_rgba(171,24,82,0.6)]">Vol:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={track.volume}
              onChange={(e) =>
                updateVolume(track.id, parseFloat(e.target.value))
              }
              className="w-full"
            />
            <span className="text-xs text-white drop-shadow-[1px_1px_8px_rgba(171,24,82,0.6)] w-10 text-right">
              {Math.round(track.volume * 100)}%
            </span>
          </div>

          {/* Remove button */}
          <button
            className="text-red-400 hover:text-red-600 p-1 rounded-full"
            onClick={() => removeAudioTrack(track.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AudioPlayer;
