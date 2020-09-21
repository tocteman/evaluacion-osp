import React, {useEffect, FunctionComponent} from 'react'
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import loadable from '@loadable/component'
import Sidebar from '../components/sidebar'

const LazyPeliculas = loadable(() => import(`./Peliculas`), {
  fallback: <div>loading...</div>
})
const LazyTurnos = loadable(() => import(`./Turnos`), {
  fallback: <div>loading...</div>
})

type PageContainerProps = {
  gotrue: any
}

const PageContainer: FunctionComponent<PageContainerProps> = ({gotrue}) => {
  const location = useLocation()
  const history = useHistory()  
  const user = typeof window !== 'undefined' && gotrue.currentUser();

  useEffect(() => {
    if (!user){
      history.push('/login')
    } 
  }, [user, history])

  return (
    <div className="w-full flex">
      <div className="w-1/5 flex flex-col min-h-screen bg-gray-200">
        <Sidebar/>
      </div>
      <div className="w-4/5"> 
      {/* <Switch location={location}> */}
        {/* <Route path="">
          <LazyPage page=""/>
        </Route> */}
        <Route path="/peliculas">
          <LazyPeliculas/>
          {/* <Peliculas/> */}
        </Route>
        <Route path="/turnos">
          <LazyTurnos/>
          {/* <Turnos/> */}
        </Route>
        {/* <Route path="administradores">
          <LazyPage page=""/>
        </Route> */}
        {/* <Route path="perfil">
          <LazyPage page=""/>
        </Route> */}
      {/* </Switch> */}
      </div>
    </div>
  )
}

export default PageContainer

