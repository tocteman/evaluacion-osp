import React, { FunctionComponent, useState } from "react"
import {LoginProps, LoginValues} from "../types"
import {
  Formik,
  Form,
  Field,
} from "formik";
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';


const Login:FunctionComponent<LoginProps> = ({gotrue}) => {
  const history = useHistory()
  const [loginError, setLoginError] = useState(false)


  const initialValues: LoginValues = { 
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
        initialValues = {initialValues}
        onSubmit={(values, actions) => {
          gotrue.login(values.email, values.password)
          .then((res:any) => {
            notify()
            history.push("/")
          })
          .catch((res:any)=> {
            setLoginError(true)
          })
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
            {loginError && 
            <div className="text-red-300 my-4 text-center">
              Hubo un error al ingresar, por favor intenta nuevamente.
            </div>
            }
         </Form>
      </Formik>
    </div>
  )
}

export default Login