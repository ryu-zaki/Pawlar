import { useState, type FormEvent } from "react";
import { GreaterThanIcon, EnvelopeSimple } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../utils/requests";

const EmailSendOTP = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendOTP = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await requestPasswordReset(email);

      sessionStorage.setItem("pw_reset_email", email);
      sessionStorage.setItem("pw_reset_token", response.resetToken);

      navigate("verify");

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFEBD8] h-screen flex flex-col justify-center items-center font-['League_Spartan'] relative">
      {/* Back Button*/}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("../login")}
          className="bg-[#C4703D] text-white rounded-full p-3">
          <GreaterThanIcon size={20} className="rotate-180" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-start text-left space-y-8 w-[300px]">
        <div>
          <h1 className="text-[#A0561D] text-[35px] font-bold"> Mail Address Here </h1>
          <p className="text-[#7F7F7F] text-[18px]"> Enter email address associated with your account. </p>
        </div>

        <form
          onSubmit={handleSendOTP}
          className="flex flex-col items-start text-left space-y-3 w-full"
        >
          {/* Email Input */}
          <div className="relative w-full">
            <EnvelopeSimple
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input
              type="email"
              required
              placeholder="example@gmail.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] text-s pl-10 p-2 w-full h-[40px] rounded-[10px] outline-[#7F7F7F] placeholder:text-[#B3B3B3]"
            />
          </div>

          {/* Error Message Display */}
          {error && (
            <p className="text-red-600 text-sm text-center w-full">{error}</p>
          )}

          {/* Send OTP Button */}
          <button
            type="submit"
            disabled={loading} 
            className="w-full h-[40px] bg-[#C4702E] text-white text-[16px] font-['Wendy_One'] rounded-[15px] hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailSendOTP;