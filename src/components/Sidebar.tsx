import React, { FunctionComponent, useState } from "react"
import {useHistory} from "react-router-dom"

const Sidebar: FunctionComponent = () => {
  const history = useHistory()
  const [selectedItem, setSelectedItem] = useState("")

  const handleSelection = (itemLabel: string) => {
    setSelectedItem(itemLabel)
    if (itemLabel === "cerrar") {
      return 
    }
    history.push(`/${itemLabel}`)
  }

  const items = [
    {label: "Películas", value: "peliculas", orderNumber: 1},
    {label: "Turnos", value: "turnos", orderNumber: 2},
    {label: "Administradores", value: "administradores", orderNumber: 3},
    {label: "Perfil", value: "perfil", orderNumber: 4},
    {label: "Cerrar Sesión", value: "cerrar", orderNumber: 5}
  ]

  return (
    <div className="flex flex-col mt-8 p-8 text-lg">
      {items.map(item => (
        <div
        key={item.orderNumber}
        onClick={()=> handleSelection(item.value)}
        className={"my-2 cursor-pointer " + (selectedItem === item.value && "font-bold text-indigo-800 underline")}
        >
        
        {item.label}
        </div>
      )) }
    </div>
  )
}

export default Sidebar

