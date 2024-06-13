import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const Button = () => {
  const text = "Get into touch";
  const arr = text.split(" ").map((obj) => obj.split(""));

  const handleMouseEnter = () => {
    gsap.fromTo(
      ".text_1",
      {
        duration: 0.5,
        rotate: 0,
        top: "50%",
      },
      {
        duration: 0.5,
        rotate: -40,
        top: "-100px",
      }
    );
    gsap.fromTo(
      ".text_2",
      {
        duration: 0.5,
        rotate: 40,
        top: "100px",
      },
      {
        duration: 0.5,
        rotate: 0,
        top: "50%",
      }
    );
  };
  const handleMouseLeave = () => {
    gsap.fromTo(
      ".text_1",
      {
        duration: 0.5,
        rotate: -40,
        top: "-100px",
      },
      {
        duration: 0.5,
        rotate: 0,
        top: "50%",
      }
    );
    gsap.fromTo(
      ".text_2",

      {
        duration: 0.5,
        rotate: 0,
        top: "50%",
      },
      {
        duration: 0.5,
        rotate: 40,
        top: "100px",
      }
    );
  };
  return (
    <div>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => router.push("/todo")}
        className="px-4 py-2 bg-yellow-400 text-black hover:bg-green-400 transition-all duration-300 ease-in-out relative w-[250px] h-[40px] overflow-hidden"
      >
        <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex w-full text-center justify-center items-center text_1">
          Click me to check todo
        </span>
        <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex w-full text-center justify-center items-center text_2">
          Click me to check todo
        </span>
      </button>
    </div>
  );
};

export default Button;
