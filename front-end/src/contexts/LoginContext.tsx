import React, { useContext, type ReactElement } from "react";
import api from '../utils/api.ts';

const LoginComponent = React.createContext<{ 
    isLogin: boolean, setIsLogin: 
      React.Dispatch<React.SetStateAction<boolean>>, 
        isEmailVerified: boolean | string, setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean>>, setCredentials: React.Dispatch<React.SetStateAction<{}>>, credentials: any  }>
           ({ isLogin: false, setIsLogin: () => {}, isEmailVerified: false, setIsEmailVerified: () => {}, setCredentials: () => {}, credentials: {}});

const LoginContext = ({ children }: { children: ReactElement }) => {

    const [isLogin, setIsLogin] = React.useState(false);
    const [isEmailVerified, setIsEmailVerified] = React.useState<boolean>(false);
    const [credentials, setCredentials] = React.useState({});
    
    React.useEffect(() => { 
        
        (async () => {
         
            try {
              const response = await api.post("/auth/refresh-access-token")

              const data = response.data;
              setCredentials(data.user);
              setIsEmailVerified(!data.user.verification_code)
              
              setIsLogin(!!data?.newAccessToken);
            }

            catch(err) {
                console.log("Error: ", err);
            }

        })();

    }, []);

    return (
        <LoginComponent.Provider value={{ isLogin, setIsLogin, isEmailVerified, setIsEmailVerified, setCredentials, credentials }}>
              {children}
        </LoginComponent.Provider>
    )
        
    
}

export const useLogin = () => {

    return useContext(LoginComponent);
};


export default LoginContext;