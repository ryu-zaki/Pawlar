import { useState, type FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaretLeftIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { resetPassword } from "../utils/requests";
import { ForgotPasswordContext } from "./ForgotPasswordParent";

const RenewPassword = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: ""
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmBack, setShowConfirmBack] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    general: ""
  });

  const [loading, setLoading] = useState<boolean>(false);

  const { email, otp, setEmail, setOtp } = useContext(ForgotPasswordContext)!;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = target;
    setPasswords((prev) => ({ ...prev, [id]: value }));

    let errorMessage = "";

    if (id === "password") {
      if (!value) {
        errorMessage = "Password is required.";
        setPasswordStrength("");
      } else if (!passRegex.test(value)) {
        errorMessage = "Password must contain 8 characters.";
      } else {
        errorMessage = "";
      }

      if (!value) {
        setPasswordStrength("");
      } else if (value.length < 8) {
        setPasswordStrength("Weak");
      } else if (value.length < 10) {
        setPasswordStrength("Medium");
      } else {
        setPasswordStrength("Strong");
      }
    }

    if (id === "confirmPassword") {
      if (!value) {
        errorMessage = "Please confirm your password.";
      } else {
        errorMessage = "";
      }
    }

    setErrors((prev) => ({ ...prev, [id]: errorMessage }));
  };

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      password: "",
      confirmPassword: "",
      general: ""
    };
    let hasError = false;

    if (!passwords.password) {
      newErrors.password = "Password is required.";
      hasError = true;
    } else if (!passRegex.test(passwords.password)) {
      newErrors.password = "Must be 8+ chars, include uppercase, lowercase, number, and symbol.";
      hasError = true;
    }

    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
      hasError = true;
    } else if (passwords.password !== passwords.confirmPassword) {
      if (!newErrors.password) {
        newErrors.confirmPassword = "Passwords do not match.";
        hasError = true;
      }
    }

    setErrors(newErrors);


    if (!email || !otp) {
      setErrors((prev) => ({ ...prev, general: "Your session has expired. Please try again." }));
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, otp, passwords.password);

      setShowSuccessModal(true);

    } catch (err: any) {
      let errorMessage = "An unexpected error occurred.";

      if (err && err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err && err.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      setErrors((prev) => ({ ...prev, general: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setEmail("");
    setOtp("");
    localStorage.removeItem('otpCooldownExpiry');
    localStorage.removeItem('otpActualExpiry');
    setShowSuccessModal(false);
    navigate("../../login");
  };

  return (
    <div className="bg-flesh h-screen flex flex-col justify-center items-center font-['League_Spartan'] relative">

      {/* Back Button */}
      <button
        onClick={() => setShowConfirmBack(true)}
        className="absolute top-6 left-6 bg-[#C4703D] text-white rounded-full p-2 shadow-md hover:bg-[#b35f2d] transition"
      >
        <CaretLeftIcon size={20} weight="bold" />
      </button>



      {/* Content */}
      <div className="flex flex-col items-start text-left w-[280px] gap-3">
        <div>
          <h1 className="text-[#A0561D] text-[35px] font-bold">Renew Password</h1>
          <p className="text-p-gray text-[18px]">Enter and confirm your new password.</p>
        </div>

        {/* New Password Field */}
        <div className="w-full flex flex-col gap-2">
          <div className="relative w-full mb-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={passwords.password}
              onChange={handleChange}
              className="w-full h-10 bg-[#FFFEFD] border border-gray-300 rounded-[10px] px-3 text-[16px] focus:outline-p-gray shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500">
              {showPassword ? (
                <EyeIcon size={22} weight="regular" />
              ) : (
                <EyeSlashIcon size={22} weight="regular" />
              )}
            </button>
          </div>

          {passwordStrength && (
            <p className={`text-[3.5vw] ${passwordStrength === "Weak"
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
            <p className="text-error-red text-[3.5vw]">{errors.password}</p>
          )}
        </div>


        {/* Confirm Password Field */}
        <div className="w-full flex flex-col gap-2">
          <div className="relative w-full" >
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className="w-full h-10 bg-[#FFFEFD] border border-gray-300 rounded-[10px]   px-3 text-[16px] focus:outline-p-gray shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-500">
              {showConfirmPassword ? (
                <EyeIcon size={22} weight="regular" />
              ) : (
                <EyeSlashIcon size={22} weight="regular" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-error-red text-[3.5vw]">{errors.confirmPassword}</p>
          )}
        </div>



        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-[280px] h-10 bg-[#C4702E] text-white text-[16px] font-['Wendy_One'] rounded-[15px] mt-1 hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Confirming..." : "Confirm"}
        </button>
      </div>

      {/* Back Confirmation Modal */}
      {showConfirmBack && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white p-5 rounded-[15px] shadow-x4 text-center w-[310px]">
            <p className="text-[#A0561D] font-medium mb-4"> Go back to the email verification page? Your entered code won’t be saved.</p>
            <div className="flex justify-around mt-6">
              <button
                onClick={() => setShowConfirmBack(false)}
                className="bg-gray-200 text-gray-700 px-9 py-2 rounded-[10px] font-medium hover:bg-gray-300 transition"> Cancel </button>
              <button
                onClick={() => {
                  setOtp("");
                  navigate("../");
                }}
                className="bg-[#A63A2B] text-white px-9 py-2 rounded-[10px] font-medium hover:opacity-90 transition"> Yes, I’m sure </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-[270px]">
            <p className="text-[#A0561D] font-medium mb-4"> Password successfully changed! </p>
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