import { useState, type FormEvent } from "react";
import { EnvelopeSimple, CaretLeftIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../utils/requests";
import { useContext } from 'react';
import { ForgotPasswordContext } from "./ForgotPasswordParent";

const EmailSendOTP = () => {
  const navigate = useNavigate();
  const [email, setUserEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { setEmail } = useContext(ForgotPasswordContext)!;

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSendOTP = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    if (trimmedEmail.length === 0) {
      setError("Please input an email.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Invalid email format.");
      return;
    }

    setLoading(true);

    try {
      const response = await requestPasswordReset(trimmedEmail);
      setEmail(trimmedEmail);

      const expiryTime = Date.now() + 30000;
      localStorage.setItem('otpCooldownExpiry', expiryTime.toString());

      localStorage.setItem('otpActualExpiry', response.expiresAt);
      navigate("verify");

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="bg-flesh h-screen flex flex-col justify-center items-center font-['League_Spartan'] relative">
      {/* Back Button*/}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("../login")}
          className="bg-[#C4703D] text-white rounded-full p-2">
          <CaretLeftIcon size={20} weight="bold" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-start text-left space-y-8 w-[300px]">
        <div>
          <h1 className="text-[#A0561D] text-[35px] font-bold"> Email Address Here </h1>
          <p className="text-p-gray text-[18px]"> Enter email address associated with your account. </p>
        </div>

        <form
          onSubmit={handleSendOTP}
          className="flex flex-col items-start text-left gap-5 w-full"
        >
          {/* Email Input */}
          <div className="relative w-full">
            <EnvelopeSimple
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
              className={`bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] text-s pl-10 p-2 w-full h-10 rounded-[15px] outline-p-gray placeholder:text-[#B3B3B3]
              ${error ? "border border-error-red" : ""}`}
            />
          </div>

          {error && (
            <p className="text-error-red text-sm text-center w-full">{error}</p>
          )}

          {/* Send OTP Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-[#C4702E] text-white text-[16px] font-['Wendy_One'] rounded-[15px] hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send verification code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailSendOTP;