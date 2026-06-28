import { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase text-zinc-400">{label}</label>
        <textarea
          ref={ref}
          {...props}
          className={`w-full bg-[#0a0a0a] border rounded-xl py-3 px-4 text-sm outline-none transition-all focus:border-yellow-500 min-h-[120px] resize-none ${
            error ? 'border-red-500' : 'border-white/8'
          }`}
        />
        {error &&  <span className="text-red-500 text-[10px]  tracking-wide">
          {error}
        </span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;