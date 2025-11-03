import React, { useContext, type ReactElement } from "react";

const LoginComponent = React.createContext<{ 
    isLogin: boolean, setIsLogin: 
      React.Dispatch<React.SetStateAction<boolean>>, 
        isEmailVerified: boolean | string, setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean | "pending">>, setCredentials: React.Dispatch<React.SetStateAction<undefined>>, credentials: any  }>
           ({ isLogin: false, setIsLogin: () => {}, isEmailVerified: false, setIsEmailVerified: () => {}, setCredentials: () => {}, credentials: {}});

const LoginContext = ({ children }: { children: ReactElement }) => {

    const [isLogin, setIsLogin] = React.useState(false);
    const [isEmailVerified, setIsEmailVerified] = React.useState<boolean | "pending">(false);
    const [credentials, setCredentials] = React.useState();
    
    console.log(credentials)
    React.useEffect(() => {
      
        (async () => {
         
            try {
              const response = await fetch("http://localhost:3000/auth/refresh-access-token", {
                method: 'POST',
                credentials: 'include'
              });

              const data = await response.json();
              console.log(data);
              setCredentials(data.user);
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