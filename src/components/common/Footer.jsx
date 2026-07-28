import { Mail, MessageCircle, Linkedin, Youtube, Instagram, Send } from 'lucide-react';

function Footer() {
  const footerSections = [
    {
      title: 'Resources',
      links: [
        { name: 'NSE India', href: 'https://www.nseindia.com/' },
        { name: 'BSE Limited', href: 'https://www.bseindia.com/' },
        { name: 'MCX India', href: 'https://www.mcxindia.com/' },
        { name: 'Market News', href: 'https://www.moneycontrol.com/news/business/markets/' },
        { name: 'AMFI Data', href: 'https://www.amfiindia.com/' },
      ]
    },
    {
      title: 'Markets',
      links: [
        { name: 'Nifty 50 (NSE)', href: 'https://www.nseindia.com/market-data/live-equity-market' },
        { name: 'Sensex (BSE)', href: 'https://www.bseindia.com/sensex/IndexHighlight.html' },
        { name: 'Global Indices', href: 'https://www.investing.com/indices/major-indices' },
        { name: 'Trading Holidays (NSE)', href: 'https://www.nseindia.com/resources/exchange-communication-holidays' },
        { name: 'Banking Holidays (RBI)', href: 'https://www.rbi.org.in/Scripts/HolidayMatrixDisplay.aspx' },
      ]
    },
    {
      title: 'Navigate',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/product/corporate-action' },
        { name: 'Careers', href: '/careers' },
      ]
    }
  ];

  return (
    <footer className="bg-white pt-16 pb-12 border-t border-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-8 mb-20">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-6 lg:pr-12">
            <div className="flex items-center group">
              <img 
                src="/ADWealth_logo.png" 
                alt="ADWealth Logo" 
                className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <div className="max-w-sm text-neutral-500 leading-relaxed text-sm font-medium space-y-1">
              <p>PAN No: ABGCA0224J</p>
              <p>GST No: 24ABGCA0224J1Z3</p>
              <p>CIN : U62091GJ2026PTC179836</p>
              <p className="pt-2">
                301-303, Pramukh Tangent, KH-0, Saragasan<br />
                Gandhinagar, Gujarat, India - 382421
              </p>
            </div>
            <div className="space-y-4 pt-4">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] font-mono">Stay Connected</h4>
              <div className="flex gap-3">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=adwealthindia@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 text-black"
                  title="Email"
                >
                  <Mail className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                </a>
                <a
                  href="https://wa.me/917228882088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 text-black"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                </a>
                <a
                  href="https://in.linkedin.com/company/arhamfintech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 text-black"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                </a>
                <a
                  href="https://www.youtube.com/@arhamtechnology1673"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 text-black"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                </a>
                <a
                  href="https://www.instagram.com/arhamfintech?igsh=YjBoMzE2bXdmajR6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 text-black"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                </a>
                <a
                  href="https://t.me/+917228882088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 text-black"
                  title="Telegram"
                >
                  <Send className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                </a>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="font-bold text-black text-[13px] uppercase tracking-widest border-b border-neutral-100 pb-2 font-mono">
                {section.title}
              </h4>
              <ul className="space-y-3 text-sm text-neutral-500 font-medium">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="hover:text-black transition-colors block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="pt-8 border-t border-neutral-100 flex justify-center items-center text-xs text-neutral-400 font-medium uppercase tracking-wider font-mono">
          <p className="normal-case text-neutral-500 text-center">
            © {new Date().getFullYear()} ADWEALTH PRIVATE LIMITED. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
