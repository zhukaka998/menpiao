/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, RefObject, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(200);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Use useInView hook for reliable triggering
  const isInView = useInView(section2Ref, { amount: 0.3, once: true });

  // Scroll to next section handler
  const scrollToSection = (ref: RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect for animation logic
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    // Animate numbers from 200 to 500 over 3 seconds
    const duration = 3000;
    const start = 200;
    const end = 500; // Love
    const startTime = Date.now();

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      
      setEnergyLevel(Math.floor(start + (end - start) * ease));

      if (progress >= 1) {
        clearInterval(timer);
        // Wait a moment then scroll to section 3
        setTimeout(() => {
          scrollToSection(section3Ref);
        }, 1000);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasAnimated]);

  return (
    <div className="min-h-screen bg-bg-cream text-stone-700 selection:bg-sage-green selection:text-white">
      
      {/* --- Section 1: The Invitation --- */}
      <section className="relative h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
        {/* Hazy Light Effect */}
        <div className="absolute inset-0 hazy-light pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 max-w-2xl text-center space-y-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight text-stone-800">
            在喧嚣的色界，<br />
            <span className="italic text-sage-green">唤醒完整的自己。</span>
          </h1>
          
          <p className="text-lg md:text-xl font-light leading-relaxed text-stone-600 max-w-lg mx-auto">
            恐惧并非阻碍，而是生命深处跃动的能量。<br />
            与其向外求索，不如向内行走，<br />
            开启内在能量重塑之旅。
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 cursor-pointer z-10"
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => scrollToSection(section2Ref)}
        >
          <ChevronDown className="w-8 h-8 text-stone-400" />
        </motion.div>
      </section>


      {/* --- Section 2: Awakening Animation --- */}
      <section 
        ref={section2Ref}
        className="h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
      >
        <motion.div
          className="relative flex flex-col items-center"
        >
          {/* Text above animation */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={hasAnimated ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="mb-12 text-stone-500 tracking-widest text-sm uppercase"
          >
            正在为您链接同频能量...
          </motion.p>

          {/* Meditating Figure (SVG) */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Aura Rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-sage-green/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={hasAnimated ? { 
                  scale: [0.8, 1.5 + i * 0.3], 
                  opacity: [0, 0.5, 0] 
                } : {}}
                transition={{ 
                  duration: 3, 
                  repeat: hasAnimated ? Infinity : 0, 
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Simple Line Art Figure */}
            <svg viewBox="0 0 100 100" className="w-32 h-32 text-stone-700 z-10">
              <path 
                d="M50 20 C50 15, 55 15, 55 20 C55 25, 45 25, 45 20 C45 15, 50 15, 50 20 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
              <path 
                d="M50 25 L50 50 M50 50 L30 70 M50 50 L70 70 M30 70 L40 80 M70 70 L60 80" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Lotus position legs simplified */}
              <path 
                d="M30 70 Q20 75, 35 85 M70 70 Q80 75, 65 85" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Energy Level Number */}
            <motion.div 
              className="absolute -top-8 font-serif text-3xl text-amber-gold"
              initial={{ opacity: 0, y: 10 }}
              animate={hasAnimated ? { opacity: 1, y: -20 } : {}}
              transition={{ duration: 1 }}
            >
              {energyLevel} <span className="text-sm text-stone-400 ml-1">
                {energyLevel < 300 ? '(勇气)' : energyLevel < 500 ? '(主动)' : '(爱)'}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>


      {/* --- Section 3: Resonance & CTA --- */}
      <section 
        ref={section3Ref}
        className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-b from-bg-cream to-white"
      >
        <div className="max-w-4xl w-full flex flex-col items-center space-y-12">
          
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 leading-snug">
              九先生的能量实验室：<br/>
              <span className="text-2xl md:text-3xl text-stone-600 mt-2 block">
                拒绝“修辞式”的安抚，只给务实的因果解析。
              </span>
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {['3场内部私房菜直播', '800+学员共修', '东方能量工程'].map((item, i) => (
                <span key={i} className="px-4 py-2 bg-sage-green/10 text-stone-700 rounded-full text-sm tracking-wide">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Invitation Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md bg-white shadow-xl p-8 md:p-12 rounded-sm border border-stone-100 relative overflow-hidden"
            style={{
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")', // Subtle texture
            }}
          >
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-amber-gold/30" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-amber-gold/30" />

            <div className="text-center space-y-8 relative z-10">
              <p className="font-serif italic text-xl text-stone-500">
                这张门票，<br/>送给准备好转身的你。
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(true)}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-medium tracking-wider rounded shadow-lg breathing-shadow transition-all"
              >
                点击扫码｜领取预备群门票
              </motion.button>
              
              <p className="text-xs text-stone-400">
                价值 980 元 · 限时 5.2 元领取
              </p>
            </div>
          </motion.div>

        </div>
      </section>


      {/* --- QR Code Modal --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-8 rounded-lg max-w-sm w-full relative text-center shadow-2xl"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
              >
                <X size={24} />
              </button>

              <h3 className="font-serif text-2xl text-stone-800 mb-2">开启能量之旅</h3>
              <p className="text-stone-500 text-sm mb-6">长按识别二维码，添加九歌学长</p>
              
              <div className="bg-stone-100 p-4 rounded mb-4 inline-block">
                {/* User QR Code - IMPORTANT: Upload your image to the 'public' folder and name it 'qrcode.png' */}
                <img 
                  src="/qrcode.png" 
                  alt="WeChat QR Code" 
                  className="w-48 h-48 object-contain mix-blend-multiply"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/200x200?text=Upload+qrcode.png+to+public";
                    e.currentTarget.alt = "请上传 qrcode.png 到 public 文件夹";
                  }}
                />
                <p className="text-xs text-red-400 mt-2" style={{display: 'none'}}>
                  (如果看不到二维码，请确认已上传 qrcode.png 到 public 文件夹)
                </p>
              </div>
              
              <p className="text-xs text-stone-400">
                如无法识别，请截图后在微信扫一扫中打开
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

