import React from "react";
import { useStore } from "../context/StoreProvider";
import {AudioCategory} from "../types";
interface TabNavProps {
    activeTab: AudioCategory;
    setActiveTab: (tab: AudioCategory) => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, setActiveTab }) => {
    
    const {audioTracks} = useStore();
   
    const tabs = [
        { name: "sounds", count: `${audioTracks.filter(track=> track.category === "sounds").length}/3` },
        { name: "music", count: `${audioTracks.filter(track=> track.category === "music").length}/3` },
        { name: "brainwaves", count: `${audioTracks.filter(track=> track.category === "brainwaves").length}/3` }
    ];

    return (
        <div className="border-b border-black  font-semibold">
            <div className="flex justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        className={`px-6 py-3 relative ${
                            activeTab === tab.name ? "text-black" : "text-black"
                        }`}
                        onClick={() => setActiveTab(tab.name as AudioCategory)}
                    >
                        {tab.name} <span className="text-sm text-gray-800">({tab.count})</span>
                        {activeTab === tab.name && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabNav;
