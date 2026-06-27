import { Upload, X } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

export function UploadSection({ 
  title, desc, isMulti, isVideo, isPassport 
}: { 
  title: string, desc: string, isMulti?: boolean, isVideo?: boolean, isPassport?: boolean 
}) {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(isPassport ? [newFiles[0]] : [...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="text-[11px] text-zinc-500">{desc}</p>
      </div>
      
      <div 
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-zinc-800 rounded-2xl p-10 hover:border-zinc-700 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 bg-zinc-900/50"
      >
        <Upload className="text-zinc-600" size={32} />
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">
          Click to upload {isPassport ? "your passport" : "files"}
        </span>
        <input 
          ref={inputRef} 
          type="file" 
          className="hidden" 
          multiple={!isPassport} 
          accept={isVideo ? "video/*" : "image/*"}
          onChange={handleFileChange} 
        />
      </div>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {files.map((file, i) => {
            const previewUrl = URL.createObjectURL(file);
            return (
              <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-zinc-700 bg-black">
                {file.type.startsWith('image') ? (
                  <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-[10px] text-zinc-400">VIDEO</div>
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }} 
                  className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 p-1 rounded-full transition-colors"
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}