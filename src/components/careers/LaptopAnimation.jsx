import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, MousePointer2 } from 'lucide-react';

export default function LaptopAnimation() {
  const [phase, setPhase] = useState('closed'); // closed, opening, interacting, clicking, success

  useEffect(() => {
    let isMounted = true;
    const sequence = async () => {
      while (isMounted) {
        // 1. Start Closed
        setPhase('closed');
        await new Promise((r) => setTimeout(r, 1000));
        if (!isMounted) break;

        // 2. Open Laptop
        setPhase('opening');
        await new Promise((r) => setTimeout(r, 1500));
        if (!isMounted) break;

        // 3. Move Cursor
        setPhase('interacting');
        await new Promise((r) => setTimeout(r, 2000));
        if (!isMounted) break;

        // 4. Click
        setPhase('clicking');
        await new Promise((r) => setTimeout(r, 500));
        if (!isMounted) break;

        // 5. Success
        setPhase('success');
        await new Promise((r) => setTimeout(r, 3000));
      }
    };

    sequence();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center [perspective:1000px]">
      <motion.div
        animate={{
          rotateY: phase === 'closed' ? 0 : [-5, 5, -5],
          y: phase === 'closed' ? 40 : 0
        }}
        transition={{
          rotateY: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 0.8 }
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-80 h-56"
      >
        {/* Laptop Lid (Screen & Cover) */}
        <motion.div
          initial={{ rotateX: -95 }}
          animate={{
            rotateX: phase === 'closed' ? -95 : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 45,
            damping: 14
          }}
          style={{
            transformOrigin: 'bottom',
            transformStyle: 'preserve-3d',
            bottom: '50%'
          }}
          className="absolute inset-x-0 h-full z-20"
        >
          {/* Inner Screen Side */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 bg-neutral-900 rounded-xl border-[6px] border-neutral-300 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-1"
          >
            <div className="w-full h-full bg-white relative flex flex-col items-center justify-center p-4 rounded-sm">
              {/* Browser interface */}
              <div className="absolute top-0 inset-x-0 h-6 bg-neutral-50 flex items-center px-4 gap-1.5 border-b border-neutral-200">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === 0 ? 'bg-red-400' : i === 1 ? 'bg-yellow-400' : 'bg-green-400'
                    }`}
                  />
                ))}
                <div className="ml-4 h-3 w-32 bg-white rounded-full border border-neutral-200" />
              </div>

              {/* Main Content (Hidden on Success) */}
              <div
                className={`transition-all duration-700 flex flex-col items-center ${
                  phase === 'success' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                }`}
              >
                <div className="w-24 h-3 bg-neutral-100 rounded-full mb-4" />
                <div className="w-40 h-2 bg-neutral-100 rounded-full mb-2" />
                <div className="w-32 h-2 bg-neutral-100 rounded-full mb-10" />

                <motion.div
                  animate={{ scale: phase === 'clicking' ? 0.9 : 1 }}
                  className="px-6 py-2.5 bg-black text-white text-[10px] font-bold rounded-full tracking-widest uppercase shadow-xl"
                >
                  Apply Now
                </motion.div>
              </div>

              {/* Success Content */}
              <div
                className={`absolute inset-0 bg-white flex flex-col items-center justify-center transition-all duration-700 ${
                  phase === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: phase === 'success' ? 1 : 0 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 text-white shadow-2xl"
                >
                  <Check size={32} strokeWidth={3} />
                </motion.div>
                <div className="text-center">
                  <p className="text-[12px] font-black uppercase tracking-widest text-black mb-1 leading-none">
                    Accepted
                  </p>
                  <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                    Welcome to the team
                  </p>
                </div>
              </div>

              {/* Cursor */}
              <motion.div
                initial={{ x: 80, y: 100, opacity: 0 }}
                animate={{
                  x: phase === 'interacting' || phase === 'clicking' ? 0 : 80,
                  y: phase === 'interacting' || phase === 'clicking' ? 38 : 100,
                  opacity: phase === 'interacting' || phase === 'clicking' ? 1 : 0
                }}
                transition={{
                  duration: phase === 'interacting' ? 1.5 : 0.2,
                  ease: 'easeInOut'
                }}
                className="absolute z-30 pointer-events-none"
              >
                <MousePointer2 className="text-black rotate-[-15deg] fill-white drop-shadow-xl" size={24} />
              </motion.div>
            </div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-800 rounded-full" />
          </div>

          {/* Outer Cover Side (Silver Finish) */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
            className="absolute inset-0 bg-neutral-300 rounded-xl border-[6px] border-neutral-200 flex items-center justify-center shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20" />
            <div className="w-16 h-16 rounded-full bg-neutral-400/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <div className="w-6 h-6 bg-neutral-400 rounded-md rotate-12 opacity-50" />
            </div>
          </div>
        </motion.div>

        {/* Junction / Hinge bar */}
        <div className="absolute top-1/2 left-0 right-0 h-4 bg-neutral-400 -translate-y-1/2 rounded-full z-10 shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        </div>

        {/* Laptop Base (Body - Silver Finish) */}
        <div
          style={{
            transform: 'rotateX(75deg)',
            transformOrigin: 'top',
            top: '50%'
          }}
          className="absolute inset-x-0 h-full bg-neutral-300 rounded-b-2xl border-t border-neutral-100 shadow-2xl p-2"
        >
          <div className="w-full h-full bg-neutral-200 rounded-b-xl p-4 flex flex-col gap-4 shadow-inner">
            {/* Detailed Black Keyboard Keys */}
            <div className="grid grid-cols-12 gap-1.5 px-2">
              {[...Array(60)].map((_, i) => (
                <div
                  key={i}
                  className={`bg-neutral-900 rounded-[2px] h-3.5 border-b-2 border-black/80 shadow-md ${
                    i === 54 ? 'col-span-5' : 'col-span-1'
                  }`}
                />
              ))}
            </div>
            {/* Recessed Trackpad */}
            <div className="mx-auto w-32 h-20 bg-neutral-300 rounded-lg border border-neutral-400/50 shadow-inner mt-auto relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-white/40" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
