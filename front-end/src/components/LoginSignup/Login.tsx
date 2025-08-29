



const LoginForm = () => {

   return (
      <form className="w-9/12 mx-auto flex flex-col gap-6">
         <div className="flex items-center label-animation bg-white rounded-full relative">
        
            <input placeholder="" className="border-0 outline-0 w-full py-3 px-4 rounded-full" id="phone-number" type="text" />
            <label htmlFor="phone-number" className="absolute transition-all durationn-1000 left-4 text-primary-dark">Phone Number</label>
         </div>
         
         <div className="flex items-center label-animation bg-white rounded-full relative">
            <input placeholder="" className=" border-0 outline-0 w-full py-3 px-4 rounded-full" id="password" type="password" />
            <label htmlFor="password" className="absolute left-4 transition-all durationn-1000 text-primary-dark">Password</label>
         </div>

         <a href="#" className="text-primary-dark underline text-sm">Forgot Password?</a>

         <input className="bg-primary text-white mt-5 py-3 rounded-full text-lg" type="submit" value="submit" />
      </form>
   )
}

export default LoginForm;