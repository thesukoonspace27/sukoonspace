// SelectSounds.tsx
import React from 'react';
import { X } from 'lucide-react';
import { useStore } from "../context/StoreProvider";

const timerOptions = [1, 2, 5, 10, 15, 20, 30, 60];

const Timer: React.FC = () => {
  const { setTimer, setTimerModal } = useStore();

  const handleClose = () => {
    setTimerModal(false);
  };

  const handleSelect = (time: number) => {
    setTimer(time * 60);
    handleClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-0 pt-48">
      <div className="relative bg-zinc-800 p-8 rounded-xl shadow-lg ">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-2 gap-3">
          {timerOptions.map((time) => (
            <button
              key={time}
              onClick={() => handleSelect(time)}
              className="px-4 py-2 rounded-md border border-gray-600 text-left hover:bg-gray-700 cursor-pointer"
            >
              {time} min
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timer;
