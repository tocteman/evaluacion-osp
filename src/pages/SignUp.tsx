import React, { FunctionComponent, useState } from "react"
import {LoginProps, SignUpValues} from "../types"
// import * as Yup from "yup"
import {
  Formik,
  Form,
  Field,
} from "formik";
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'



const SignUp:FunctionComponent<LoginProps> = ({gotrue}) => {
  const [signUpError, setSignUpError] = useState(false)
  const history = useHistory()

  const initialValues: SignUpValues = { 
    name: "",
    email: "",
    password: ""
  };


  const notify = () => toast("Has ingresado correctamente", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    });


  return (
    <div>
      <Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {
           gotrue.signup(values.email, values.password)
           .then((res:any) => {
            notify()
            history.push("/pageContainer")
           })
           .catch(()=> {
            setSignUpError(true)
           })
           actions.setSubmitting(false);
         }}
       >
         <Form className="flex flex-col text-indigo-900 mt-6">
           <label
            htmlFor="name"
            className="mt-2 text-white"
           >
             Nombre
          </label>
           <Field
            id="name"
            name="name"
            className="bg-gray-200 focus:bg-white border-2 rounded-lg shadow my-1 p-2 font-bold text-lg"
            />
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
              Registrarse
            </button>
            {signUpError && 
            <div className="text-red-400 my-4 text-center">
              Hubo un error al registrar tu usuario, por favor intenta nuevamente.
            </div>
            }
         </Form>
       </Formik>

    </div>
  )
}

export default SignUp