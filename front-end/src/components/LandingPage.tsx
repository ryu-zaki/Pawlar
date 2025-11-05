import { Button } from "@heroui/react";

const LandingPage = () => {

    return (
        <>
        <div className="bg-flesh w-screen h-screen flex flex-col items-center">
            {/* welcome user */}
            
            <div className=" bg-blue-200 relative flex flex-col items-center justify-center pt-[10vw]">
                <h1 className="text-choco font-wendy text-[9vw] leading-tight pt-[2.5vw]">
                    Welcome to Pawlar!
                </h1>

            <div>
                <h3 className="mt-10 font-league font-bold mb-3 text-choco text-[7vw]">Your Information:</h3>
                  <ul className="font-league text-brown-orange text-[5vw]">
                      <li>Email: <span>jellaannegonzales123@gmail.com</span></li>
                      <li>First name: <span>Jella</span></li>
                    <li>Last name: <span>Anne</span></li>   
                  </ul>
            </div>

            <img src="/assets/Pets.svg" alt="" className="w-[70vw] ml-[20vw]"/>

            <Button className= "w-[60vw] bg-brown-orange mt-[4vw]  text-white text-[5vw] font-league font-bold px-[4vw] py-[2vw] bottom-0 rounded-[15vw]">    
                Logout
            </Button>
                

            </div>
        </div>
        </>

    );
}

export default LandingPage;