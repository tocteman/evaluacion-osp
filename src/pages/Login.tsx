import React, { FunctionComponent } from "react"
import {LoginProps, LoginValues} from "../types"
import {
  Formik,
  Form,
  Field,
} from "formik";;


const Login:FunctionComponent<LoginProps> = ({gotrue}) => {
  const initialValues: LoginValues = { 
    email: "",
    password: ""
  };
  return (
    <div>
      <Formik
        initialValues = {initialValues}
        onSubmit={(values, actions) => {
          console.log(gotrue)
          gotrue.signup(values.email, values.password)
          .then((res:any) => console.log(res))
          actions.setSubmitting(false);
        }}
      >
        <Form className="flex flex-col text-indigo-900 mt-6">
           <label
            htmlFor="email"
            className="mt-2 text-white"
            >
             Correo
            </label>
           <Field
            id="email"
            name="email"
            placeholder="Email"
            className="bg-gray-200 focus:bg-white border-2 rounded-lg shadow my-1 p-2 font-bold text-lg"
            type="email"
            />
           <label
            htmlFor="password"
            className="mt-2 text-white"
            >
             Contraseña
            </label>
           <Field
            id="password"
            name="password"
            placeholder="8 caracteres"
            className="bg-gray-200 focus:bg-white border-2 rounded-lg shadow my-1 p-2 font-bold text-lg"
            type="password"
            />
           <button
            type="submit"
            className="mt-8 mb-4 rounded-full bg-gray-200 hover:bg-white shadow mx-auto w-48 py-2 font-bold text-lg"
            >
              Ingresar
            </button>
         </Form>
      </Formik>
    </div>
  )
}

export default Login