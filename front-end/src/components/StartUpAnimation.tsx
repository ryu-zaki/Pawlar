import { useEffect, useRef } from "react";
import gsap from "gsap";

const paw_src = "/assets/paw.svg";
const logo_src = "/assets/pawlar.svg";

function StartUpAnimation( { onComplete } : { onComplete: () => void }) {
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {

const container = containerRef.current;
if (!container) return;

const pawCount = 4;
const paws = Array.from({ length: pawCount}).map(() => {
  const el = document.createElement("img");
  el.src = paw_src;
  el.className = "absolute w-[15vw] max-w-[80px] opacity-0";
  container.appendChild(el);
  return el;
})

const lastPaw = document.createElement("img");
lastPaw.src = paw_src;
lastPaw.className = "absolute w-[25vw] max-w-[120px]";
lastPaw.style.top = "50%";
lastPaw.style.left = "50%";
lastPaw.style.transform = "translate(-50%, -50%)";
container.appendChild(lastPaw);


const pawlar = document.createElement("img");
pawlar.src = logo_src;
pawlar.className = "absolute w-[60vw] max-w-[300px] opacity-0";
pawlar.style.top = "-100vh";
pawlar.style.left = "50%";
pawlar.style.transform = "translateX(50%)";
container.appendChild(pawlar);


paws.forEach((paw, i) => {
  const startX = 20 + i * 15;
  const startY = 80 -i * 15;
  paw.style.left = `${startX}vw`;
  paw.style.top = `${startY}vh`;
  paw.style.rotate = i % 2 === 0 ? "-20deg" : "20deg";
})

const tl = gsap.timeline({
  defaults: { duration: 0.4, ease: "power2.out"},
  onComplete: () => {
    gsap.to(container, {
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      onComplete,
    });
  },
});

paws.forEach((paw, i) => {
  tl.to(paw, { opacity: 1, scale: 1.1, duration: 0.2 }, i * 0.2);
  tl.to(paw, { opacity: 0.5, scale: 1, duration: 0.5 }, i * 0.2 + 0.2);
});

const lastPawTime = paws.length * 0.2 + 0.1;
tl.to(lastPaw, { opacity: 1, scale: 1.3, duration: 0.4, ease: "back.out(1.7)"}, lastPawTime)

const slideDownTime = lastPawTime + 0.5;

 return () => {
      if (container) container.innerHTML = "";
    };
}, [onComplete]);


  return (
    <>
    <div
    ref={containerRef}
    className="fixed inset-0 bg-flesh flex items-center justify-center z-[9999] overflow-hidden"
    >

    </div>
    </>
  )

}

export default StartUpAnimation;