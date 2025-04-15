import React, { useState } from "react";
import { X } from "lucide-react";
import { useStore } from "../context/StoreProvider";

import { LocalStroageMixType, LocalStorageMix } from "../types";

interface SavedMixesModalProps {
  onClose: () => void;
}

const SavedMixesModal: React.FC<SavedMixesModalProps> = ({ onClose }) => {
  const { updateAudioTracks } = useStore();
  const [mixes, setMixes] = useState(
    () =>
      JSON.parse(
        localStorage.getItem(LocalStorageMix.savedMix) || "[]"
      ) as LocalStroageMixType
  );
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-60 backdrop-blur-sm">
      <div className="relative bg-neutral-400/95 text-black font-bold p-6 rounded-lg shadow-xl w-[340px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Saved Mixes</h2>
          <button onClick={onClose} className="text-black hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 ">
          {mixes.map((mix) => (
            <button
              onClick={() => {
                updateAudioTracks(
                  mix.data.map((track) => {
                    return {
                      audio: {
                        id: track.id,
                        name: track.name,
                        path: track.path,
                        volume: track.volume,
                      },
                      category: track.category,
                    };
                  })
                );
                onClose();
              }}
              key={mix.name}
              className=" cursor-pointer w-full border border-black hover:drop-shadow-[1px_1px_8px_rgba(171,24,82,0.6)] bg-neutral-400/50 flex items-center justify-center px-4 py-2 rounded-md"
            >
              <span className="text-black font-bold">{mix.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold border-2 border-black rounded-md bg-neutral-500/50 hover:drop-shadow-[1px_1px_8px_rgba(171,24,82,0.6)] text-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedMixesModal;
