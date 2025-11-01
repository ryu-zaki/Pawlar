import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { GreaterThanIcon } from "@phosphor-icons/react";
import { resetPassword } from "../utils/requests"; // <-- IMPORT NATIN

const RenewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmBack, setShowConfirmBack] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // --- STATE NA KAILANGAN ---
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    // KINUKUHA ANG LAHAT NG DATA MULA SA SESSION
    const email = sessionStorage.getItem("pw_reset_email");
    const otp = sessionStorage.getItem("pw_reset_otp");
    const resetToken = sessionStorage.getItem("pw_reset_token");

    // Check kung may nawawalang data (e.g., nag-timeout, etc.)
    if (!email || !otp || !resetToken) {
      setError("Your session has expired. Please try again.");
      setLoading(false);
      // Pwede mo silang ibalik sa simula
      // navigate("/EmailSendOTP"); 
      return;
    }

    try {
      // Tinatawag ang final API
      await resetPassword(email, otp, password, resetToken);
      
      // Ipinapakita ang success modal
      setShowSuccessModal(true);

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    // NILILINIS ANG SESSION STORAGE PAGKATAPOS
    sessionStorage.removeItem("pw_reset_email");
    sessionStorage.removeItem("pw_reset_otp");
    sessionStorage.removeItem("pw_reset_token");
    
    setShowSuccessModal(false);
    navigate("../login"); // <-- Pinapalagay ko na /LoginSignupPage ang login mo
  };

  return (
    <div className="bg-[#FFEBD8] h-screen flex flex-col justify-center items-center font-['League_Spartan'] relative">

      {/* Back Button */}
      <button
        onClick={() => setShowConfirmBack(true)}
        className="absolute top-6 left-6 bg-[#C4703D] text-white rounded-full p-2"
      >
        <GreaterThanIcon size={20} className="rotate-180" />
      </button>

      {/* Content */}
      <div className="flex flex-col items-start text-left space-y-7 w-[280px]">
        <div>
          <h1 className="text-[#A0561D] text-[35px] font-bold">Renew Password</h1>
          <p className="text-[#7F7F7F] text-[18px]">Enter and confirm your new password.</p>
        </div>

        {/* New Password Field */}
        <div className="relative w-full mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[40px] bg-[#FFFEFD] border border-gray-300 rounded-[10px] px-3 text-[16px] focus:outline-[#7F7F7F] shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="relative w-full" >
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-[40px] bg-[#FFFEFD] border border-gray-300 rounded-[10px]   px-3 text-[16px] focus:outline-[#7F7F7F] shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error Message Display */}
        {error && (
          <p className="text-red-600 text-sm text-center w-full">{error}</p>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={loading} // <-- Idinagdag
          className="w-[280px] h-[40px] bg-[#C4702E] text-white text-[16px] font-['Wendy_One'] rounded-[15px] mt-1 hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Confirming..." : "Confirm"}
        </button>
      </div>

      {/* Back Confirmation Modal */}
      {showConfirmBack && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/60">
        <div className="bg-white p-5 rounded-[15px] shadow-x4 text-center w-[310px]">
        <p className="text-[#A0561D] font-medium mb-4"> Go back to the email verification page? Your entered code won’t be saved.</p>
          <div className="flex justify-around mt-6">
              <button
                onClick={() => setShowConfirmBack(false)}
                className="bg-gray-200 text-gray-700 px-10 py-2 rounded-[10px] font-medium hover:bg-gray-300 transition"> Cancel </button>
              <button
                onClick={() => navigate("/EmailOTP")}
                className="bg-[#A63A2B] text-white px-9 py-2 rounded-[10px] font-medium hover:opacity-90 transition"> Yes, I’m sure </button>
        </div>
        </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-[270px]">
            <p className="text-[#A0561D] font-medium mb-4"> Password successfully renewed! </p>
            <button
              onClick={handleSuccess}
              className="bg-[#C4703D] text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition"> OK </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default RenewPassword;