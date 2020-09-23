import React, { FunctionComponent } from "react"
import {PeliculaEditProps} from "../types"
import {CleavedDate} from "./AddMovieModal"
import {
  Formik,
  Form,
  Field,
} from "formik";
import {UpdateMovieFetcher} from "../components/Fetcher"
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import getUnixTime from 'date-fns/getUnixTime'
import { mutate } from 'swr'
import fromUnixTime from 'date-fns/fromUnixTime'

const EditMovieModal: FunctionComponent<PeliculaEditProps> = (props:any) => {
  
  const initialValues = {
    id: props.data.id,
    name: props.data.name,
    publication_date: format(fromUnixTime(props.data.publication_date).valueOf(), "dd/MM/yyyy"),
    isActive: props.data.isActive,
    assigned_turns: props.data.assigned_turns || ""
  }

  return (
    <Formik
    initialValues = {initialValues}
    onSubmit ={(values, actions)=> {
      const movieData = {
        id: values.id,
        name: values.name,
        publication_date: getUnixTime(parse(values.publication_date, "dd/MM/yyyy", new Date())),
        isActive: values.isActive || "inactive"
      }
      UpdateMovieFetcher('.netlify/functions/getData', movieData)
      .then(()=> {
        mutate('.netlify/functions/getData')
        props.toggleFunction()
      })
    }}
    >
     <Form className="flex flex-col text-indigo-900 mt-6">
     <label
        htmlFor="name"
        className="mt-2 text-white"
       >
         Nombre de la Película
      </label>
       <Field
        id="name"
        name="name"
        className="bg-gray-200 focus:bg-white border-2 rounded-lg shadow my-1 p-2 font-bold text-lg"
        />
       <label
        htmlFor="publication_date"
        className="mt-2 text-white"
        >
         Fecha de Publicación
        </label>
        <Field name="publication_date" as={CleavedDate}>
        </Field>
       <label
        htmlFor="isActive"
        className="mt-2 text-white"
        >
         Estado
        </label>
       <Field
        id="isActive"
        name="isActive"
        placeholder="8 caracteres"
        className="bg-gray-200 focus:bg-white border-2 rounded-lg shadow my-1 p-2 font-bold text-lg"
        type="checkbox"
        />
       <button
        type="submit"
        className="mt-8 mb-4 rounded-full bg-gray-200 hover:bg-white shadow mx-auto w-48 py-2 font-bold text-lg"
        >
          Guardar Cambios
        </button>
        {/* {signUpError && 
        <div className="text-red-400 my-4 text-center">
          Hubo un error al registrar tu usuario, por favor intenta nuevamente.
        </div>
        } */}
    </Form>
  </Formik>
  )
}


export default EditMovieModal