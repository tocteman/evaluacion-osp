import React, { FunctionComponent, useState } from "react"
import {format} from 'date-fns'
import Modal from "../components/Portal"
import AddMovieModal from "../components/AddMovieModal"
import fromUnixTime from 'date-fns/fromUnixTime'
import {PeliculasProps, EditIconProps, Pelicula, Turno, TurnSelectProps, DeleteIconProps} from "../types"
import EditMovieModal from "../components/EditMovieModal"
import {UpdateMovieFetcher, DeleteMovieFetcher} from "../components/Fetcher"
import { mutate } from 'swr'




const Peliculas:FunctionComponent<PeliculasProps> = ({data}) => {



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
          DeleteMovieFetcher(".netlify/functions/getData", deleteData)
          .then(()=>mutate('.netlify/functions/getData'))
        }}
        className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
    )
  }

  const TurnSelect:FunctionComponent<TurnSelectProps> = ({movieData}) => {
    return (
      <select
      name="turnSelect"
      id="turn"
      className="bg-transparent"
      onChange={(e)=> {
        const updateObj = {
          ...movieData, 
          publication_date: movieData.publication_date,
          assigned_turns: Number(e.target.value) 
        }
        UpdateMovieFetcher('.netlify/functions/getData', updateObj)
        .then(()=>mutate('.netlify/functions/getData'))
      }}
      >
        <option value={0}>...</option>
        {data.turnos.map((turno:Turno) => (
          <option key={turno.id} value={turno.id}>{turno.id}</option>
        ))}
      </select>
    )
  }

  return (
    <>
    <div className="m-16 flex">
      <div className="flex flex-col justify-around w-4/5">
        <div className="font-bold text-5xl text-indigo-800">
          Películas
        </div>
          <table className="my-8">
            <thead>
              <tr className="text-lg text-right">
                <th className="pr-4 py-2">#</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">F. Publicación</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Turno</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.peliculas.map((pelicula: Pelicula, index: number) => (
                <tr key={pelicula.id} className={"text-lg py-2 rounded text-right " + (index % 2 === 0 ? "bg-gray-100" : "bg-white" )}>
                  <td className="pr-4 py-2">{index +1}</td>
                  <td className="px-4 py-2">{pelicula.name}</td>
                  <td className="px-4 py-2">{format(fromUnixTime(pelicula.publication_date), "dd/MMM/yyyy")}</td>
                  <td className="px-4 py-2">{
                  pelicula.isActive? "activa": "inactiva"}</td>
                  <td className="px-4 py-2">
                    {!pelicula.assigned_turns && 
                      <TurnSelect movieData={pelicula}/>
                    }
                    {pelicula.assigned_turns && 
                      <div>{pelicula.assigned_turns}</div>
                    }
                  </td>
                  <td className="px-4 py-2">
                    <EditIcon editData={pelicula}/>
                  </td>
                  <td className="px-4 py-2">
                    <DeleteIcon deleteData={pelicula}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
        className="rounded-full bg-indigo-800 shadow text-gray-200 hover:bg-indigo-700 hover:text-white px-8 h-10 text-lg font-bold mt-4"
        onClick={()=> setIsModalOpen("add")}>Nueva Película</button>
    </div>
        {isModalOpen === "add" && 
          <Modal >
            <AddMovieModal  />
          </Modal>
        }
        {isModalOpen === "edit" && modalData && 
          <Modal >
            <EditMovieModal data={modalData}/>
          </Modal>
        }
        </>
  )
}

export default Peliculas