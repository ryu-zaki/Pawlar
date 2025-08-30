import { createContext } from "react";
import React from "react";  
import { Network  } from '@capacitor/network';

const ComponentContext = createContext< {isOnline: boolean} >( { isOnline: false });



const NetworkProvider = ({ children }: { children: React.ReactElement }) => {

  const [isOnline] = React.useState<boolean>(true);

  React.useEffect(() => {  

    const checkStatus = async () => {
      const status = await Network.getStatus();
      alert(`Network status: ${status.connected}`);
      
    };

    
    checkStatus();
  }, []);

  return (
    <ComponentContext.Provider value={{ isOnline }}>
      {children}
    </ComponentContext.Provider >
  )
}

export const useNetwork = () => React.useContext(ComponentContext);


export default NetworkProvider;