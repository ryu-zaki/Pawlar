import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { GreaterThanIcon } from "@phosphor-icons/react";
import StartUpAnimation from "./StartUpAnimation";

export default function StartupPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const slide4AssetsRef = useRef({
    welcomeText: null as HTMLElement | null,
    logo: null as HTMLElement | null,
    manDog: null as HTMLElement | null,
    blob: null as HTMLElement | null,
    ctaContent: null as HTMLElement | null,
    ctaButton: null as HTMLElement | null
  });  

// add slide to refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current.push(el);
    }
  };

// internal slides
  useGSAP(() => {
    if (isInitialized || showIntro) return;
   
    gsap.delayedCall(0.1, () => {    
    if (!slidesRef.current || slidesRef.current.length === 0) { return; }

    gsap.set(slidesRef.current, { xPercent: 100, yPercent: 0, opacity: 1 });
    gsap.set(slidesRef.current[0], { xPercent: 0 });

          // Set initial state for slide 4 CTA content (hidden)
      if (slide4AssetsRef.current.ctaContent) {
        gsap.set(slide4AssetsRef.current.ctaContent, { opacity: 0, y: 20 });
      }
      if (slide4AssetsRef.current.ctaButton) {
        gsap.set(slide4AssetsRef.current.ctaButton, { opacity: 0, y: 20 });
      }
    
    setIsInitialized(true)
    });
  }, [showIntro, isInitialized]);

