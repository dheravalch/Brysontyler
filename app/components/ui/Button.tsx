import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  isLoading,
  className = "cursor-pointer",
  ...props
}: ButtonProps) {
  const baseStyles = `
    w-full py-5 rounded-2xl font-black text-lg transition-all 
    active:scale-[0.97] flex items-center justify-center gap-2 
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary:
      "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:bg-yellow-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]",

    outline:
      "border border-white/10 text-white hover:border-yellow-400/50 hover:bg-yellow-400/5 hover:text-yellow-400",

    ghost: "text-zinc-500 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`${baseStyles} ${variants[variant]} ${className} `}
    >
      {children}
      {isLoading && <Loader2 className="animate-spin" size={20} />}
    </button>
  );
}
