import React from "react";
import "../src/assets/css/styles.css";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import GoTrue from "gotrue-js"
import loadable from "@loadable/component"
 

const App = () =>  {
  const auth = new GoTrue({
    APIUrl: "https://evaluacion-osp.netlify.app/.netlify/identity",
    audience: "",
    setCookie: false,
  });


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
