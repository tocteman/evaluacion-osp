import React, {useEffect} from 'react';
import '../src/assets/css/styles.css';
import useSWR from 'swr'
import Sidebar from "./components/sidebar";
import PageContainer from './pages/pageContainer'
import {BrowserRouter as Router, useHistory, Route, Switch } from "react-router-dom"
import GoTrue from 'gotrue-js'
import loadable from '@loadable/component'
 
// const fetcher = (url: string) => fetch(url).then(res =>{ 
//   return res.json()
// })

const App = () =>  {
  const history = useHistory()
  const auth = new GoTrue({
    APIUrl: 'https://<your domain name>/.netlify/identity',
    audience: '',
    setCookie: false,
  });

  // const {data, error} = useSWR('.netlify/functions/hello-world', fetcher)
  

  // if (error) return <div>There's been a problem</div>
  // if (!data) return <div>Loading...</div>

  



  const LazyPage = loadable(() => import(`./pages/pageContainer`), {
    fallback: <div>loading...</div>
  })
  const LazyLogin = loadable(() => import(`./pages/LoginLobby`), {
    fallback: <div>loading...</div>
  })

  return (
    <Router>
    <div className="min-h-screen flex font-sans">
      <Switch>
        <Route path="/login">
          <LazyLogin gotrue={auth}/>
        </Route>
        <Route path="/">
          <LazyPage gotrue={auth}/>
        </Route>
      </Switch>


    </div>
    </Router>
  );
}

export default App;
