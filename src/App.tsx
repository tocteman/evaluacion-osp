import React from 'react';
import '../src/assets/css/styles.css';
import useSWR from 'swr'
import Sidebar from "./components/sidebar";
import PageContainer from './pages/pageContainer'
import {BrowserRouter as Router } from "react-router-dom"
 
const fetcher = (url: string) => fetch(url).then(res =>{ 
  return res.json()
})
const App = () =>  {

  const {data, error} = useSWR('.netlify/functions/hello-world', fetcher)

  if (error) return <div>There's been a problem</div>
  if (!data) return <div>Loading...</div>
  return (
    <Router>
    <div className="min-h-screen flex font-sans">
      <div className="w-1/5 flex flex-col min-h-screen bg-gray-200 font-sans">
        <Sidebar/>
      </div>
      <div className="w-4/5">
        <PageContainer/>
      </div>
    </div>
    </Router>
  );
}

export default App;
