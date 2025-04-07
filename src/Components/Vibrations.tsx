import React, {  useEffect, useState } from "react";
import {useStore} from "../context/StoreProvider"
import TabNav from "./TabNav";
import SoundControls from "./SoundControls";
import SelectionCard from "./SelectionCard";
import AudioPlayer from "./AudioPlayer";

// import brainwaves from "../assets/audio/brainwaves/beta_waves.mp3";
// import bird from "../assets/audio/sounds/bird.mp3";
// import ocean from "../assets/audio/sounds/bird.mp3";
// import music1 from "../assets/audio/music/music1.mp3";
import { categoriesInterface, AudioItem } from "../types";
import SavedMixesModal from "./SavedMixesModal";


// When using bundlers like Vite, import ocean from "../..." actually returns the resolved URL to the asset. But if you directly hardcode a relative path (../assets/audio/sounds/bird.mp3), the file might not exist at that location in the final bundle — especially in production.
const Vibrations: React.FC = () => {
    const {addAudioTrack,updateVolume,removeAudioTrack,activeTab,setActiveTab, getCurrentCategoryTracks} = useStore();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [showSavedModal, setShowSavedModal] = useState<boolean>(false);

    

    // State to store selected audio for each category
    // const [selectedSounds, setSelectedSounds] = useState<string[]>([]);
    // const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
    // const [selectedBrainwaves, setSelectedBrainwaves] = useState<string[]>([]);
    
  
    

    const categories: categoriesInterface = {
        sounds: [{ id: 'song1', name: 'bird', path: "/audio/sounds/bird.mp3", volume: 0.5, category: 'sounds' },{ id: 'song2', name: 'ocean', path: "/audio/sounds/ocean.mp3", volume: 0.5, category: 'sounds' }],
        music: [{ id: 'music1', name: 'music', path: "/audio/music/music1.mp3", volume: 0.5, category: 'music' }],
        brainwaves: [{ id: 'brainwave1', name: 'brainwave', path: "/audio/brainwaves/beta_waves.mp3", volume: 0.5, category: 'brainwaves' }],
    };

   






  // Filter tracks by current category
  const currentCategoryTracks = getCurrentCategoryTracks();
  useEffect(() => {console.log("Current Category Tracks:", currentCategoryTracks);}, [currentCategoryTracks]);
    return (
      <div className="flex items-center justify-center w-[48rem] relative">
      <div className="bg-neutral-800 rounded-2xl drop-shadow-2xl w-full max-w-3xl">
        <div className="px-4 py-16 text-white">
          <h1 className="text-2xl font-semibold text-center mb-8">Vibrations</h1>
    
          <div className="flex justify-center space-x-6 mb-6">
            <button
              className="px-4 py-2 hover:bg-neutral-700 rounded"
              onClick={() => setModalOpen(true)}
            >
              Sample Packs
            </button>
            <button onClick={()=> setShowSavedModal(true)} className="px-4 py-2 hover:bg-neutral-700 rounded">
              Saved Mixes
            </button>
          </div>
    
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
    
          {/* Audio controls */}
          <div className="py-5 text-center">
            {["sounds", "music", "brainwaves"].includes(activeTab) && (
              <AudioPlayer
                currentCategoryTracks={currentCategoryTracks}
                removeAudioTrack={removeAudioTrack}
                updateVolume={updateVolume}
              />
            )}
          </div>
    
          {/* Add new */}
          <div className="flex justify-center mb-6 text-white">
            <button
              className={`bg-transparent border ${
                currentCategoryTracks.length == 1
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-neutral-700"
              } border-white px-6 py-2 rounded`}
              disabled={currentCategoryTracks.length == 3}
              onClick={() => setModalOpen(true)}
            >
              Add New {activeTab}
            </button>
          </div>
    
          <SoundControls />
        </div>
      </div>
    
      {
        showSavedModal &&(
          <SavedMixesModal onClose={()=> setShowSavedModal(false)} />
        )
      }
      {modalOpen && (
        <SelectionCard
          title={`Select ${activeTab}`}
          items={categories[activeTab]}
          onClose={() => setModalOpen(false)}
          onGenerate={(item: string) => {
            const res = categories[activeTab].find(
              (audio) => audio.name === item
            ) as AudioItem;
            addAudioTrack(res, activeTab);
            setModalOpen(false);
          }}
        />
      )}
    </div>
    
    );
};

export default Vibrations;
