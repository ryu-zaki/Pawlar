import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset, resetPassword } from '../utils/requests';

type FormStage = 'enter-email' | 'enter-otp' | 'success';

const ForgotPasswordPage = () => {
    const [stage, setStage] = useState<FormStage>('enter-email');
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleRequestOTP = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await requestPasswordReset(email);
            setMessage(response.message);
            setStage('enter-otp');
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
            setError(errorMessage);
        }
    };

    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match. Please try again.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const response = await resetPassword(email, otp, newPassword);
            setMessage(response.message);
            setStage('success');

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
            setError(errorMessage);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-[#FFEBD8]">
            <div className="bg-white p-8 rounded-lg shadow-md w-[90vw] max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

                {message && <p className="text-green-600 text-center mb-4">{message}</p>}
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                {stage === 'enter-email' && (
                    <form onSubmit={handleRequestOTP} className="space-y-4">
                        <p className="text-sm text-gray-600">Enter your email to receive a One-Time Password (OTP).</p>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-brown-orange text-white py-2 rounded-md">
                            Send OTP
                        </button>
                    </form>
                )}

                {stage === 'enter-otp' && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label htmlFor="otp">Enter OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-brown-orange text-white py-2 rounded-md">
                            Reset Password
                        </button>
                    </form>
                )}

                {stage === 'success' && (
                    <div className="text-center">
                        <p>Redirecting to login...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPasswordPage