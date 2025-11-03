import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";

const EmailOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showConfirmBack, setShowConfirmBack] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    sessionStorage.setItem("pw_reset_otp", otpString);
    navigate("renew");
  };

  return (
    <div className="bg-flesh h-screen flex flex-col justify-center items-center font-['League_Spartan'] relative">
      {/* Back Button */}
<button
  onClick={() => setShowConfirmBack(true)}
  className="absolute top-6 left-6 bg-[#C4703D] text-white rounded-full p-2 shadow-md hover:bg-[#b35f2d] transition"
>
  <CaretLeft size={20} weight="bold" />
</button>

      {/* Content */}
      <div className="flex flex-col items-start text-left space-y-4 w-[280px]">
        <div>
          <h1 className="text-[#A0561D] text-[35px] font-bold">Enter verification code</h1>
          <p className="text-p-gray text-[18px]">
            Please enter the one-time pin sent to your email address.
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
          onClick={handleConfirm}
          className="w-[280px] h-10 bg-[#C4702E] text-white text-[16px] font-['Wendy_One'] rounded-[10px] mt-2 hover:opacity-90 transition"
        >
          Confirm
        </button>
      </div>

      {/* Resend (Note: Kailangan ng bagong function para dito) */}
      <p className="text-sm text-gray-600 mt-4">
        If you didn’t receive the code:{" "}
        <button className="text-[#C4703D] font-semibold hover:underline">
          Resend
        </button>
      </p>

      {/* Confirmation Modal */}
      {showConfirmBack && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/60">
        <div className="bg-white p-4 rounded-[10px] shadow-x4 text-center w-[310px]">
        <p className="text-[#A0561D] font-medium mb-8"> Go back to the email verification page? Your entered code won’t be saved.</p>
          <div className="flex justify-around mt-6">
            <button
                onClick={() => setShowConfirmBack(false)}
                className="bg-gray-200 text-gray-700 px-9 py-2 rounded-[10px] font-medium hover:bg-gray-300 transition"> Cancel </button>
            <button
                onClick={() => navigate("/")} 
                className="bg-[#A63A2B] text-white px-9 py-2 rounded-[10px] font-medium hover:opacity-90 transition"> Yes, I’m sure </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default EmailOTP;