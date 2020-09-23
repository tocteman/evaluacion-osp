import React, { FunctionComponent } from "react"
import {
  Formik,
  Form,
  Field,
} from "formik";
import { mutate } from 'swr'
import {CleavedHour} from "./AddTurnModal"
import {UpdateTurnFetcher} from "../components/Fetcher"
import { TurnEditProps } from "../types";

const EditTurnModal: FunctionComponent<TurnEditProps> = (props:any) => {

  const initialValues = {
    id: props.data.id,
    hour: props.data.hour,
    isActive: props.data.isActive,
    assigned_movie: props.data.assigned_movie
  }

  return (
    <Formik
    initialValues = {initialValues}
    onSubmit = {(values, actions) => {
      const turnData = {
        id: values.id,
        hour: values.hour,
        isActive: values.isActive
      }
      console.log(values)
      UpdateTurnFetcher('https://evaluacion-osp.netlify.app/.netlify/functions/getData',turnData)
      .then(()=> {
        mutate('https://evaluacion-osp.netlify.app/.netlify/functions/getData')
        props.toggleFunction()
      })
    }
  }
    >
      <Form className="flex flex-col text-indigo-900 mt-6">
      <label
            htmlFor="hour"
            className="mt-2 text-white"
            >
             Hora
            </label>
            <Field name="hour" as={CleavedHour}>
            </Field>
           <label
            htmlFor="isActive"
            className="mt-2 text-white"
            >
             ¿Activo?
            </label>
           <Field
            id="isActive"
            name="isActive"
            placeholder=""
            className="bg-gray-200 focus:bg-white border-2 rounded-lg shadow my-1 p-2 font-bold text-lg"
            type="checkbox"
            />
           <button
            type="submit"
            className="mt-8 mb-4 rounded-full bg-gray-200 hover:bg-white shadow mx-auto w-48 py-2 font-bold text-lg"
            >
              Guardar
            </button>
      </Form>

    </Formik>
  )
}


export default EditTurnModal