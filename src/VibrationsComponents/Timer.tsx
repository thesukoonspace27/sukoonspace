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
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-100  pt-48">
      <div className="relative bg-neutral-400/90 p-8 rounded-xl shadow-lg ">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-black font-bold hover:drop-shadow-[1px_1px_8px_rgba(171,24,82,0.6)]"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-2 gap-3">
          {timerOptions.map((time) => (
            <button
              key={time}
              onClick={() => handleSelect(time)}
              className="px-4 py-2 rounded-md border text-black font-bold border-black w-full hover:drop-shadow-[1px_1px_8px_rgba(171,24,82,0.6)] bg-neutral-400/50 text-left  cursor-pointer"
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
