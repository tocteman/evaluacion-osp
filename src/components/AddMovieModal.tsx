import React, { FunctionComponent } from 'react'
// import * as Yup from "yup"
import {
  Formik,
  Form,
  Field,
} from "formik";
import { mutate } from 'swr'
import {AddNewMovieFetcher} from "../components/Fetcher"
import { v4 as uuidv4 } from 'uuid';
import Cleave from "cleave.js/react"
import parse from 'date-fns/parse'
import getUnixTime from 'date-fns/getUnixTime'

const initialValues = { 
  name: "",
  publication_date: "",
  isActive: false
};


export const CleavedDate = (props:any) => {
   return (
     <Cleave
     className="bg-gray-200 focus:bg-white border-2 rounded-lg shadow my-1 p-2 font-bold text-lg"
     options={{
       date: true,
       delimiter: "/",
       timePattern: ["d", "m", 'Y']
     }}
     placeholder="DD/MM/YYYY"
     value={props.value}
     onChange={event => {
       const currentEvent = event
       currentEvent.target.value = event.target.value
       props.onChange(currentEvent)
   }}
     onBlur={event => {
       const currentEvent = event
       currentEvent.target.value = event.target.value
       props.onChange(currentEvent)
   }}
     name="publication_date"
     />
   )
 }


const AddMovieModal:FunctionComponent = (props:any) => {
  return (
    <div>
      <Formik
        initialValues = {initialValues}
        onSubmit ={(values, actions)=> {
          const movieData = {
            id: uuidv4(),
            name: values.name,
            publication_date: getUnixTime(parse(values.publication_date, "dd/MM/yyyy", new Date())),
            isActive: values.isActive || false
          }
          AddNewMovieFetcher('https://evaluacion-osp.netlify.app/.netlify/functions/getData', movieData).then(()=> {
            mutate('https://evaluacion-osp.netlify.app/.netlify/functions/getData')
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
             ¿Activa?
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
              Añadir Película
            </button>
            {/* {signUpError && 
            <div className="text-red-400 my-4 text-center">
              Hubo un error al registrar tu usuario, por favor intenta nuevamente.
            </div>
            } */}
        </Form>
      </Formik>
    </div>
  )

}

export default AddMovieModal

