import React, { FunctionComponent, useState } from 'react'
import loadable from '@loadable/component'
import {LoginProps} from '../types'
import Login from './Login'
import SignUp from './SignUp'



const LoginLobby:FunctionComponent<LoginProps> = ({gotrue}) => {
  const [logged, setLogged] = useState("login")
  return (
      <div className="w-full min-h-screen bg-gray-200 flex justify-center items-center">
        <div className="p-8 w-1/3 rounded-lg shadow border-2 border-white bg-blue-700 h-1/3">
          <div className="flex text-gray-200  justify-center">
            <div className="px-2 hover:text-white active:font-bold" onClick={()=> {
              setLogged('login')
            }}>
              INICIAR SESIÓN
            </div>
            <div className="px-2">|</div>
            <div className="px-2 hover:text-white active:font-bold" onClick={()=> {
              setLogged('signUp')
            }}>
              CREAR USUARIO
            </div>
          </div>
          {logged === 'login' &&
            <Login gotrue={gotrue}/>
          }
          {logged === 'signUp' &&
            <SignUp gotrue={gotrue}/>
          }
        </div>
      </div>
  )
}

export default LoginLobby