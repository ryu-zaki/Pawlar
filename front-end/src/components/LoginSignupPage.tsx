import { Outlet } from "react-router-dom";

const LoginPage = () => {

    return (
      <div className="mt-20">
         <div className="text-center">
            <div className="border-4 mb-8 mx-auto border-primary-dark rounded-full w-fit p-2">
               <img src="pawlar-icon.png" alt="" />
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark">PawthFinder</h1>
            <p className="text-primary-dark text-xl mt-1">Track your pet</p>
         </div>
         
         <div>
           <div className="mt-10">
             <button>Sign in</button><button>Sign up</button>
           </div>
           
            <Outlet></Outlet>
         </div>
         
      </div>
    )
}

export default LoginPage;