import React, { FunctionComponent } from 'react'

const Loader:FunctionComponent = () => {
  return (
    <div className="w-full w-full min-h-screen text-black flex justify-content items-center text-5xl font-bold text-white text-center">
      <div className="mx-auto">

        Cargando...
      </div>
    </div>
  )
}


export default Loader