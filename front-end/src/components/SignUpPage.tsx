import React, { useState, type FormEvent } from "react";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const SignUpPage = () => {
    const [userInfo, setUserInfo] = React.useState({
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        confirmPassword: ""
      });
      const [modalOpen, setModalOpen] = useState(false);
      const [modalMessage, setModalMessage] = useState("");
      const [modalHeader, setModalHeader] = useState("");
      const navigate = useNavigate();

      const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        if (userInfo.password !== userInfo.confirmPassword) {
        alert("Password doesn't match.")
          return;
      }
        try{
            const response = await api.post("/auth/register", userInfo)
            const data = await response.data;

            if (!response) {
                console.log("Welcome,", data.user?.firstName);
                throw new Error();
            }

            setModalHeader("Account created successfully!");
            setModalMessage("Sign-up Successful!")
            setModalOpen(true);

            setTimeout(() => {
                setModalOpen(false);
                navigate('/sample');
            }, 2000);

        } catch(err) {
            console.log(err)
            setModalHeader("Account creation failed.")
            setModalMessage("Please try again.");
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
        <>
        <div className="w-screen bg-[#FFEBD8] h-auto">

            {/* Background */}
            <div className="bg-[#FFEBD8] flex flex-col items-center justify-center h-auto"></div>

            {/* Dog Images */}
            <div className="flex items-center justify-center relative">
                <img src="/assets/LOGIN-DOG.svg" alt="Dog" className="max-w-[50%] relative z-10 translate-x-2 translate-y-15" />
                <img src="/assets/LOGIN-CAT.svg" alt="Cat" className="max-w-[50%] -ml-20 translate-x-2 translate-y-25" />
            </div>

            {/* Sign Up page */}
            <div className="bg-[#FFFEFE] flex flex-col justify-start h-auto">
                {/* Header */}
                <div className="mx-7 mt-10">
                  <h1 className="text-[7vw] text-brown-orange font-wendy">
                    Sign Up
                </h1>
                <p className="text-gray-400">
                    Already have an account? {" "}
                    <a
                    onClick={() => navigate('/auth/login')}
                    className="text-brown underline cursor-pointer">Log in</a>
                </p>
                </div>
                {/* Form */}
                <form onSubmit={handleSignUp} className="space-y-4 mx-7 mt-8">
                    {/* Main form */}
                    <div>
                        <div className="flex flex-row w-full gap-26">
                        <label className="block text-[4vw] mb-1 text-p-gray">
                        First Name
                        </label>
                        <label className="block text-[4vw] mb-1 text-p-gray">
                        Last Name
                        </label>
                    </div>

                    <div className="flex flex-row w-full gap-2">
                        <input
                        id="firstName"
                        onChange={handleChange}
                        value={userInfo.firstName}
                        className="bg-white shadow text-[4vw] p-2 w-full h-[40px] rounded-[15px] mb-2 outline-[#7F7F7F]"
                        placeholder="First name"
                        required
                    />
                    <input
                        id="lastName"
                        onChange={handleChange}
                        value={userInfo.lastName}
                        className="bg-white shadow text-[4vw] p-2 w-full h-[40px] rounded-[15px] mb-2 outline-[#7F7F7F]"
                        placeholder="Last name"
                        required
                    />
                    </div>

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

                        <label className="block text-[4vw] mb-1 text-p-gray">
                        Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            onChange={handleChange}
                            value={userInfo.confirmPassword}
                            type="password"
                            className="bg-white shadow text-[4vw] p-2 w-full h-[40px] rounded-[15px] mb-2 outline-[#7F7F7F]"
                            placeholder="Confirm Password"
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
                        Sign up
                        </button>
                    </div>
                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-2 text-p-gray text-[4vw]">or</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>
                    {/* Google */}
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

            {/* Modal */}
            <Modal
            isOpen={modalOpen} 
            onOpenChange={setModalOpen} 
            isDismissable={false} 
            backdrop="opaque"
            placement="center"
            className="w-[85vw] h-[20vh] flex flex-center items-center z-30 rounded-2xl shadow-lg">
                <ModalContent className="bg-white-button text-center p-6">
                    <ModalHeader className="text-brown-orange text-semibold text-[5vw] translate-y-[3vw]">
                        {modalHeader}
                    </ModalHeader>
                    <ModalBody>
                        <p className="-translate-y-[2vw] text-[4vw]">{modalMessage}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={() => setModalOpen(false)}
                            className={`bg-transparent text-[4vw] -translate-y-[6vw] 
                            ${ modalMessage.toLowerCase().includes("successfully") ? "text-[#17592B]" : "text-[#B31919]"}
                            `}>
                            Tap to continue
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
        </>
    );
}
export default SignUpPage;