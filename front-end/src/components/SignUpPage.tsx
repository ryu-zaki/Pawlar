import React, { useState, type FormEvent } from "react";
import { GoogleLogoIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { Button } from "@heroui/react";
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

      const [errors, setErrors] = useState({
        firstName: "", 
        lastName: "",
        email: "", 
        password: "", 
        confirmPassword: ""
      });

      const[passwordStrength, setPasswordStrength] = useState("");
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const navigate = useNavigate();

    //   REGEX

    const nameRegex = /^[A-Za-z]+(?:[' -][A-Za-z]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

      const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = target;
        setUserInfo((prev) => ({...prev, [id]: value, }));

        let errorMessage = "";
        switch (id) {
            case "firstName":
                if (!value) errorMessage = "First name is required.";
                else if (!nameRegex.test(value)) errorMessage = "First name must containt letters only.";
            break;
            case "lastName":
                if (!value) errorMessage = "Last name is required.";
                else if (!nameRegex.test(value)) errorMessage = "Last name must containt letters only.";
            break;
            case "email":
                if (!value) errorMessage = "Email is required.";
                else if (!emailRegex.test(value)) errorMessage = "Enter a valid email address.";
            break;
            case "password":
                if (!value) errorMessage = "Password is required.";
                else if (!passRegex.test(value)) errorMessage = "Password must contain 8 characters";
                if (value.length < 8) setPasswordStrength("Weak");
                else if (value.length < 10) setPasswordStrength("Medium");
                else setPasswordStrength("Strong");
            break;
            case "confirmPassword":
                if (value !== userInfo.password) errorMessage = "Password do not match";
                break;               
        }
        
        setErrors((prev) => ({
            ...prev,
            [id]: errorMessage,
        }));
      };

    const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

        const newErrors = {
           firstName: !nameRegex.test(userInfo.firstName)
        ? "First name should contain only letters." : "",
            lastName: !nameRegex.test(userInfo.lastName)
        ? "Last name should contain only letters." : "",
            email: !emailRegex.test(userInfo.email) ? "Enter a valid email address." : "",
            password: !passRegex.test(userInfo.password)
        ? "Password must be at least 8 chars, include uppercase, lowercase, number, and symbol." : "",
            confirmPassword: userInfo.password !== userInfo.confirmPassword 
        ? "Passwords do not match." : "",
    };  setErrors(newErrors);

        if (Object.values(newErrors).some((err) => err)) return;

        try{
            const response = await api.post("/auth/register", userInfo)
            const data = await response.data;

            if (!response) {
                console.log("Welcome,", data.user?.firstName);
                throw new Error();
            }


        } catch(err) {
            console.log(err)
        
        }
    }

    return ( 
        <>
        <div className="w-screen bg-flesh h-auto gap-2">

            {/* Background */}
            <div className="bg-flesh flex flex-col items-center justify-center h-auto"></div>

            {/* Dog Images */}
            <div className="flex items-center justify-center relative">
                <img src="/assets/LOGIN-DOG.svg" alt="Dog" className="max-w-[50%] relative z-10 translate-x-2 translate-y-15" />
                <img src="/assets/LOGIN-CAT.svg" alt="Cat" className="max-w-[50%] -ml-20 translate-x-2 translate-y-25" />
            </div>

            {/* Sign Up page */}
            <div className="w-full bg-[#FFFEFE] flex flex-col justify-start h-auto">
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
                <form onSubmit={handleSignUp} className="space-y-4 mx-7 mt-5">
                    {/* Main form */}
                    <div>
                        
                        <label className="block text-[4vw] mb-1 text-p-gray">
                            First Name
                        </label>                   
                        <input
                            id="firstName"
                            onChange={handleChange}
                            value={userInfo.firstName}
                            className="bg-white shadow text-[4vw] p-2 w-full h-10 rounded-[15px] mb-2 outline-p-gray"
                            placeholder="Enter your first name"                         
                        />
                        {errors.firstName && (
                            <p className="text-error-red text-[3.5vw] mb-2">{errors.firstName}</p>
                        )}
                        
                        <label className="block text-[4vw] mb-1 text-p-gray">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            onChange={handleChange}
                            value={userInfo.lastName}
                            className="bg-white shadow text-[4vw] p-2 w-full h-10 rounded-[15px] mb-2 outline-p-gray"
                            placeholder="Enter your last name"                           
                        />
                        {errors.lastName && (
                            <p className="text-error-red text-[3.5vw] mb-2">{errors.lastName}</p>
                        )}
                

                        <label className="block text-[4vw] mb-1 text-p-gray">
                        Email
                        </label>
                        <input
                        onChange={handleChange}
                        id="email"
                        value={userInfo.email}
                        type="text"
                        className="bg-white shadow text-[4vw] p-2 w-full h-10 rounded-[15px] mb-2 outline-p-gray"
                        placeholder="user@gmail.com"
                        />
                        {errors.email && (
                            <p className="text-error-red text-[3.5vw] mb-2">{errors.email}</p>
                        )}

                        <label className="block text-[4vw] mb-1 text-p-gray">
                        Password
                        </label>
                        <div className="relative">
                            <input
                            id="password"
                            onChange={handleChange}
                            value={userInfo.password}
                            type={showPassword ? "text" : "password"}
                            className="bg-white shadow text-[4vw] p-2 w-full h-10 rounded-[15px] mb-2  outline-p-gray"
                            placeholder="Enter password"
                            required
                            />
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
                        {passwordStrength && (
                            <p className={`text-[3.5vw] ${
                                passwordStrength === "Weak"
                                ? "text-red-500"
                                : passwordStrength === "Medium"
                                ? "text-yellow-500"
                                : "text-green-600"
                            }`}
                            >
                                Password strength: {passwordStrength}
                            </p>
                        )}
                        {errors.password && (
                             <p className="text-error-red text-[3.5vw] mb-2">{errors.password}</p>
                        )}

                        <label className="block text-[4vw] mb-1 text-p-gray">
                        Confirm Password
                        </label>
                        <div className="relative">
                            <input
                            id="confirmPassword"
                            onChange={handleChange}
                            value={userInfo.confirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            className="bg-white shadow text-[4vw] p-2 w-full h-10 rounded-[15px] mb-2  outline-p-gray"
                            placeholder="Confirm password"
                            required
                            />
                            <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-2 text-gray-500">
                            {showConfirmPassword ? (
                                <EyeIcon size={22} weight="regular" />
                                ) : (
                                <EyeSlashIcon size={22} weight="regular" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                             <p className="text-error-red text-[3.5vw] mb-2">{errors.confirmPassword}</p>
                        )}

                        
                        {/* Save button */}
                        <Button
                        type="submit"
                        className="w-full h-10 mt-4 bg-brown-orange text-white text-[4.5vw] rounded-[15px] border-2 border-white shadow-sm">
                        Sign up
                        </Button>
                    </div>
                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="grow h-px bg-gray-300"></div>
                        <span className="mx-2 text-p-gray text-[4vw]">or</span>
                        <div className="grow h-px bg-gray-300"></div>
                    </div>
                    {/* Google */}
                    <div className="relative flex items-center justify-center mt-[15vw] bottom-4">
                        <button
                            type="button"
                            className="absolute w-full h-10 z-0 bg-white text-p-gray text-[4.5vw] rounded-[15px] border border-brown-orange shadow-sm">
                            <GoogleLogoIcon 
                            size={20}
                            className="absolute z-10 flex items-center justify-center translate-x-15 translate-y-1"           
                            />
                            Continue with Google
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal
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
                            ${ modalMessage.toLowerCase().includes("successfully") ? "text-p-green" : "text-error-red"}
                            `}>
                            Tap to continue
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}

        </div>
        </>
    );
}
export default SignUpPage;