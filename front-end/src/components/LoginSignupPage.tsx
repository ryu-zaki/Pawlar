
const LoginPage = () => {

    return (
      <>
        <div>
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 h-screen">

        {/* Background */}
          <div className="bg-[#FFEBD8]">
            <div className="flex flex-col items-center xl:justify-center h-1 pt-10">
                
            </div>
          </div> 
        {/* Dog images */}
          <div className="flex items-center justify-center">
                <img src="front-end/src/assets/login-dog.png" alt="Dog" className="max-w-[80%]" />
                <img src="front-end/src/assets/login-cat.png" alt="Cat" className="max-w-[80%]" />
          </div>
        {/* Login Page */}
          <div className="bg-[#FFFEFE] h-full my-5 xl:my-12">
            <div className="flex flex-col justify-start gap-x-3 mx-7 mt-8">
              <h1 className="text-2xl font-bold text-brown">Sign up</h1>
              <p className="text-gray-400">Already have an account? <a className="text-brown">Log in</a></p>
            </div>

            <div>
              <form id="signupForm" className="space-y-4 flex flex-col justify-start gap-x-3 mx-7 mt-8">
                <div>
                  <label className="block text-[18px] mb-1 text-p-gray ">Full Name</label>
                  <input className="bg-white shadow-sm shadow-gray-400 text-xs p-2 w-[325px] h-[40px] outline-1 outline-[#7F7F7F] rounded-[15px] mb-2" placeholder="Enter full name"></input>
                  <label className="block text-[18px] mb-1 text-p-gray ">Phone Number</label>
                  <input type="number" className="bg-white shadow-sm shadow-gray-400 text-xs p-2 w-[325px] h-[40px] outline-1 outline-[#7F7F7F] rounded-[15px] mb-2" placeholder="Enter phone number"></input>
                  <label className="block text-[18px] mb-1 text-p-gray ">Password</label>
                  <input type="password" className="bg-white shadow-sm shadow-gray-400 text-xs p-2 w-[325px] h-[40px] outline-1 outline-[#7F7F7F] rounded-[15px] mb-2" placeholder="Enter password"></input>         

                <div className="mt-2">
                  <input type="checkbox" className="h-3 w-3"/>
                  <label className="ml-2 text-[17px] text-p-gray ">Save account</label>
                </div>
                  <button 
                  type="submit" 
                  className="w-full h-[40px] mt-2 bg-brown text-white text-[18px] rounded-[15px] border-2 border-white shadow-sm">Sign up</button>
                </div>

                <div className="flex items-center my-4">
                  <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="mx-2 text-p-gray text-sm">or</span>
                  <div className="flex-grow h-px bg-gray-300"></div>   
                </div>   

                <div className="space-y-4 flex flex-col justify-start gap-x-3 mx-7 mt-8">
                  <button type="button" className="w-full h-[40px] mt-2 bg-white text-p-gray text-[18px] rounded-[15px] outline-1 border-p-gray shadow-sm">
                    Continue with Google
                  </button>
                </div>
              </form>
            </div>
             
          </div>
          
        </div>
      </div>
      </>
    );
};

export default LoginPage;