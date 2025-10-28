import api, { setAccessToken } from './api.ts'
const loginRequest = async () => {
   
  const response = await api.post('/auth/login', { phoneNumber: "09514406062", password: '123' });
  setAccessToken(response.data.accessToken)
  console.log(`Token: ${response.data.accessToken}`)
  

}

const accessProfile = async () => {
const response = await api.post('/profile');
  console.log(response.data);
}

interface ApiResponse {
  message: string;
}

const requestPasswordReset = async (email: string) => {
    const response = await api.post<ApiResponse>('/auth/forgot-password', { email });
    return response.data; 
};

const resetPassword = async (email: string, otp: string, newPassword: string) => {
    const response = await api.post<ApiResponse>('/auth/reset-password', {
        email,
        otp,
        newPassword,
    });
    return response.data; 
};


export { loginRequest, accessProfile, requestPasswordReset, resetPassword }