import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { ForgotPasswordContext } from "./ForgotPasswordParent";
import { requestPasswordReset } from "../utils/requests";
import { toast } from "sonner";


const EmailOTP = () => {
  const navigate = useNavigate();
  const [localOtp, setLocalOtp] = useState(["", "", "", "", "", ""]);
  const [showConfirmBack, setShowConfirmBack] = useState(false);
  const [error, setError] = useState<string>("");
  const [cooldown, setCooldown] = useState<number>(0);

  const { email, setOtp: setGlobalOtp } = useContext(ForgotPasswordContext)!;

  useEffect(() => {
    const checkCooldown = () => {
      const expiryTime = localStorage.getItem('otpCooldownExpiry');
      if (expiryTime) {
        const remainingTime = Number(expiryTime) - Date.now();

        if (remainingTime > 0) {
          setCooldown(Math.ceil(remainingTime / 1000));
        } else {
          setCooldown(0);
          localStorage.removeItem('otpCooldownExpiry');
        }
      }
    };

    checkCooldown();

    const interval = setInterval(checkCooldown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...localOtp];
      newOtp[index] = value;
      setLocalOtp(newOtp);

      if (value === "" && index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        prevInput?.focus();
      } else if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const expiryString = localStorage.getItem('otpActualExpiry');
    if (!expiryString) {
      setError("Session error. Please request a new code.");
      return;
    }

    if (new Date() > new Date(expiryString)) {
      setError("Your verification code has expired. Please resend a new one.");
      return;
    }

    const otpString = localOtp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setGlobalOtp(otpString);
    navigate("../renew");
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    if (!email) {
      toast.error("Failed to resend code. Please try again.");
      return;
    }
    try {
      setError("");
      console.log(`Resending OTP to ${email}`);
      const response = await requestPasswordReset(email);

      toast.success(`Verification code resent to ${email}`);

      const expiryTime = Date.now() + 600000;
      localStorage.setItem('otpCooldownExpiry', expiryTime.toString());
      setCooldown(600);

      localStorage.setItem('otpActualExpiry', response.expiresAt);
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
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
        <form
          onSubmit={handleConfirm}
          className="w-full flex flex-col items-center"
        >
          {/* OTP Input Boxes */}
          <div className="flex justify-center space-x-2 mt-4">
            {localOtp.map((digit, index) => (<input
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

          <button
            type="submit"
            className="w-[280px] h-10 bg-[#C4702E] text-white text-[16px] font-['Wendy_One'] rounded-[10px] mt-2 hover:opacity-90 transition"
          >
            Confirm
          </button>
        </form>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        If you didn’t receive the code:&nbsp;
        <button
          onClick={handleResend}
          disabled={cooldown > 0}
          className="text-[#C4703D] font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed" // <--- I-update 'to
        >
          {cooldown > 0
            ? `Resend in ${Math.floor(cooldown / 60)}:${(cooldown % 60).toString().padStart(2, '0')}`
            : "Resend"}
        </button>
      </p>

      {/* Confirmation Modal */}
      {showConfirmBack && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/60">
          <div className="bg-white p-5 rounded-[15px] shadow-x4 text-center w-[310px]">
            <p className="text-[#A0561D] font-medium mb-4"> Go back to the email verification page? Your entered code won’t be saved.</p>
            <div className="flex justify-around mt-6 gap-2">
              <button
                onClick={() => setShowConfirmBack(false)}
                className="bg-gray-200 text-gray-700 px-9 py-2 rounded-[10px] font-medium hover:bg-gray-300 transition"> Cancel </button>
              <button
                onClick={() => {
                  localStorage.removeItem('otpCooldownExpiry');
                  localStorage.removeItem('otpActualExpiry');
                  localStorage.removeItem('forgotPasswordEmail');
                  localStorage.removeItem('forgotPasswordOtp');
                  navigate("../");
                }}
                className="bg-[#A63A2B] text-white px-9 py-2 rounded-[10px] font-medium hover:opacity-90 transition"> Yes </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailOTP;
