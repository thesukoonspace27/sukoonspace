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
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-60 z-50">
      <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-lg w-[340px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Saved Mixes</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
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
              className="bg-neutral-800 cursor-pointer w-full flex items-center justify-center px-4 py-2 rounded-md"
            >
              <span className="text-white">{mix.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedMixesModal;
