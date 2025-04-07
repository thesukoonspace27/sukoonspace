import { useStore } from "../context/StoreProvider";
import {AudioCategory} from "./../types";
interface TabNavProps {
    activeTab: AudioCategory;
    setActiveTab: (tab: AudioCategory) => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, setActiveTab }) => {
    
    const {audioTracks} = useStore();
    console.log("Audio Tracks:", audioTracks);
    const tabs = [
        { name: "sounds", count: `${audioTracks.filter(track=> track.category === "sounds").length}/3` },
        { name: "music", count: `${audioTracks.filter(track=> track.category === "music").length}/3` },
        { name: "brainwaves", count: `${audioTracks.filter(track=> track.category === "brainwaves").length}/3` }
    ];

    return (
        <div className="border-b border-neutral-700">
            <div className="flex justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        className={`px-6 py-3 relative ${
                            activeTab === tab.name ? "text-white" : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab(tab.name as AudioCategory)}
                    >
                        {tab.name} <span className="text-sm text-gray-400">({tab.count})</span>
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
