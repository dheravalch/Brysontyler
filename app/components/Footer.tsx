export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="bg-gradient-to-b from-zinc-900 to-black py-16 border-y border-yellow-500/10 mb-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight">
            The Premier Adult Entertainment Hub
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Bryson Tyler Productions provides you with unlimited free porn videos featuring the hottest pornstars. 
            Enjoy the largest amateur porn community on the net, as well as full-length scenes 
            from the top XXX studios. We update our content daily to ensure you always 
            get the best quality sex movies available anywhere.
          </p>
          
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-1 w-12 bg-yellow-600 rounded-full" />
            <div className="h-1 w-4 bg-yellow-800 rounded-full" />
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent opacity-40" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {[
            { title: "Platform", links: ["About Us", "Press", "Blog", "Careers"] },
            { title: "Support", links: ["Help Center", "Safety Center", "Contact", "Report"] },
            { title: "Legal", links: ["Terms", "Privacy", "Removal", "2257"] },
            { title: "Connect", links: ["Twitter", "Instagram", "Discord", "Support"] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 font-black text-xs mb-6 tracking-[0.2em] uppercase">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-500 hover:text-yellow-400 transition-all duration-300 text-sm font-medium hover:pl-2 hover:text-yellow-100">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-3">
            <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
            <div className="h-2 w-2 rounded-full bg-yellow-600 animate-pulse" />
          </div>
          
          <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
            © 2026 <span className="text-yellow-500">Bryson Tyler Productions</span> • 18+ Only • All Payments USD
          </p>
          
          <div className="flex gap-6">
            <span className="text-yellow-600 hover:text-yellow-400 cursor-pointer transition-colors text-[10px] font-black tracking-widest uppercase border-b border-yellow-600/30">
              Terms
            </span>
            <span className="text-yellow-600 hover:text-yellow-400 cursor-pointer transition-colors text-[10px] font-black tracking-widest uppercase border-b border-yellow-600/30">
              Privacy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}