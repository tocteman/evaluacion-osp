import React from 'react'
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import loadable from '@loadable/component'
import Peliculas from './Peliculas';
import Turnos from './Turnos';

const LazyPeliculas = loadable((props:any) => import(`./Peliculas`), {
  fallback: <div>loading...</div>
})
const LazyTurnos = loadable((props:any) => import(`./Turnos`), {
  fallback: <div>loading...</div>
})

const PageContainer = () => {
  const location = useLocation()


  return (
    <Switch location={location}>
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
    </Switch>
  )
}

export default PageContainer

