

const LoginPage = () => {

  return (
    <div className=" bg-[#FFEBD8] grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 h-screen">
      {/* Background */}
      <div className="bg-[#FFEBD8] flex flex-col items-center justify-center">
        {/* You can add logo or slogan here */}
      </div>
      {/* Dog images */}
      <div className="flex items-center justify-center relative">
        <img src="/assets/LOGIN-DOG.svg" alt="Dog" className="max-w-[50%] relative z-10 translate-x-2 translate-y-20" />
        <img src="/assets/LOGIN-CAT.svg" alt="Cat" className="max-w-[50%] -ml-20 translate-x-2 translate-y-34" />
      </div>


      {/* Login Page */}
      <div className="bg-[#FFFEFE] flex flex-col justify-start xl:my-12">
        <div className="mx-7 mt-8">
          <h1 className="text-2xl text-brown">Sign up</h1>
          <p className="text-gray-400">
            Already have an account?{" "}
            <a className="text-brown underline cursor-pointer">Log in</a>
          </p>
        </div>

        <form className="space-y-4 mx-7 mt-8">
          <div>
            <label className="block text-[18px] mb-1 text-p-gray">
              Full Name
            </label>
            <input
              className="bg-white shadow text-xs p-2 w-[325px] h-[40px] rounded-[15px] mb-2 outline-[#7F7F7F]"
              placeholder="Enter full name"
            />

            <label className="block text-[18px] mb-1 text-p-gray">
              Phone Number
            </label>
            <input
              type="number"
              className="bg-white shadow text-xs p-2 w-[325px] h-[40px] rounded-[15px] mb-2 outline-[#7F7F7F]"
              placeholder="Enter phone number"
            />

            <label className="block text-[18px] mb-1 text-p-gray">
              Password
            </label>
            <input
              type="password"
              className="bg-white shadow text-xs p-2 w-[325px] h-[40px] rounded-[15px] mb-2 outline-[#7F7F7F]"
              placeholder="Enter password"
            />
            
            <label className="block text-[18px] mb-1 text-p-gray">
              Confrim Password
            </label>
            <input
              type="password"
              className="bg-white shadow text-xs p-2 w-[325px] h-[40px] rounded-[15px] mb-2 outline-[#7F7F7F]"
              placeholder="Confirm Password"
            />

            <div className="mt-2 flex items-center">
              <input type="checkbox" className="h-3 w-3" />
              <label className="ml-2 text-[17px] text-p-gray">
                Save account
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-[40px] mt-4 bg-brown-orange text-white text-[18px] rounded-[15px] border-2 border-white shadow-sm"
            >
              Sign up
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-2 text-p-gray text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full h-[40px] bg-white text-p-gray text-[18px] rounded-[15px] border shadow-sm"
          >
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
