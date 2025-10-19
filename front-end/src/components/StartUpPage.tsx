import { useRef, useState } from "react";
import { gsap } from "gsap";
import {useGSAP} from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { GreaterThanIcon } from "@phosphor-icons/react";

export default function StartupPage() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current.push(el);
    }
  };
  
  useGSAP(() => {
    gsap.set(slidesRef.current, { xPercent: 100, opacity: 1});
    gsap.set(slidesRef.current[0], { xPercent: 0});
  });

  const nextSlide = () => {
    if (currentSlide < slidesRef.current.length - 1) {
      const nextIndex = currentSlide + 1;
      gsap.to(slidesRef.current[currentSlide], {
        xPercent: -100,
        duration: 0.8,
        ease: "power2.inOut",                                
      }),
      gsap.to(slidesRef.current[nextIndex], {
        xPercent: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
      setCurrentSlide(nextIndex);
      }
    };

    const goToLogin = () => {
      gsap.to(slidesRef.current[currentSlide], {
        opacity: 0,
        duration: 0.5,
         onComplete: () => {
          navigate("/login")
        }
      });  
    };

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">

      {/* slide 1 */}
      <div
      ref={addToRefs}
      className="absolute inset-0 flex flex-col justify-center bg-flesh"
      >
        {/* texts */}
        <div className="relative z-20 text-justify mt-5 ml-10  translate-y-20">
          <h1 className="text-[40px] font-wendy text-choco">Track Your<br/>Pet Anytime</h1>
        <p className="max-w-[300px] text-[20px] font-league text-light-brown">With Pawlar’s GPS, you’ll always know where your pet is—whether they’re playing outside or wandering around the neighborhood.</p>
        </div>

        {/* button */}
        <button
          onClick={nextSlide}
          className="relative w-[45px] h-[50px] bg-light-brown rounded-3xl px-3 py-2 z-20 shadow-md translate-y-140 translate-x-80"
        >
          <GreaterThanIcon size={20} color="#FFF" weight="bold" />
        </button>

        {/* assets */}
        <div className="relative">
          <img src="/assets/blob1.svg" alt="" className=" absolute top-0 left-0 h-auto z-0 -translate-y-25" /> 
          <img src="/assets/INTRO-MAP.svg" alt="" className="relative z-10 -translate-y-10" />
        </div>
        
      </div>

      {/* slide 2 */}
      <div
      ref={addToRefs}
      className="absolute inset-0 flex flex-col justify-center bg-flesh"
      >
        <h1 className="">Track Your<br/>Pet Anytime</h1>
        <button
          onClick={nextSlide}
          className="bg-blue-500 px-5 py-2 rounded-xl shadow-md"
        >
          Next
        </button>
      </div>

      {/* slide 3 */}
      <div
      ref={addToRefs}
      className="absolute inset-0 flex flex-col justify-center bg-flesh"
      >
        <h1 className="">Track Your<br/>Pet Anytime</h1>
        <button
          onClick={goToLogin}
          className="bg-blue-500 px-5 py-2 rounded-xl shadow-md"
        >
          Next
        </button>
      </div>

      </div>
    </>
  );

};
