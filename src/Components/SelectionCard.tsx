import React, { useState } from "react";
import { AudioTrack } from "./../types";
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
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-neutral-800 text-white p-6 rounded-lg shadow-lg w-96">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-1.5 right-1.5 text-gray-400 hover:text-white"
                >
                    <X size={18} />
                </button>

                <h2 className="text-lg font-semibold mb-4">{title}</h2>

                <div className="grid grid-cols-2 gap-3">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleSelect(item.name)}
                            className={`px-4 py-2 rounded transition ${
                                selectedItem === item.name ? "bg-green-600" : "bg-neutral-700 hover:bg-neutral-600"
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => selectedItem && onGenerate(selectedItem)}
                    disabled={!selectedItem}
                    className="mt-4 w-full bg-gray-700 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50"
                >
                    Generate
                </button>
            </div>
        </div>
    );
};

export default SelectionCard;
