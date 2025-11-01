
import React, { useState, type FormEvent } from "react";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../utils/api";
import { useLogin } from '../contexts/LoginContext';


const LoginPage = () => {
  const [userInfo, setUserInfo] = React.useState({
    email: "", 
    password: "", 
  });
  const {setIsLogin} = useLogin();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const navigate = useNavigate();



  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
      try {
        const response = await api.post("/auth/login", userInfo) 

        if (response.status === 401)  throw new Error();
        
        const data = response.data;
        console.log(data);
        setAccessToken(data.accessToken);
            
        setModalHeader("Account logged in successfully!");
        setModalMessage("Login succesful!");
        setModalOpen(true);
        
        setTimeout(() => {
          setIsLogin(true);
        }, 2000);
        
      }

      catch(err) {
        console.log(err)
        setModalHeader("Oh no! Log in failed.");
        setModalMessage("Please try again");
        setModalOpen(true);
      }
  }


  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prev => {   
      return ({
        ...prev,
        [target.id]: target.value
      });
    })
  }


  return (
    <div className="w-screen bg-[#FFEBD8] h-auto">

      {/* Background */}
      <div className="bg-[#FFEBD8] flex flex-col items-center justify-center h-auto">
      </div>

      {/* Dog images */}
      <div className="flex items-center justify-center relative">
        <img src="/assets/LOGIN-DOG.svg" alt="Dog" className="max-w-[50%] relative z-10 translate-x-2 translate-y-15" />
        <img src="/assets/LOGIN-CAT.svg" alt="Cat" className="max-w-[50%] -ml-20 translate-x-2 translate-y-25" />
      </div>


      {/* Login Page */}
      <div className="bg-[#FFFEFE] flex flex-col justify-start h-auto">
        <div className="mx-7 mt-10">
          <h1 className="text-[7vw] text-brown-orange font-wendy">
            Log In
          </h1>
          <p className="text-gray-400">
              Don't have an account? {" "}
              <a
              onClick={ () => navigate('/auth/signup')}
              className="text-brown underline cursor-pointer">Sign up</a>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mx-7 mt-8">
          <div>
            <label className="block text-[4vw] mb-1 text-p-gray">
              Email
            </label>
            <input
              onChange={handleChange}
              id="email"
              value={userInfo.email}
              type="text"
              className="bg-white shadow text-[4vw] p-2 w-full h-[40px] rounded-[15px] mb-2 outline-[#7F7F7F]"
              placeholder="user@gmail.com"
              required
            />

            <label className="block text-[4vw] mb-1 text-p-gray">
              Password
            </label>
            <input
              id="password"
              onChange={handleChange}
              value={userInfo.password}
              type="password"
              className="bg-white shadow text-[4vw] p-2 w-full h-[40px] rounded-[15px] mb-2 outline-[#7F7F7F]"
              placeholder="Enter password"
              required
            />

            <div className="mt-2 flex items-center">
              <input type="checkbox" className="h-3 w-3" />
              <label className="ml-2 text-[4vw] text-p-gray">
                Save account
              </label>
            </div>
            
            {/* Save button */}
            <button
              type="submit"
              className="w-full h-[40px] mt-4 bg-brown-orange text-white text-[4.5vw] rounded-[15px] border-2 border-white shadow-sm">
               Log in
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-2 text-p-gray text-[4vw]">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="relative flex items-center justify-center mt-[15vw] bottom-4">
            <button
            type="button"
            className="absolute w-full h-[40px] z-0 bg-white text-p-gray text-[4.5vw] rounded-[15px] border shadow-sm">
            <GoogleLogoIcon 
            size={20}
            className="absolute z-10 flex items-center justify-center translate-x-15 translate-y-1"           
            />
            Continue with Google
            </button>
          </div>
        </form>
      </div>

          <Modal 
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
                ${ modalMessage.toLowerCase().includes("successfully") ? "text-[#17592B]" : "text-[#B31919]"}
                `}>
                  Tap to continue
                </Button>
              </ModalFooter>
              </ModalContent>
          </Modal>

    </div>
  );
};

export default LoginPage;
