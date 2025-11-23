import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenOrder: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenOrder }) => {
  
  const handleScrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-zinc-950 flex items-center justify-center pt-20">
      {/* Background Decor - Enhanced Shadows & Colors */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-600/30 rounded-full filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-800/20 rounded-full filter blur-[150px]" style={{animationDuration: '8s'}}></div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-right order-2 lg:order-1 flex flex-col items-center lg:items-start"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1.5 px-4 rounded-full bg-amber-900/20 border border-amber-500/30 text-amber-400 font-bold text-sm mb-6 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
          >
            منسف أردني على الأصول 🇯🇴
          </motion.span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-8 text-center lg:text-right drop-shadow-xl">
            <span className="text-amber-500 relative inline-block">
              مطبخ أبو محمد
              <svg className="absolute w-full h-4 bottom-0 left-0 text-amber-600 -z-10 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span> 
          </h1>
          
          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
            <button 
              onClick={onOpenOrder}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-[0_10px_30px_rgba(217,119,6,0.3)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.5)] transform hover:-translate-y-1 border border-amber-500/20"
            >
              ابدأ الطلب الآن
            </button>
             <button 
              onClick={handleScrollToStory}
              className="bg-zinc-900/80 backdrop-blur-sm text-white border border-zinc-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all hover:shadow-lg transform hover:-translate-y-1"
            >
              من نحن
            </button>
          </div>
        </motion.div>

        {/* 3D Visual Content - The 3D Sider */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 100, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            mass: 1,
            delay: 0.1
          }}
          className="order-1 lg:order-2 flex justify-center items-center relative perspective-1000 h-[450px] lg:h-[650px]"
        >
           {/* 3D Mansaf Container */}
           <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] group perspective-1000">
              
              {/* Glow Effect behind Sider */}
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-[80px] animate-pulse"></div>
              
              {/* Drop Shadow for the Floating Sider */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[80%] h-[40px] bg-black/60 blur-xl rounded-[100%] animate-pulse"></div>

              {/* The Sider - 3D Rotating Tray */}
              <motion.div
                 animate={{ 
                   rotateX: [45, 50, 45], // Tilted to show it's a tray
                   rotateZ: [0, 360], // Rotation like a turntable
                   y: [0, -15, 0] // Hovering/Floating effect
                 }}
                 transition={{ 
                   rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                   rotateZ: { duration: 30, repeat: Infinity, ease: "linear" },
                   y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                 }}
                 style={{ transformStyle: 'preserve-3d' }}
                 className="relative z-10 w-full h-full"
              >
                {/* Sider Structure - Metallic Tray Effect */}
                <div className="w-full h-full rounded-full border-[2px] border-zinc-400/50 bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(255,255,255,0.5)] ring-1 ring-white/30">
                  
                  {/* Metallic Rim Highlight */}
                  <div className="absolute inset-0 rounded-full border-[12px] border-zinc-300/80 shadow-[inset_0_5px_10px_rgba(0,0,0,0.3)] z-20 pointer-events-none"></div>
                  
                  {/* Mansaf Image Top View */}
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/61/Mansaf_1.jpg" 
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1598515214211-59ed056a4de1?q=80&w=800&auto=format&fit=crop";
                    }}
                    alt="سدر منسف أردني أصيل"
                    className="w-full h-full object-cover scale-[1.3] rounded-full contrast-100 saturate-110 hover:scale-[1.35] transition-transform duration-700"
                  />
                  
                  {/* Dynamic Sheen/Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/40 rounded-full pointer-events-none z-30 mix-blend-overlay"></div>
                  
                  {/* Realistic Shadow inside the tray */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] z-20 pointer-events-none"></div>
                </div>
              </motion.div>

               {/* Floating Steam/Aroma particles */}
               <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
                 <motion.div 
                    animate={{ y: [-20, -100], opacity: [0, 0.5, 0], x: [0, 30], scale: [0.5, 1.5] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0, ease: "easeOut" }}
                    className="absolute top-[40%] left-1/2 w-16 h-16 bg-white/10 rounded-full blur-xl"
                 />
                 <motion.div 
                    animate={{ y: [-20, -120], opacity: [0, 0.4, 0], x: [0, -30], scale: [0.5, 1.2] }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: 2, ease: "easeOut" }}
                    className="absolute top-[30%] left-1/3 w-20 h-20 bg-white/10 rounded-full blur-xl"
                 />
               </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;