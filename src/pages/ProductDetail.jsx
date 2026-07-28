import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();

  const allProducts = {
    "corporate-actions": {
      title: "Corporate Actions",
      tag: "Tracking",
      icon: <Briefcase size={40} />,
      desc: "Track corporate actions like dividends, bonuses, mergers & more — categorized, searchable, and AI-summarized for speed.",
      fullDesc: "Never miss a corporate action again. Get real-time updates on dividends, stock splits, bonus issues, rights offerings, and mergers with AI-powered summaries.",
      features: [
        "Real-time action alerts",
        "AI-powered summaries",
        "Historical data access",
        "Dividend tracking",
        "Merger & acquisition updates",
        "App Notifications"
      ],
      playStore: "https://play.google.com/store/apps/details?id=com.agc.CorporateActions",
      appStore: "https://apps.apple.com/app/id6784226172",
      youtubeUrl: "https://www.youtube.com/embed/bdM_iT2Ue4Y?si=weW9T7mtBpC53s30"
    }
  };

  // Gracefully handle both singular 'corporate-action' and plural 'corporate-actions' routes
  const targetId = id === 'corporate-action' ? 'corporate-actions' : id;
  const product = allProducts[targetId];

  // Sanitize and translate normal/share/embed YouTube links into a strict embed URL format
  const toEmbedUrl = (url) => {
    if (!url) return '';
    try {
      const u = new URL(url);
      const hostname = u.hostname.replace('www.', '');

      const parseStart = (s) => {
        if (!s) return '';
        if (/^\d+m\d+s$/.test(s)) {
          const m = s.match(/(\d+)m(\d+)s/);
          return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
        }
        if (/^\d+s$/.test(s)) return parseInt(s.replace('s', ''), 10);
        if (/^\d+$/.test(s)) return parseInt(s, 10);
        return '';
      };

      let videoId = '';
      let start = '';

      if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
        videoId = u.searchParams.get('v') || '';
        start = u.searchParams.get('t') || u.searchParams.get('start') || '';
        if (!videoId && u.pathname.startsWith('/embed/')) {
          videoId = u.pathname.split('/embed/')[1] || '';
        }
      } else if (hostname === 'youtu.be') {
        videoId = u.pathname.replace('/', '') || '';
        start = u.searchParams.get('t') || u.searchParams.get('start') || '';
      } else if (u.pathname.startsWith('/embed/')) {
        videoId = u.pathname.split('/embed/')[1] || '';
        start = u.searchParams.get('start') || '';
      }

      if (!videoId) return url;

      const params = new URLSearchParams();
      const parsedStart = parseStart(start);
      if (parsedStart) params.set('start', parsedStart);
      params.set('enablejsapi', '1');
      if (typeof window !== 'undefined' && window.location?.origin) {
        params.set('origin', window.location.origin);
      }

      return `https://www.youtube.com/embed/${videoId}${params.toString() ? `?${params.toString()}` : ''}`;
    } catch (e) {
      return url;
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <p className="text-neutral-500 text-xl font-light">Product details could not be resolved.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-black font-sans font-semibold hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-black pt-28 pb-24 selection:bg-black selection:text-white">
      <div className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Back button */}
          <motion.div whileHover={{ x: -5 }}>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black mb-12 transition-colors focus:outline-none"
            >
              <ArrowRight size={16} className="rotate-180" />
              Back to Dashboard
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
            
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-neutral-100 rounded-2xl flex items-center justify-center text-black mb-8 shadow-sm">
                {product.icon}
              </div>
              <span className="px-3.5 py-1 bg-neutral-100 text-[10px] font-bold uppercase tracking-widest rounded-full text-neutral-500 inline-block mb-6 font-mono border border-neutral-200/50">
                {product.tag}
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-black mb-6 leading-tight tracking-tight">
                {product.title}
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8 font-light whitespace-pre-line">
                {product.fullDesc}
              </p>
            </motion.div>

            {/* Right: Key Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-8 font-heading tracking-tight">Key Features</h2>
              <div className="space-y-4 mb-12">
                {product.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center mt-1 shrink-0 shadow-sm">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                    <span className="text-neutral-700 text-sm sm:text-base font-light leading-relaxed">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Store Badges if present */}
              {(product.playStore || product.appStore) && (
                <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-wrap gap-4 items-center">
                  {product.playStore && (
                    <a
                      href={product.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block hover:scale-[1.02] active:scale-95 transition-transform"
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                        alt="Get it on Google Play" 
                        className="h-10 w-auto drop-shadow-md"
                      />
                    </a>
                  )}
                  {product.appStore && (
                    <a
                      href={product.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block hover:scale-[1.02] active:scale-95 transition-transform"
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                        alt="Download on the App Store" 
                        className="h-10 w-auto drop-shadow-md"
                      />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Bottom: Demo Videos */}
          {(product.youtubeUrl || product.youtubeUrls) && (
            <div className="mt-16 border-t border-neutral-200 pt-16">
              <h2 className="text-3xl font-bold mb-12 font-heading tracking-tight">See It In Action</h2>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {(product.youtubeUrls || [product.youtubeUrl]).map((url, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-neutral-100 border border-neutral-200/50"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={toEmbedUrl(url)}
                      title={`${product.title} Demo ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
