import React, { useContext, type ReactElement } from "react";

const LoginComponent = React.createContext<{ isLogin: boolean, setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }>({ isLogin: false, setIsLogin: () => {}});

const LoginContext = ({ children }: { children: ReactElement }) => {

    const [isLogin, setIsLogin] = React.useState(false);
 
    React.useEffect(() => {
      
        (async () => {
         
            try {
              const response = await fetch("http://localhost:3001/auth/refresh-access-token", {
                method: 'POST',
                credentials: 'include'
              });

              const data = await response.json();
              setIsLogin(!!data?.newAccessToken);
            }

            catch(err) {
                console.log("Error: ", err);
            }

        })();

    }, []);

    return (
        <LoginComponent.Provider value={{ isLogin, setIsLogin }}>
              {children}
        </LoginComponent.Provider>
    )
        
    
}

export const useLogin = () => {

    return useContext(LoginComponent);
};


export default LoginContext;