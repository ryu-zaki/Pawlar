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
  if (slidesRef.current.length === 0) return;

    gsap.set(slidesRef.current, { xPercent: 100, yPercent: 0, opacity: 1});
    gsap.set(slidesRef.current[0], { xPercent: 0});
  }, []);

  useGSAP(() => {
    if (currentSlide === 3) {
      gsap.delayedCall(1, nextSlide);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slidesRef.current.length - 1) {
      const nextIndex = currentSlide + 1;     

      if (currentSlide === 3) {
      const nextIndex = currentSlide + 1;

      // Prepare next slide below
      gsap.set(slidesRef.current[nextIndex], { yPercent: 100, xPercent: 0, opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1 } });

      // Both slides move together (no white gap)
      tl.to(slidesRef.current[currentSlide], { yPercent: -100 }, "<")
        .to(slidesRef.current[nextIndex], { yPercent: 0 }, "<");

      setCurrentSlide(nextIndex);
      return;
    }

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
      const current = slidesRef.current[currentSlide];

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        onComplete: () => navigate("/login"),
      });

      // Slide 5 moves up to reveal login page
      tl.to(current, { yPercent: -100, opacity: 1 });
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
        <div className="relative z-20 flex flex-col items-center text-justify translate-y-25">
          <h1 className="text-[45px] mr-23 mb-3 font-wendy text-choco leading-tight">Track Your<br/>Pet Anytime</h1>
        <p className="max-w-[300px] text-[24px] font-league text-light-brown leading-tight mt-2">With Pawlar’s GPS, you’ll <br /> always know where your pet is <br /> —whether they’re playing outside or <br /> wandering around the neighborhood.</p>
        </div>

        {/* button */}
        <button
          onClick={nextSlide}
          className="relative w-[40px] bg-light-brown rounded-[60px] px-2.5 py-2 z-20 shadow-md translate-y-140 translate-x-80"
        >
          <GreaterThanIcon size={20} color="#FFF" weight="bold" />
        </button>

        {/* assets */}
        <div className="relative">
          <img src="/assets/blob1.svg" alt="" className="absolute top-0 left-0 h-auto z-0 -translate-y-40" /> 
          <img src="/assets/INTRO-MAP.svg" alt="" className="relative z-10 -translate-y-10" />
        </div>
        
      </div>

      {/* slide 2 */}
      <div
      ref={addToRefs}
      className="absolute inset-0 flex flex-col justify-center bg-flesh"
      >
        {/* texts */}
        <div className="relative z-20 flex flex-col items-center text-right translate-y-39">
          <h1 className="text-[45px] -mr-10 flex justify-end mb-3 font-wendy text-choco leading-tight">Meals on time.<br/>Every time</h1>
          <p className="max-w-[300px] text-[24px] font-league text-light-brown text-right leading-tight mt-2">Automated feeders make sure your pet eats on schedule with portions tailored for them.</p>
        </div> 

        {/* button */}
        <button
          onClick={nextSlide}
          className="relative w-[40px] bg-light-brown rounded-3xl px-2.5 py-2 z-20 shadow-md translate-y-159 translate-x-80"
        >
          <GreaterThanIcon size={20} color="#FFF" weight="bold" />
        </button>

        {/* assets */}
        <div className="relative translate-y-10">
          <img src="/assets/blob2.svg" alt="" className="absolute top-0 left-0 h-auto z-0 -translate-y-50" /> 
          <img src="/assets/Slide2-Dog.svg" alt="" className="relative z-10 translate-y-15" />
          <img src="/assets/Slide2-Bowl.svg" alt="" className="relative w-[270px] h-[200px] z-20 -translate-y-55 translate-x-30" />
        </div>
      </div>

      {/* slide 3 */}
      <div
      ref={addToRefs}
      className="absolute inset-0 flex flex-col justify-center bg-flesh"
      >
        {/* texts */}
        <div className="relative z-20 flex flex-col items-center text-left -translate-y-19">
          <h1 className="text-[45px] mr-30 flex justify-start mb-3 font-wendy text-choco leading-tight">Freedom<br/>Made safe</h1>
          <p className="max-w-[300px] text-[24px] font-league text-light-brown text-left leading-tight mt-2">Your pet’s collar unlocks the door only for them. <br /> No strays, no worries.</p>
        </div> 

        {/* button */}
        <button
          onClick={nextSlide}
          className="relative w-[40px] bg-light-brown rounded-3xl px-2.5 py-2 z-20 shadow-md translate-y-100 translate-x-80"
        >
          <GreaterThanIcon size={20} color="#FFF" weight="bold" />
        </button>

        {/* assets */}
        <div className="relative translate-y-5">
          <img src="/assets/blob3.svg" alt="" className="absolute top-0 left-0 h-auto z-0 -translate-y-100" /> 
          <img src="/assets/gray-petdoor.svg" alt="" className="relative z-10 translate-y-40 -translate-x-3" />
        </div>
      </div>

      {/* splash screen (slide 4) */}
      <div
      ref={addToRefs}
      className="absolute inset-0 flex flex-col justify-center bg-paws-gradient">
      <h3 className="absolute w-[164px] h-[29px] flex justify-center font-wendy font-bold text-[25px] text-flesh translate-x-28 -translate-y-60 mb-2">Welcome to</h3>
        <div className="relative translate-y-5">
            <img src="/assets/blob4.svg" alt="" className="absolute top-0 left-0 h-auto z-0 translate-y-30" /> 
            <img src="/assets/MAN-DOG.svg" alt="" className="absolute top-0 left-0 h-auto z-0 translate-x-15 -translate-y-30" />         
            <img src="/assets/PAWLAR-FULLLOGO.svg" alt="" className="absolute w-[230px] h-auto flex items-center top-0 left-20 z-0 -translate-y-70" /> 
        </div>
      </div>

      {/* slide 5 */}
      <div
      ref={addToRefs}
      className="absolute inset-0 flex flex-col justify-center bg-paws-gradient"> 
      
        {/* assets */}
        <div className="relative translate-y-30">
          <img src="/assets/blob5.svg" alt="" className="absolute top-0 left-0 h-auto z-0 -translate-y-25" /> 
          <img src="/assets/MAN-DOG.svg" alt="" className="absolute top-0 left-0 h-auto z-0 translate-x-15 -translate-y-80" />         

        </div> 

        {/* texts */}
        <div className="z-20 flex flex-col items-center text-center justify-center translate-y-50">
          <h1 className="text-[45px] flex mb-3 font-wendy text-choco leading-tight">One Collar<br/>Endless Care</h1>
          <p className="max-w-[300px] text-[24px] font-league text-light-brown leading-tight mt-2">Your smart companion for <br /> keeping your pets happy, <br /> safe, and cared for.</p>
        </div> 

        {/* button */}
         <div className="flex justify-center">
          <button
          onClick={goToLogin}
          className="relative flex justify-center w-[200px]
          bg-white-button rounded-[20px] px-2.5 py-2 z-20 shadow-md
          translate-y-60"
        >
         Get Started
        </button>
         </div>
      </div> 
      
  </div>
    </>
  );

};
