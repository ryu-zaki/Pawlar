import { useEffect, useRef } from "react";
import gsap from "gsap";


function StartUpAnimation( { onComplete } : { onComplete: () => void }) {
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {

const container = containerRef.current;
if (!container) return;

const pawCount = 4;
const paws = Array.from({ length: pawCount}).map(() => {
  const el = document.createElement("img");
  el.src = "/assets/paw.svg";
  el.className = "absolute w-[15vw] max-w-[80px] opacity-0";
  container.appendChild(el);
  return el;
})

paws.forEach((paw, i) => {
  const startX = 20 + i * 10;
  const startY = 70 -i * 8;
  paw.style.left = `${startX}vw`;
  paw.style.top = `${startY}vh`;
  paw.style.rotate = i % 2 === 0 ? "-25deg" : "25deg";
})

const tl = gsap.timeline({
  defaults: { duration: 0.4, ease: "power2.out"},
  onComplete: () => {
    gsap.to(container, {
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      onComplete,
    });
  },
});

paws.forEach((paw, i) => {
  tl.to(paw, { opacity: 1, scale: 1.1, duration: 0.2 }, i * 0.2);
  tl.to(paw, { opacity: 0.5, scale: 1, duration: 0.5 }, i * 0.2 + 0.3);
});

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