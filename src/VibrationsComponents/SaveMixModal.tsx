import React, { useState } from "react";
import { LocalStorageMix, LocalStroageMixType } from "../types";

interface SaveMixModalProps {
  onSave: (mixName: string) => void;
  onCancel: () => void;
}
const SaveMixModal: React.FC<SaveMixModalProps> = ({ onSave, onCancel }) => {
  const [mixName, setMixName] = useState(() => {
    const d = JSON.parse(
      localStorage.getItem(LocalStorageMix.savedMix) || "[]"
    ) as LocalStroageMixType;
    let i = 0;
    for (;; i++) {
      let found = false;
      d.map((a) => {
        if (a.name === `My Mix #${i}`) {
          found = true;
        }
      });
      if (!found) {
        break;
      }
    }
    return `My Mix #${i}`;
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop:blur-3xl  ">
      <div className="relative bg-neutral-400/95  hover:text-white p-6 rounded-lg shadow-xl w-[340px]">
        <h2 className="text-lg font-bold mb-4 text-black">Save New Mix</h2>

        <label className="text-sm text-black mb-1 block" htmlFor="mixName">
          Mix Name
        </label>
        <input
          id="mixName"
          value={mixName}
          onChange={(e) => setMixName(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-neutral-600/20 border border-gray-600 text-black font-bold placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500/50 focus:bg-white/20 focus:text-black"
          placeholder="Enter mix name"
          autoFocus
        />

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-neutral-600/85 hover:bg-neutral-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              let found = false;
              const d = JSON.parse(
                localStorage.getItem(LocalStorageMix.savedMix) || "[]"
              ) as LocalStroageMixType;
              d.map((a) => {
                if (a.name === mixName) {
                  found = true;
                }
              });
              if (!found) onSave(mixName);
              else alert("This mix name is already in use. Pick other.");
            }}
            className={`px-4 py-2 rounded-md bg-blue-700  ${mixName.length >0? "hover:bg-green-500/50":""}  text-white ${mixName.length === 0 ? "cursor-not-allowed" : ""}`}

          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveMixModal;
