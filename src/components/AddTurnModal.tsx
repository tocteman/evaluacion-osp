import React, { FunctionComponent } from "react"
import {
  Formik,
  Form,
  Field,

} from "formik";
import { mutate } from 'swr'
import {AddNewTurnFetcher} from "../components/Fetcher"
import Cleave from "cleave.js/react"

const initialValues = {
  hour: "",
  isActive: false
}

export const CleavedHour = (props:any) => {
  return (
    <Cleave
    className="bg-gray-200 focus:bg-white border-2 rounded-lg shadow my-1 p-2 font-bold text-lg"
    options={{
      time: true,
      delimiter: ":",
      timePattern: ["h", "m"]
    }}
    placeholder="00:00"
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
    name="hour"
    />
  )
}

const AddTurnModal: FunctionComponent = (props:any) => {
  return (
    <Formik
    initialValues = {initialValues}
    onSubmit = {(values, actions) => {
      const turnData = {
        hour: values.hour,
        isActive: values.isActive
      }
      AddNewTurnFetcher('.netlify/functions/getData',turnData)
      .then(()=> {
        mutate('.netlify/functions/getData')
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
              Añadir Turno
            </button>
      </Form>

    </Formik>
  )
}


export default AddTurnModal