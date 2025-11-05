
import React, { useState, type FormEvent } from "react";
import { EyeIcon, EyeSlashIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import { Button } from "@heroui/react";
import {jwtDecode} from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import api, { setAccessToken } from "../utils/api";
import { useLogin } from '../contexts/LoginContext';
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

interface GooglePayload {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google user ID
}


const LoginPage = () => {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const { setIsLogin, setCredentials, setIsEmailVerified } = useLogin();
  
  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalMessage, setModalMessage] = useState("");
  // const [modalHeader, setModalHeader] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const validatePass = (password: string) => {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passRegex.test(password);
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(userInfo.email)) {
      setEmailError("Invalid email format.");
      return;
    }

    if (!validatePass(userInfo.password)) {
      setPasswordError("Invalid credentials")
      return;
    }
    
    try {
      const response = await api.post("/auth/login", userInfo)

      if (response.status === 401) throw new Error();

      const data = response.data;
      
      setCredentials(data.user)
      setAccessToken(data.accessToken);
      setIsLogin(true);
      setIsEmailVerified(true);
      toast.success("Successfully logged In.");
      navigate("/sample");
    }

    catch (err: any) {
      console.log(err);
      // backend stuff

      switch(err.status) {
         case 403:
           toast.error("Account doesn't exists")
         break;

         case 401:
           toast.error("Incorrect Email or Password");
         break;

         default:
           toast.error("Something Went wrong");
         break;
      }
      
    }
  }


  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prev => {
      return ({ ...prev, [target.id]: target.value }); }) 

      if (target.id === "email") setEmailError("");
      if (target.id === "password") setPasswordError("");
    
    };


  const handleLoginSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) return;

    // Decode JWT (optional, just to view data on frontend)
    const decoded: GooglePayload = jwtDecode(credentialResponse.credential);
    console.log("Google user:", decoded);
    
    try {
    // Send token to backend
    await api.post("/auth/google", decoded);
    toast.success("Successfully logged In.");
    setIsEmailVerified(true);
    setIsLogin(true);
    
    }

    catch(err) {
      console.log(err);
      toast.error("Google login failed. Please try again.")
    }
    
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: () => toast.error("Something went wrong")
  })


  return (
    <div className="w-screen bg-flesh h-auto">

      {/* Background */}
      <div className="bg-flesh flex-col items-center justify-center h-auto">
      </div>

      {/* Dog images */}
      <div className="flex items-center justify-center relative">
        <img src="/assets/LOGIN-DOG.svg" alt="Dog" className="max-w-[50%] relative z-10 translate-x-2 translate-y-15" />
        <img src="/assets/LOGIN-CAT.svg" alt="Cat" className="max-w-[50%] -ml-20 translate-x-2 translate-y-25" />
      </div>


      {/* Login Page */}
      <div className="w-full bg-[#FFFEFE] flex flex-col justify-start h-auto">
        <div className="mx-7 mt-15">
          <h1 className="text-[7vw] text-brown-orange font-wendy">
            Log In
          </h1>
          <p className="text-gray-400 text-[4vw]">
            Don't have an account? {" "}
            <Link to={'/auth/signup'} className="text-brown underline cursor-pointer">Sign up</Link>           
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mx-7 mt-5">
          <div>
            <label className="block text-[4vw] mb-1 text-p-gray">
              Email
            </label>
            <input
              onChange={handleChange}
              id="email"
              value={userInfo.email}
              type="text"
              className={`bg-white shadow text-[4vw] p-2 w-full h-10 rounded-[15px] mb-2  
                ${ emailError ? "border border-error-red" : "outline-p-gray" }`}
              placeholder="Enter your email"              
            />
            {emailError && (
              <p className="text-error-red text-[3.5vw] mb-1">{emailError}</p>
            )              
            }

            <label className="block text-[4vw] mb-1 mt-2 text-p-gray">
              Password
            </label>
            <div className="relative">
              <input
              id="password"
              onChange={handleChange}
              value={userInfo.password}
              type={showPassword ? "text" : "password"}
              className={`bg-white shadow text-[4vw] p-2 w-full h-10 rounded-[15px] mb-2 outline-p-gray 
                ${ passwordError ? "border border-error-red" : "" }`}
              placeholder="Enter your password"            
              />
              {passwordError && (
              <p className="text-error-red text-[3.5vw] mb-1">{passwordError}</p>
            )
              
            }
              <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500">
              {showPassword ? (
                  <EyeIcon size={22} weight="regular" />
                  ) : (
                  <EyeSlashIcon size={22} weight="regular" />
                  )}
              </button>
          </div>

            <div className="mt-2 flex items-center justify-between">
              {/* <div>
                <input type="checkbox" className="h-3 w-3" />
                <label className="ml-2 text-[4vw] text-p-gray">
                  Remember me
                </label>
              </div> */}
              <p
              className="text-[#A95A29] font-semibold justify-end"
              onClick={() => navigate('../otp')}>
                Forgot Password?
              </p>

            </div>

            {/* Save button */}
            <Button
              type="submit"
              className="w-full h-10 mt-4 bg-brown-orange text-white text-[4.5vw] rounded-[15px] border-2 border-white shadow-sm">
              Log in
            </Button>
          </div>

          <div className="flex items-center my-4">
            <div className="grow h-px bg-gray-300"></div>
            <span className="mx-2 text-p-gray text-[4vw]">or</span>
            <div className="grow h-px bg-gray-300"></div>
          </div>

          <div className="relative flex items-center justify-center mt-[15vw] bottom-4">
            
      


            <button
              onClick={() => login()}
              type="button"
              className="absolute w-full h-10 z-0 bg-white text-p-gray text-[4.5vw] rounded-[15px] border shadow-sm">
              <GoogleLogoIcon
                size={20}
                className="absolute z-10 flex items-center justify-center translate-x-15 translate-y-1"
              />
              Continue with Google
            </button>
          </div>
        </form>
      </div>

      {/* <Modal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        isDismissable={false}
        backdrop="opaque"
        placement="center"
        className="w-[85vw] h-[20vh] flex flex-center items-center z-30 rounded-2xl shadow-lg">
        <ModalContent className="bg-white-button text-center p-6">
          <ModalHeader
            className="text-brown-orange text-semibold text-[5vw] translate-y-[3vw]">
            {modalHeader} </ModalHeader>
          <ModalBody>
            <p className="-translate-y-[2vw] text-[4vw]">{modalMessage}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => setModalOpen(false)}
              className={`bg-transparent text-[4vw] -translate-y-[6vw] 
                ${modalMessage.toLowerCase().includes("successfully") ? "text-[#17592B]" : "text-[#B31919]"}
                `}>
              Tap to continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

    </div>
  );
};

export default LoginPage;
