import { User } from "../models/AuthModel";

interface FooterProps {
  openSignUp?: () => void;
  user?: User;
}

export default function Footer({ openSignUp, user }: FooterProps) {
  const footerLinks = [
    { title: "Best Models", title2: "Hire Contractors" },
    { title: "Hot Offers", title2: "Run Payroll" },
    { title: "Trending Content", title2: "Expand Globally" },
    { title: "Exclusive Online", title2: "Offer Benefits" },
    { title: "Live Now", title2: "Stock Options" },
    { title: "Private Community", title2: "Employment Blog" },
    { title: "Discount 50%", title2: "" },
  ];

  return (
    <footer className="bg-[#09090b] border-t border-white/5 py-12 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-4 max-w-sm">
            <h2 className="text-xl font-medium tracking-tight leading-snug">
              Indulge in Exclusive Content
              <br />
              <span className="text-gray-300">
                and Private Unlimited Access.
              </span>
            </h2>

            <button
              onClick={() => {
                openSignUp?.();
              }}
              className="bg-yellow-400 rounded-4xl hover:bg-yellow-300 text-black font-semibold text-md w-fit  px-7 py-2  shadow-[0_0_40px_rgba(250,204,21,0.2)] hover:shadow-[0_0_60px_rgba(250,204,21,0.4)] transition-all active:scale-[0.97]"
            >
              Join Now
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-[13px] text-zinc-400">
            {footerLinks.map((item, idx) => (
              <div key={idx} className="contents">
                <a href="#" className="hover:text-[#F7E018] transition-colors">
                  {item.title}
                </a>
                <a href="#" className="hover:text-[#F7E018] transition-colors">
                  {item.title2}
                </a>
              </div>
            ))}
          </div>
          <div className="self-start text-lg font-black tracking-tighter uppercase">
            Bryson<span className="text-[#F7E018]">Tyler</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
