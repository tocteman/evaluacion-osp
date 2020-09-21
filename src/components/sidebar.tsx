import React from 'react'
import {Link, useHistory} from 'react-router-dom'

const Sidebar = () => {
  const history = useHistory()
  return (
    <div className="flex flex-col">

      <div onClick={()=> history.push('/peliculas')}>Películas</div>
      <div onClick={()=> history.push('/turnos')}>Turnos</div>
      <div></div>
      <div></div>
      <div onClick={()=> console.log("cerrar sesión")}>Cerrar Sesión</div>
    </div>
  )
}

export default Sidebar

