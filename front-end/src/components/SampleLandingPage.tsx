
import { useLogin } from '../contexts/LoginContext';
import { toast } from "sonner";
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Button } from "@heroui/react";

const SampleLandingPage = () => {
    
    const { credentials, setIsLogin, setIsEmailVerified, setCredentials } = useLogin();
    const navigate = useNavigate();
    
    const logout = () => {
        toast("Are you sure you want to logout?", {
            action: {
                label: "Logout",
                onClick: () => handleLogout(),
            },
            cancel: {
                label: "Cancel",
                onClick: () => toast.dismiss(),
            },
            duration: 10000, 
        });
    }
   

    const handleLogout = async () => {
        try { 
            await api.post("/auth/logout");
          
            toast.success("Successfully Logged out.");
            setIsLogin(false);
            setIsEmailVerified(true);
            setCredentials({});

            navigate("/auth/login");
        }

        catch(err) {
            console.log(err);
            toast.error("Something went wrong")
        }

        finally {
            
        }
    }

    return (   
        <>
             <div className="bg-flesh w-screen h-screen flex flex-col items-center">
            {/* welcome user */}
            
            <div className="relative flex flex-col items-center justify-center pt-[10vw]">
                <h1 className="text-choco font-wendy text-[9vw] leading-tight pt-[2.5vw]">
                    Welcome to Pawlar!
                </h1>

            <div>
                <h3 className="mt-10 font-league font-bold mb-3 text-choco text-[7vw]">Your Information:</h3>
                  <ul className="font-league text-brown-orange text-[5vw]">
                      <li>Email: <span>{credentials.email}</span></li>
                      <li>First name: <span>{credentials.firstName}</span></li>
                    <li>Last name: <span>{credentials.lastName}</span></li>   
                  </ul>
            </div>

            <img src="/assets/Pets.svg" alt="" className="w-[70vw] ml-[20vw]"/>

            <Button 
            onClick={logout}
            className= "w-[60vw] bg-brown-orange mt-[4vw]  text-white text-[5vw] font-league font-bold px-[4vw] py-[2vw] bottom-0 rounded-[15vw]">    
                Logout
            </Button>
                

            </div>
        </div>
        </>
    );

}

export default SampleLandingPage;