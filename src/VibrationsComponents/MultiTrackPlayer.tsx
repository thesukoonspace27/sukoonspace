import React, { useState, useRef } from "react";

interface Track {
  id: string;
  name: string;
  file: File;
}

export function MultiTrackPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const handleAddTracks = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newTracks: Track[] = files.map((file) => {
      const id = URL.createObjectURL(file);
      return { id, name: file.name, file };
    });
    setTracks((prev) => [...prev, ...newTracks]);
  };

  const handleRemoveTrack = (id: string) => {
    if (audioRefs.current[id]) {
      audioRefs.current[id].pause();
      URL.revokeObjectURL(id);
      delete audioRefs.current[id];
    }
    setTracks((prev) => prev.filter((track) => track.id !== id));
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      Object.values(audioRefs.current).forEach((audio) => audio.pause());
    } else {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.currentTime = 0; // Start from the beginning
        audio.play();
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Parallel Sound Player</h2>

      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleAddTracks}
        className="mb-4"
      />

      <button
        className={`px-4 py-2 rounded ${isPlaying ? "bg-red-500" : "bg-green-500"} text-white`}
        onClick={togglePlayPause}
      >
        {isPlaying ? "Pause All" : "Play All"}
      </button>

      <ul className="space-y-4 mt-4">
        {tracks.map((track) => (
          <li key={track.id} className="bg-gray-100 p-3 rounded shadow flex justify-between items-center">
            <strong>{track.name}</strong>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleRemoveTrack(track.id)}
            >
              ❌ Remove
            </button>
            <audio ref={(el) => { if (el) audioRefs.current[track.id] = el; }} src={track.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MultiTrackPlayer;
