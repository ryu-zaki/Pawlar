
import { useLogin } from '../contexts/LoginContext';
import { toast } from "sonner";
import api from '../utils/api';
import { useNavigate } from 'react-router-dom'

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
            duration: 10000, // Bigyan ng 10 segundo para mag-decide
        });
    }
   

    const handleLogout = async () => {
        try { 
          await fetch("http://10.221.198.148:3000/auth/logout", {
                method: 'POST',
                credentials: 'include'
              });

          /* if (response.status !== 200) throw new Error(); */
          
            toast.success("Successfully Logged out.");
            setIsLogin(false);
            setIsEmailVerified(true);
            setCredentials({});

            navigate("/auth/login")
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
            <div className="flex items-center justify-center w-full">
                <div className="mt-10">
                   <h1>Welcome to Pawlar App!</h1>
                
                   <h3 className="mt-10 font-bold mb-5">User Information</h3>
                  <ul>
                      <li>email: <span>{credentials.email}</span></li>
                      <li>first name: <span>{credentials.firstName}</span></li>
                    <li>last name: <span>{credentials.lastName}</span></li>
                       
                  </ul>

                  <button onClick={logout} className="bg-brown-orange mt-20 text-white px-4 py-1 rounded-md">logout</button>
                </div>
                
            </div>
        </>
    );

}

export default SampleLandingPage;