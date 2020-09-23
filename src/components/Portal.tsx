import React, { useEffect, FunctionComponent, useState } from "react";
import { createPortal } from "react-dom";


const Portal:FunctionComponent = ({ children }) => { 
 
 const portalElement = document.getElementById("portal");
 const el = document.createElement("div");
  
 useEffect(() => {    
  portalElement!.appendChild(el);  
 }, [portalElement, el]);   


 useEffect(() => {    
  return () => {portalElement!.removeChild(el)}; 
 }); 


 return createPortal(children, el);
};

const Modal:FunctionComponent = ({ children }) => {
  const [open, setOpen] = useState(true)
  
  const toggle = () => {
    setOpen(!true)
  }

  const CloseIcon = () => {
    return (
      <svg className="w-6 h-6 cursor-pointer text-indigo-100 hover:text-white hover:underline" onClick={()=> setOpen(false)} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    )
  }

  return (
    <Portal> 
    {open &&     
      <div className="fixed modalWrapper">       
        <div className="relative w-1/2 z-50 mb-12 bg-indigo-800 rounded-lg shadow p-8">          
          <CloseIcon/>
          {React.isValidElement(children) && React.cloneElement(children as React.ReactElement<any>, {toggleFunction: toggle}
          )}
        </div>
        <div onClick={toggle} className="w-full min-h-screen absolute bg-indigo-900 opacity-50" />      
      </div>    
    } 
    </Portal>  
  )

}  

export default Modal