import { createContext } from "react";
import React from "react";  
import { Network  } from '@capacitor/network';
import type { PluginListenerHandle } from "@capacitor/core";

const ComponentContext = createContext< {isOnline: boolean} >( { isOnline: false });

const NetworkProvider = ({ children }: { children: React.ReactElement }) => {

  const [isOnline, setIsOnline] = React.useState<boolean>(true);

  React.useEffect(() => {  
    
    let listener: PluginListenerHandle | null = null;;

    const checkStatus = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
      
      listener = await Network.addListener('networkStatusChange', status => {
      setIsOnline(status.connected);
      });

    };
    
    checkStatus();
    
    return () => {
      if (listener) {
        listener.remove();
      }  
    }
   
  }, []); 

  return (
    <ComponentContext.Provider value={{ isOnline }}>
      {children}
    </ComponentContext.Provider >
  )
}

export const useNetwork = () => React.useContext(ComponentContext);


export default NetworkProvider;