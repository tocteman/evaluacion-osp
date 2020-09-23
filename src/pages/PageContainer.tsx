import React, {useEffect, FunctionComponent} from "react"
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import Sidebar from "../components/Sidebar"
import Loader from "../components/Loader"
import Header from "../components/Header"
import {Fetcher} from "../components/Fetcher"
import useSWR from "swr"
import Turnos from "./Turnos"
import Peliculas from "./Peliculas"
import Perfil from "./Perfil"
import Administradores from "./Administradores"



type PageContainerProps = {
  gotrue: any
}

const PageContainer: FunctionComponent<PageContainerProps> = ({gotrue}) => {
  const location = useLocation()
  const {data, error} = useSWR('https://evaluacion-osp.netlify.app/.netlify/functions/getData', Fetcher)
  const history = useHistory()  
  const user = typeof window !== "undefined" && gotrue.currentUser();
  useEffect(() => {
    if (!user){
      history.push("/login")
    } 
  }, [user, history])
  if (error) return <div>"Hubo un error"</div>
  if (!data) return <Loader/>

  return (
    <div className="flex-col w-full">
      <Header/>
      <div className="flex">
        <div className="w-1/5 flex flex-col min-h-screen bg-gray-100 shadow">
          <Sidebar/>
        </div>
        <div className="w-4/5"> 
        <Switch location={location}>
          <Route path="/" exact>
            <Peliculas data={data.data}/>
          </Route>
          <Route path="/peliculas" exact>
            <Peliculas data={data.data}/>
          </Route>
          <Route path="/turnos" exact>
            <Turnos data={data.data}/>
          </Route>
          <Route path="administradores" exact>
            <Administradores user={user}/>
          </Route>
         <Route path="perfil" exact>
            <Perfil user={user}/>
          </Route>
          </Switch>
        </div>
      </div>
    </div> 
  )
}

export default PageContainer

