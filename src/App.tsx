import React from "react";
import "../src/assets/css/styles.css";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import GoTrue from "gotrue-js"
import loadable from "@loadable/component"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import Loader from "./components/Loader"


 

const App = () =>  {
  const auth = new GoTrue({
    APIUrl: "https://evaluacion-osp.netlify.app/.netlify/identity",
    audience: "",
    setCookie: true,
  });


  const LazyPage = loadable(() => import(`./pages/PageContainer`), {
    fallback: <Loader/>
  })
  const LazyLogin = loadable(() => import(`./pages/LoginLobby`), {
    fallback: <Loader/>
  })

  return (
    <Router>
      <ToastContainer 
        // className="bg-blue-500"
        bodyClassName="bg-indigo-700 text-lg text-white font-bold"
        toastClassName="bg-indigo-700 rounded-lg font-sans"
        position="top-center"
        autoClose={500000000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          backgroundColor: "#4c51bf!important",
          borderRadius: "16px"
        }}
      />
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
