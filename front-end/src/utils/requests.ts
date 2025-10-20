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

export { loginRequest, accessProfile }