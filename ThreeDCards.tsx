import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MenuItem } from "../types";
import { Plus } from "lucide-react";

const ROTATION_RANGE = 20.5;
const HALF_ROTATION_RANGE = 20.5 / 2;

interface ThreeDCardProps {
  item: MenuItem;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({ item }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-96 w-full rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl cursor-pointer group"
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-inner border border-zinc-700"
      >
         <img 
            src={item.image} 
            alt={item.title}
            className="w-48 h-48 object-cover rounded-full shadow-2xl mx-auto mb-4 border-4 border-amber-500/50"
            style={{
                 transform: "translateZ(50px)",
            }}
         />
        <div style={{ transform: "translateZ(30px)" }} className="text-center px-4">
            <h3 className="text-2xl font-bold text-zinc-100 mb-1">{item.title}</h3>
            <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{item.description}</p>
            <div className="flex justify-between items-center mt-2">
                <span className="text-amber-500 font-extrabold text-xl">{item.price}</span>
                <button className="p-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20">
                    <Plus size={20} />
                </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
};