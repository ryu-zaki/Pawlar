import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom"; 

function PageNotFound() {
    const navigate = useNavigate();

    const goToLogin = navigate("/auth/login");
    return (
        <>
        <div className="bg-flesh h-screen w-screen flex justify-center">
            <div className="flex flex-col items-center justify-center p-[10vw]" >
                <h1 className="text-[10vw] text-choco font-wendy mb-5 max-w-[80vw] text-center leading-tight">
                    Oh no! <br /> Page not found! 
                </h1>
                
                <img src="/assets/PageNotFound_Dog.svg" alt="" className="w-[50vw] ml-[25vw]" />

                <Button 
                onPress={() => goToLogin}
                className="bg-choco text-white text-[5vw] font-league w-[50vw] mt-[5vw] rounded-2xl">
                    Back to login
                </Button>
                
            </div>
        </div>
        </>
    );
}

export default PageNotFound;