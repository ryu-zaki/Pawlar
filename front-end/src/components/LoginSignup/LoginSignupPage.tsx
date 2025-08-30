import React from "react";
import { Outlet } from "react-router-dom";

const LoginPage = () => {
   
   const [isLoad, setIsLoad] = React.useState(true);
   
   React.useEffect(()=> {
      setTimeout(() => {
         setIsLoad(false);
      }, 2000);
   }, [])

    return isLoad ? (<div className="w-full h-screen flex justify-center items-center">
<div className="loader"></div>
    </div>) : (
      <div className="mt-20">
         <div className="text-center">
            <div className="border-4 mb-8 mx-auto border-primary-dark rounded-full w-fit p-2">
               <img src="pawlar-icon.png" alt="" />
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark">PawthFinder</h1>
            <p className="text-primary-dark text-xl mt-1">Track your pet</p>
         </div>
         
         <div>
           <div className="mt-10 mb-8 w-fit mx-auto border-primary-dark border flex relative  font-semibold text-lg bg-primary text-white rounded-full">
             <button className="px-10 py-3">Sign in</button><button className="px-8 py-3">Sign up</button>
             
             <div className="absolute w-1/2 h-full left-0 bg-white rounded-full text-primary flex justify-center items-center"><span>Sign in</span></div>
           </div>
           
            <Outlet/>
         </div>
         
      </div>)
    
}



export default LoginPage;