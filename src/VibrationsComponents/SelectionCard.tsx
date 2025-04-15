import React, { useState } from "react";
import { AudioTrack } from "../types";
import { X } from 'lucide-react';

interface SelectionCardProps {
    title: string;
    items: AudioTrack[];
    onClose: () => void;
    onGenerate: (a: string) => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ title, items, onClose, onGenerate }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleSelect = (itemName: string) => {
        setSelectedItem(prev => (prev === itemName ? null : itemName));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center  ">
            <div className="relative bg-neutral-400/95 text-black font-bold p-6 rounded-lg shadow-xl w-[340px]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2.5 right-2.5 text-black font-bold hover:text-white"
                >
                    <X size={20} />
                </button>

                <h2 className="text-lg font-bold mb-4 text-white drop-shadow-[1px_1px_8px_rgba(171,24,82,0.6)]">{title}</h2>

                <div className="grid grid-cols-2 gap-3 ">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleSelect(item.name)}
                            className={`px-4 py-2 rounded transition border border-black ${
                                selectedItem === item.name ? "bg-green-500/65 text-white drop-shadow-[1px_1px_8px_rgba(171,24,82,0.6)] " : "hover:bg-gray-500/50 hover:bg-neutral-600"
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => selectedItem && onGenerate(selectedItem)}
                    disabled={!selectedItem}
                    className="mt-4 w-full text-black py-2 rounded-lg border-2 border-black hover:bg-gray-500/50 disabled:opacity-100 "
                >
                    Generate
                </button>
            </div>
        </div>
    );
};

export default SelectionCard;
