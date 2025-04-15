import React from 'react'
import Vibrations from '../VibrationsComponents/Vibrations'

function VibrationsPage() {
  return (
  <div className="flex justify-center items-center h-screen overflow-hidden inset-0 bg-[url('/static/img/bg-vibrations.jpg')] bg-cover bg-center bg-no-repeat opacity-60 z-0">
  {/* Background image layer */}
    

  
  <div className=" z-10 px-6  ">
    <Vibrations />
  </div>
  
</div>
  )
}

export default VibrationsPage