
import { useLogin } from '../contexts/LoginContext';
import { toast } from "sonner";
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Button } from "@heroui/react";

const SampleLandingPage = () => {

    const { credentials, setIsLogin, setIsEmailVerified, setCredentials, isLoading, setIsLoading } = useLogin();
    const navigate = useNavigate();

    const logout = () => {
        if (isLoading) return;

        const confirmationToastId = toast("Are you sure you want to logout?", {
            action: {
                label: "Logout",
                onClick: () => {
                    toast.dismiss(confirmationToastId);
                    handleLogout();
                },
            },
            cancel: {
                label: "Cancel",
                onClick: () => toast.dismiss(confirmationToastId),
            },
            duration: 10000,
        });
    }


    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await api.post("/auth/logout");

            toast.success("Successfully Logged out.");
            setIsLogin(false);
            setIsEmailVerified(false);
            setCredentials({});

            setTimeout(() => {
                toast.dismiss();
                navigate("/auth/login");
            }, 1000);
        }

        catch (err) {
            console.log(err);
            toast.error("Something went wrong");
            setIsLoading(false);
        }

        finally {
            setIsLoading(false);
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
                            
                            {
                                !!credentials?.firstName && <li>First name: <span>{credentials.firstName}</span></li>
                            }
                           
                            <li>Last name: <span>{credentials.lastName}</span></li>
                        </ul>
                    </div>

                    <img src="/assets/Pets.svg" alt="" className="w-[70vw] ml-[20vw]" />

                    <Button
                        onClick={logout}
                        isDisabled={isLoading}
                        className="w-[60vw] bg-brown-orange mt-[4vw]  text-white text-[5vw] font-league font-bold px-[4vw] py-[2vw] bottom-0 rounded-[15vw] disabled:opacity-50">
                        {isLoading ? "Logging out..." : "Logout"}
                    </Button>


                </div>
            </div>
        </>
    );

}

export default SampleLandingPage;