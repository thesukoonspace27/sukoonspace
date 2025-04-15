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
        sounds: [{ id: 'sound1', name: 'Bird', path: "/audio/sounds/bird.mp3", volume: 0.5, category: 'sounds' },
          // { id: 'sound2', name: 'Fire', path: "/audio/sounds/fire.mp3", volume: 0.5, category: 'sounds' },
          { id: 'sound3', name: 'Heartbeat', path: "/audio/sounds/heartbeat.mp3", volume: 0.5, category: 'sounds' },
          { id: 'sound4', name: 'Rain', path: "/audio/sounds/rain.mp3", volume: 0.5, category: 'sounds' },
          { id: 'sound5', name: 'Wind Chimes', path: "/audio/sounds/wind-chimes.mp3", volume: 0.5, category: 'sounds' }
        ],
        music: [{ id: 'music1', name: 'Angelic', path: "/audio/music/music1.mp3", volume: 0.5, category: 'music' },
          { id: 'music2', name: 'Conexion', path: "/audio/music/music1.mp3", volume: 0.5, category: 'music' },
          { id: 'music3', name: 'Sernity', path: "/audio/music/music1.mp3", volume: 0.5, category: 'music' },
          { id: 'music4', name: 'Tanpura', path: "/audio/music/music1.mp3", volume: 0.5, category: 'music' }
        ],
        brainwaves: [{ id: 'brainwave1', name: 'Dreaming', path: "/audio/brainwaves/dreaming.mp3", volume: 0.5, category: 'brainwaves' }],
    };

   






  // Filter tracks by current category
  const currentCategoryTracks = getCurrentCategoryTracks();
  
    return (
      <div className="flex items-center justify-center  relative w-auto sm:w-[48rem] backdrop-blur-sm">
      <div className="bg-neutral-300 rounded-2xl drop-shadow-2xl w-full max-w-4xl  bg-opacity-20">
        <div className="px-4 py-16 bg-gradient-to-br text-white drop-shadow-[1px_1px_8px_rgba(171,24,82,0.6)]  ">
          <h1 className="text-2xl font-semibold text-center mb-8">Vibrations</h1>
    
          <div className="flex justify-center text-black font-semibold space-x-6 mb-6">
            <button
              className="px-4 py-2 hover:text-white rounded"
              onClick={() => setModalOpen(true)}
            >
              Sample Packs
            </button>
            <button onClick={()=> setShowSavedModal(true)} className="px-4 py-2 hover:text-white rounded">
              Saved Mixes
            </button>
          </div>
    
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
    
          {/* Audio controls */}
          <div className="py-5 text-center ">
            {["sounds", "music", "brainwaves"].includes(activeTab) && (
              <AudioPlayer
                currentCategoryTracks={currentCategoryTracks}
                removeAudioTrack={removeAudioTrack}
                updateVolume={updateVolume}
              />
            )}
          </div>
    
          {/* Add new */}
          <div className="flex justify-center mb-6 text-white font-semibold ">
            <button
              className={`bg-transparent border-2 border-black text-black ${
                currentCategoryTracks.length == 2
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:text-white"
              } border-gray-400 px-6 py-2 rounded`}
              disabled={currentCategoryTracks.length == 2}
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
