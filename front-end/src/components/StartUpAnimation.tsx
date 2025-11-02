import { useEffect, useRef } from "react";
import gsap from "gsap";

const paw_src = "/assets/paw.svg";
const logo_src = "/assets/pawlar-brown.svg";

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
const lastPaw = paws[paws.length - 1];

const pawlar = document.createElement("img");
pawlar.src = logo_src;
pawlar.className = "absolute w-[55vw] max-w-[300px] opacity-0";
container.appendChild(pawlar);

gsap.set(pawlar, {
  y: "100vh",
  xPercent: -50,
  left: "50%",
  transformOrigin: "center center",
});


paws.forEach((paw, i) => {
  const startX = 20 + i * 15;
  const startY = 80 -i * 20;
  gsap.set(paw, 
    { 
      left: `${startX}vw`,
      top: `${startY}vh`,
      rotation: i % 2 === 0 ? -20 : 20,
      transformOrigin: "center center",
    });
});

const tl = gsap.timeline({
  defaults: { duration: 0.4, ease: "power2.out"},
  onComplete: () => {
    // fade out whole container
    gsap.to(container, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      onComplete,
    });
  },
});

// animate walk
paws.forEach((paw, i) => {
  tl.to(paw, { opacity: 1, scale: 1.1, duration: 0.3 }, i * 0.5);
  if (i !== paws.length - 1) {
    tl.to(paw, { opacity: 0, scale: 1, duration: 1 }, i * 0.5 + 0.2);
  }
});

// last paw in center and scale up
//const lastPawTime = paws.length * 0.3 + 0.2;
tl.to(lastPaw, 
  { opacity: 1, 
    left: "50%",
    top: "50%",
    xPercent: -50,
    yPercent: -50,
    scale: 2.5, 
    duration: 0.8, 
    ease: "back.out(1.7)"
  }, ">+0.3"
  );


// slide down last paw
tl.to(lastPaw,
  {
    y: "100vh",
    duration: 0.8,
    ease: "power2.in",
  },
 ">+0.2"
);

// PAWLAR slide down - startup
tl.fromTo(
  pawlar,
  { opacity: 0, y: "-100vh" },
  {
    y: "0vh",
    opacity: 1,
    duration: 1.2,
    ease: "power2.out",
  },
  ">+0.2"
);

tl.to(pawlar, {
  y: "100vh",
  duration: 1.2,
  ease: "power2.inOut",
  delay: 0.5,
  onUpdate: function() {
        if (this.progress() >= 0.6 && !this.vars.triggered) {
          this.vars.triggered = true;
          onComplete();
        }
      },
});

 return () => {
      if (container) container.innerHTML = "";
      gsap.killTweensOf("*");
    };
}, [onComplete]);


  return (
    <>
    <div
    ref={containerRef}
    className="fixed inset-0 bg-flesh flex items-center justify-center z-10000 overflow-hidden"
    >

    </div>
    </>
  )

}

export default StartUpAnimation;