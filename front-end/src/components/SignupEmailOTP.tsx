import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { GreaterThanIcon } from "@phosphor-icons/react";
import api from '../utils/api';
import { useLogin } from '../contexts/LoginContext';
import React from 'react';
import { toast } from "sonner";

const SignupEmailOTP = () => {
  const navigate = useNavigate();
  const { credentials, setIsEmailVerified, setIsLogin } = useLogin();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showConfirmBack, setShowConfirmBack] = useState(false);
  const [error, setError] = useState<string>("");
  const [cooldown, setCooldown] = useState<number>(0);

  const isOtpComplete = otp.every(digit => digit.length === 1);

  React.useEffect(() => {
    const checkCooldown = () => {
      const expiryTime = localStorage.getItem('otpSignupExpiry');
      if (expiryTime) {
        const remainingTime = Number(expiryTime) - Date.now();
        if (remainingTime > 0) {
          setCooldown(Math.ceil(remainingTime / 1000));
        } else {
          setCooldown(0);
          localStorage.removeItem('otpSignupExpiry');
        }
      }
    }

    checkCooldown();

    const interval = setInterval(checkCooldown, 1000);

    return () => clearInterval(interval);
  }, [])

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value === "" && index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        prevInput?.focus();
      } else if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {

    e.preventDefault();
    setError("");

    if (!isOtpComplete) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    try {
      const response = await api.post("/auth/validate-code", {
        email: credentials.email,
        code: otpString
      });

      if (response.status == 200) {
        toast.success("Create account successfully.");
        localStorage.removeItem('otpSignupExpiry');
        setIsEmailVerified(true);
        setIsLogin(true);
        navigate("/sample");

      } else {
        alert("Error")
      }
    }

    catch (err) {
      console.log(err);
    }

  };

  const handleResend = async () => {

    if (cooldown > 0) return;
    console.log("Clicked");
    console.log("Email in credentials: " + credentials.email);
    try {
      const response = await api.post('/auth/resend-otp', { email: credentials.email });

      if (response.status) {
        // alert("Verification Code Resent.");
        toast.success("Verification Code Resent.");

        const expiryTime = Date.now() + 30000;
        localStorage.setItem('otpSignupExpiry', expiryTime.toString());
        setCooldown(30);
      } else {
        toast.error("Failed to resend. Please try again.");
      }
    }

    catch (err) {
      console.log(err);
    }
  }



  return (
    <>
      <div className="bg-flesh h-screen flex flex-col justify-center items-center font-['League_Spartan'] relative">
        {/* Back Button */}
        <button
          onClick={() => setShowConfirmBack(true)}
          className="absolute top-6 left-6 bg-[#C4703D] text-white rounded-full p-2">
          <GreaterThanIcon size={20} weight="bold" className="rotate-180" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-start text-left space-y-4 w-[280px]">
          <div>
            <h1 className="text-[#A0561D] text-[35px] font-bold">Email verification</h1>
            <p className="text-p-gray text-[18px]">
              Please enter the one-time verification code sent to your email address.
            </p>
          </div>

          {/* OTP Input Boxes */}
          <div className="flex justify-center space-x-2 mt-4">
            {otp.map((digit, index) => (<input
              id={`otp-input-${index}`}
              key={index}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-10 h-10 border border-gray-300 rounded-md text-center text-lg focus:outline-[#C4703D] bg-white shadow-sm"
            />
            ))}
          </div>

          {/* Error Message Display */}
          {error && (
            <p className="text-red-600 text-sm text-center w-full pt-2">{error}</p>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleVerify}
            disabled={!isOtpComplete}
            className={`w-[280px] h-10 text-white text-[16px] font-['Wendy_One'] rounded-[15px] mt-2 transition
              ${!isOtpComplete
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#C4702E] hover:opacity-90'
              }
            `}
          >
            Verify Email
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          If you didn’t receive the code:&nbsp;
          <button
            onClick={handleResend}
            disabled={cooldown > 0}
            className={cooldown != 0
              ? "text-[#aaaa]  font-semibold"
              : "text-[#C4703D] font-semibold hover:underline"} >
            {cooldown > 0 ? `Resend in ${cooldown}` : "Resend"}
          </button>
        </p>

        {showConfirmBack && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/60">
            <div className="bg-white p-5 rounded-[15px] shadow-x4 text-center w-[310px]">
              <p className="text-[#A0561D] font-medium mb-4"> Go back to the Sign up?</p>
              <div className="flex justify-around mt-6 gap-2">
                <button
                  onClick={() => setShowConfirmBack(false)}
                  className="bg-gray-200 text-gray-700 px-10 py-2 rounded-[10px] font-medium hover:bg-gray-300 transition"> Cancel </button>
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="bg-[#A63A2B] text-white px-9 py-2 rounded-[10px] font-medium hover:opacity-90 transition"> Yes </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

};
export default SignupEmailOTP;