useGSAP(() => {
  if (!showIntro && pageRef.current) {

    const page = pageRef.current;
    const animation = animationRef.current;

    gsap.set(page, { y: "100vh", opacity: 1 });
    gsap.delayedCall(0.1, () => {

      gsap.to(page, {
        y: 0,
        duration: 1.2,
        ease: "power2.out",
         onStart: () => {
          gsap.to(animation, {
            opacity: 0,
            duration: 0.5,
          });
        }
      });
    });
  }
}, [showIntro])



  const transformToFinalSlide = useCallback(()  => {
    const { welcomeText, logo, manDog, blob, ctaContent, ctaButton } = slide4AssetsRef.current;
    
    const tl = gsap.timeline({ 
      defaults: { ease: "power2.inOut" }
    });

    // Animate the transformation
    tl.to(welcomeText, { 
      opacity: 0, 
      y: -30,
      duration: 0.6 
    }, 0)
    .to(logo, { 
      opacity: 0,
      scale: 0.8,
      y: -20,
      duration: 0.6 
    }, 0)
    .to(manDog, { 
      y: "-30vh", // Move up from center to top
      x: "3vw",
      duration: 0.8 
    }, 0.4)
    .to(blob, {
      y: "55vh",
      scale: 1.8,
      duration: 0.8
    }, 0.4)
    .to(ctaContent, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, 0.8)
    .to(ctaButton, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, 1);
  }, []);

  useGSAP(() => {
    if (currentSlide === 3) {
      gsap.delayedCall(1.5, transformToFinalSlide);
    }
  }, [currentSlide, transformToFinalSlide]);

  const nextSlide = () => {
    if (currentSlide < slidesRef.current.length - 1) {
      const nextIndex = currentSlide + 1;

      // Handle the transition from slide 3 to 4 
      if (currentSlide === 3) {
        gsap.set(slidesRef.current[nextIndex], { yPercent: 100, xPercent: 0, opacity: 1 });

        const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 2 } });

        tl.to(slidesRef.current[currentSlide], { yPercent: -100 }, "<").to(
          slidesRef.current[nextIndex],
          { yPercent: 0 },
          "<"
        );

        setCurrentSlide(nextIndex);
        return;
      }

      // Default transition (horizontal)
      gsap.to(slidesRef.current[currentSlide], {
        xPercent: -100,
        duration: 0.8,
        ease: "power2.inOut",
      });
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
      onComplete: () => navigate("/auth/login"),
    });

    // Slide final cta up
    tl.to(current, { yPercent: -100, opacity: 1 });
  };

  return (
    <>
      {showIntro ? (
    <StartUpAnimation 
    onComplete={() => setShowIntro(false)}
    />
    ) : (
    <div ref={pageRef} className="startup-page relative w-full h-screen overflow-hidden z-9999 bg-flesh">    
      <div className="relative w-full h-screen overflow-hidden bg-flesh">
  
          {/* slide 1 */}
          <div
            ref={addToRefs}
            className="absolute inset-0 flex flex-col items-center bg-flesh"
          >
            <div className="relative z-20 flex flex-col items-start text-justify pt-[8vh] -left-5 ">
              <h1 className="text-[10vw] mb-2 font-wendy text-choco leading-tight">
                Track Your
                <br />
                Pet Anytime
              </h1>
              <p className="max-w-[70vw] text-[6vw] font-league text-light-brown leading-tight">
                With Pawlar’s GPS, you’ll always know where your pet is —whether they’re playing outside or wandering around the neighborhood.
              </p>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-[5vw] bottom-[5vh] w-[12vw] h-[12vw] max-w-[50px] max-h-[50px] flex items-center justify-center bg-light-brown rounded-full z-20 shadow-md"
            >
              <GreaterThanIcon size={20} color="#FFF" weight="bold" />
            </button>

            <div className="relative w-full h-full">
              <img
                src="/assets/blob1.svg"
                alt=""
                className="absolute bottom-0 left-0 w-screen h-auto z-0 -translate-y-[10vh]"
              />
              <img
                src="/assets/INTRO-MAP.svg"
                alt=""
                className="absolute w-screen h-auto z-10 bottom-[2vh] mx-auto left-1/2 transform -translate-x-1/2"
              />
            </div>
          </div>

          {/* slide 2 */}
          <div
            ref={addToRefs}
            className="absolute inset-0 flex flex-col items-center bg-flesh overflow-hidden"
          >
            {/* texts */}
            <div className="relative z-20 flex flex-col items-end text-right pt-[8vh] pr-[5vw]">
              <h1 className="text-[12vw] mb-2 font-wendy text-choco leading-tight">
                Meals on time.
                <br />
                Every time
              </h1>
              <p className="max-w-[80vw] text-[6vw] font-league text-light-brown leading-tight">
                Automated feeders make sure your pet eats on schedule with portions tailored for them.
              </p>
            </div>

            {/* button */}
            <button
              onClick={nextSlide}
              className="absolute right-[5vw] bottom-[5vh] w-[12vw] h-[12vw] max-w-[50px] max-h-[50px] flex items-center justify-center bg-light-brown rounded-full z-20 shadow-md"
            >
              <GreaterThanIcon size={20} color="#FFF" weight="bold" />
            </button>

            {/* assets */}
            <div className="w-full h-screen">
              <img
                src="/assets/blob2.svg"
                alt=""
                className="absolute left-0 w-full scale-[1.5] z-0 translate-x-[10vw] -translate-y-[15vh]"
              />
              <img
                src="/assets/Slide2-Dog.svg"
                alt=""
                className="absolute w-screen bottom-[1vh] h-auto z-10 mx-auto left-1/2 transform -translate-x-1/2 "
              />         
              <img
                src="/assets/Slide2-Bowl.svg"
                alt=""
                className="absolute w-[40vw] h-auto z-10 bottom-[14vh] right-[12vw]"
              />
            </div>
          </div>

          {/* slide 3 */}
          <div
            ref={addToRefs}
            className="absolute inset-0 flex flex-col items-center bg-flesh overflow-hidden"
          >
            {/* texts */}
            <div className="relative z-20 flex flex-col items-start text-left pt-[8vh] pl-[5vw]">
              <h1 className="text-[12vw] mb-2 font-wendy text-choco leading-tight">
                Freedom
                <br />
                Made safe
              </h1>
              <p className="max-w-[80vw] text-[6vw] font-league text-light-brown leading-snug">
                Your pet’s collar unlocks the door only for them. <br /> No strays, no worries.
              </p>
            </div>

            {/* button */}
            <button
              onClick={nextSlide}
              className="absolute right-[5vw] bottom-[5vh] w-[12vw] h-[12vw] max-w-[50px] max-h-[50px] flex items-center justify-center bg-light-brown rounded-full z-20 shadow-md"
            >
              <GreaterThanIcon size={20} color="#FFF" weight="bold" />
            </button>

            {/* assets */}
            <div className="relative w-full h-full">
              <img
                src="/assets/blob3.svg"
                alt=""
                className="absolute top-0 left-0 scale-[2.2] h-auto z-0 translate-x-[10vw] -translate-y-[11vh]"
              />
              <img
                src="/assets/gray-petdoor.svg"
                alt=""
                className="absolute w-[90vw] h-auto z-10 -bottom-[1vh] mx-auto transform -translate-x-2"
              />
            </div>
          </div>

            <div
              ref={addToRefs}
              className="absolute inset-0 flex flex-col items-center justify-center bg-paws-gradient overflow-hidden"
            >
              {/* Initial "Welcome to" text */}
              <h3 
                ref={el => { slide4AssetsRef.current.welcomeText = el; }}
                className="absolute top-[22vh] font-wendy font-bold text-[8vw] text-flesh z-30"
              >
                Welcome to
              </h3>
              
              {/* Assets container */}
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Blob background */}
                <img
                  ref={el => { slide4AssetsRef.current.blob = el; }}
                  src="/assets/blob5.svg"
                  alt=""
                  className="absolute top-0 left-0 scale-[1.3] h-auto z-0 translate-y-[75vh]"
                />
                
                {/* Logo */}
                <img
                  ref={el => { slide4AssetsRef.current.logo = el; }}
                  src="/assets/PAWLAR-FULLLOGO.svg"
                  alt=""
                  className="absolute w-[80vw] h-auto z-20 top-[23vh]"
                />
                
                {/* Man and dog - will move up */}
                <img
                  ref={el => { slide4AssetsRef.current.manDog = el; }}
                  src="/assets/MAN-DOG.svg"
                  alt=""
                  className="absolute w-[90vw] h-auto left-12 z-10 top-[40vh]"
                />
              </div>

              {/* CTA Content - Initially hidden, will fade in */}
              <div 
                ref={el => { slide4AssetsRef.current.ctaContent = el; }}
                className="z-20 flex flex-col items-center text-center absolute top-[60vh]"
              >
                <h1 className="text-[12vw] font-wendy text-choco leading-tight mb-2">
                  One Collar
                  <br />
                  Endless Care
                </h1>
                <p className="max-w-[80vw] text-[6vw] font-league text-light-brown leading-snug">
                  Your smart companion for <br /> keeping your pets happy, <br /> safe, and cared for.
                </p>
              </div>

              {/* CTA Button - Initially hidden, will fade in */}
              <button
                ref={el => { slide4AssetsRef.current.ctaButton = el; }}
                onClick={goToLogin}
                className="absolute bottom-8 w-[60vw] py-3 bg-white-button rounded-[25px] text-[5.5vw] font-bold text-choco z-20 shadow-lg"
              >
                Get Started
              </button>
            </div>
          
      </div>
    </div>
  )}
    </>
  );
}


