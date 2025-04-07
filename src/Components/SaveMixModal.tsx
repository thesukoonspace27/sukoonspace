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
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-60 z-50">
      <div className="bg-neutral-800 text-white p-6 rounded-lg shadow-xl w-[340px]">
        <h2 className="text-lg font-semibold mb-4">Save New Mix</h2>

        <label className="text-sm text-gray-300 mb-1 block" htmlFor="mixName">
          Mix Name
        </label>
        <input
          id="mixName"
          value={mixName}
          onChange={(e) => setMixName(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter mix name"
        />

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 text-white"
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
            className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveMixModal;
