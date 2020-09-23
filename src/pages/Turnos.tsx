import React, { FunctionComponent, useState } from "react"
import Modal from "../components/Portal"
import AddTurnModal from "../components/AddTurnModal"
import EditTurnModal from "../components/EditTurnModal"
import { Turno, TurnosProps, EditIconProps, DeleteIconProps } from "../types"
import {DeleteTurnFetcher} from "../components/Fetcher"
import { mutate } from 'swr'

const Turnos:FunctionComponent<TurnosProps> = ({data}) => {

  const [isModalOpen, setIsModalOpen] = useState("")
  const [modalData, setModalData] = useState(null)


  const EditIcon:FunctionComponent<EditIconProps> = ({editData}) => {
    return (
      <svg onClick={()=> {
        setIsModalOpen("edit"); setModalData(editData)}} className="w-6 h-6 cursor-pointer hover:text-indigo-800 underline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
    )
  }


  const DeleteIcon:FunctionComponent<DeleteIconProps> = ({deleteData}) => {
    return (
        <svg 
        onClick={()=> {
          DeleteTurnFetcher(".netlify/functions/getData", deleteData)
          .then(()=>mutate('.netlify/functions/getData'))
        }}
        className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
    )
  }

  return (
    <>
    <div className="m-16 flex">
      <div className="flex flex-col w-4/5 justify-around">
        <div className="font-bold text-5xl text-indigo-800">
          Turnos
        </div>
          <table>
            <thead>
              <tr className="text-lg text-right">
                <th className="pr-4 py-2">id</th>
                <th className="px-4 py-2">Hora</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.turnos.map((turno: Turno, index: number) => (
                <tr key={turno.id} className={"text-lg py-2 rounded text-right " + (index % 2 === 0 ? "bg-gray-100" : "bg-white" )}>
                  <td className="px-4 py-2">{turno.id}</td>
                  <td className="px-4 py-2">{turno.hour}</td>
                  <td className="px-4 py-2">{
                  turno.isActive? "activo" : "inactivo" }</td>
                  <td className="py-2">
                    <EditIcon editData={turno}/>
                  </td>
                  <td className="py-2">
                    <DeleteIcon deleteData={turno}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
        <button
         className="rounded-full bg-indigo-800 shadow text-gray-200 hover:bg-indigo-700 hover:text-white px-8 h-10 text-lg font-bold mt-4"
        onClick={()=> setIsModalOpen("add")}
        >Nuevo Turno</button>
      </div>
      {isModalOpen === "add" && 
          <Modal >
            <AddTurnModal  />
          </Modal>
        }
        {isModalOpen === "edit" && modalData && 
          <Modal >
            <EditTurnModal data={modalData}/>
          </Modal>
        }
    </>
  )
}

export default Turnos