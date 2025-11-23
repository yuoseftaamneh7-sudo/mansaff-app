import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatWidget from './components/ChatWidget';
import OrderModal from './components/OrderModal';
import { Phone, MapPin, Clock, Soup, Beef, Award, Truck, Map } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const features = [
    {
      id: 1,
      title: "الجميد الكركي الأصيل",
      description: "سر المنسف هو الجميد! نستخدم جميد كركي حجري درجة أولى، يتم مرسه يدوياً للحصول على قوام كريمي ونكهة حادة ومميزة لا تضاهى.",
      icon: <Soup className="text-white drop-shadow-md" size={36} strokeWidth={1.5} />,
      gradient: "from-yellow-500 to-amber-600",
      shadow: "shadow-yellow-500/40"
    },
    {
      id: 2,
      title: "اللحمة البلدية الطازجة",
      description: "لا نرضى بغير البلدي. ذبح يومي طازج، لحم خروف بلدي بعظمه ودهنه، مطبوخ بعناية فائقة ليذوب في الفم مع كل لقمة.",
      icon: <Beef className="text-white drop-shadow-md" size={36} strokeWidth={1.5} />,
      gradient: "from-orange-500 to-red-600",
      shadow: "shadow-orange-500/40"
    },
    {
      id: 3,
      title: "مذاق الزمن الجميل",
      description: "نحافظ على الإرث. وصفة تقليدية متوارثة من الأجداد بدون أي إضافات دخيلة، لنضمن لك طعم المنسف الأردني الحر الذي يعيدك للزمن الجميل.",
      icon: <Award className="text-white drop-shadow-md" size={36} strokeWidth={1.5} />,
      gradient: "from-amber-600 to-yellow-600",
      shadow: "shadow-amber-600/40"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-white">
      <Navbar onOpenOrder={() => setIsOrderModalOpen(true)} />
      
      <Hero onOpenOrder={() => setIsOrderModalOpen(true)} />

      {/* Features Section (Formerly Story) */}
      <section id="story" className="py-24 bg-zinc-900/50 overflow-hidden border-t border-zinc-800/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-amber-900/5 to-zinc-950/0 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6 flex items-center justify-center gap-3"
            >
              <span className="text-amber-500">#</span> من نحن
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm mb-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
              
              <p className="text-xl text-zinc-200 leading-loose mb-6">
                نحن <span className="text-amber-500 font-bold text-2xl mx-1">مطبخ أبو محمد للتواصي</span>، 
                على استعداد تام لتلبية كافة طلباتكم من المنسف الأردني الأصيل والعزائم والمناسبات، بكل حب وإتقان.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-8 text-base">
                 <div className="flex items-center justify-center gap-2 text-zinc-300 bg-zinc-950/50 px-4 py-3 rounded-xl border border-zinc-800">
                    <Map className="text-amber-500" size={20} />
                    <span>موقعنا: <span className="text-white font-bold">عمان، صويلح، حي الإرسال</span></span>
                 </div>
                 
                 <div className="flex items-center justify-center gap-2 text-zinc-300 bg-zinc-950/50 px-4 py-3 rounded-xl border border-zinc-800">
                    <Truck className="text-amber-500" size={20} />
                    <span>تتوفر لدينا <span className="text-white font-bold">خدمة التوصيل</span> لجميع المناطق</span>
                 </div>
              </div>
            </motion.div>

            <motion.h3 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="text-2xl font-bold text-zinc-100 mb-4"
            >
              لماذا تختار مطبخ أبو محمد؟
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 gap-8 relative z-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateX: 2, translateY: -5 }}
                className="group relative perspective-1000"
              >
                {/* Card Background & 3D Effects */}
                <div className="absolute inset-0 bg-amber-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-6 overflow-hidden hover:border-amber-500/30 transition-colors duration-300">
                  
                  {/* Icon Box - Improved Design */}
                  <div className={`
                    relative p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} 
                    shadow-xl ${feature.shadow} 
                    transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 
                    shrink-0 border border-white/10 overflow-hidden
                  `}>
                    {/* Shine Effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white/20 blur-xl rounded-full"></div>
                    
                    <div className="relative z-10">
                        {feature.icon}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="text-center md:text-right flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Number */}
                  <div className="absolute top-4 left-4 text-6xl font-black text-zinc-800/50 select-none group-hover:text-zinc-800 transition-colors">
                    0{feature.id}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t-4 border-amber-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-amber-500">مطبخ أبو محمد</h3>
            <p className="text-zinc-400 leading-relaxed">
              عنوان الضيافة الأردنية الأصيلة. نقدم لكم أشهى سدر منسف بلمسة "أبو محمد" الخاصة التي تعيد ذكريات طعم زمان.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4 text-zinc-400">
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-zinc-900 group-hover:bg-amber-900/30 transition-colors">
                  <Phone size={18} className="text-amber-500" />
                </div>
                <span className="group-hover:text-white transition-colors">0772272961</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-zinc-900 group-hover:bg-amber-900/30 transition-colors">
                   <MapPin size={18} className="text-amber-500" />
                </div>
                <span className="group-hover:text-white transition-colors">عمان، صويلح، حي الإرسال</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-zinc-900 group-hover:bg-amber-900/30 transition-colors">
                   <Clock size={18} className="text-amber-500" />
                </div>
                <span className="group-hover:text-white transition-colors">استقبال الطلبات: 10:00 ص - 10:00 م</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">النشرة البريدية</h4>
            <p className="text-zinc-400 text-sm mb-4">اشترك للحصول على آخر العروض</p>
            <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800 focus-within:border-amber-600 transition-colors">
              <input type="email" placeholder="بريدك الإلكتروني" className="bg-transparent flex-1 px-3 outline-none text-right text-white placeholder-zinc-600" />
              <button className="bg-amber-600 px-4 py-2 rounded hover:bg-amber-700 transition-colors font-medium">اشترك</button>
            </div>
          </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-zinc-900 text-zinc-600 text-sm">
          © 2024 مطبخ أبو محمد. جميع الحقوق محفوظة.
        </div>
      </footer>

      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
      <ChatWidget />
    </div>
  );
}

export default App;