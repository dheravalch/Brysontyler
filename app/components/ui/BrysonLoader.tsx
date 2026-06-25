export const BrysonLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <div className="relative flex flex-col items-center">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl flex items-center justify-center text-black font-black text-4xl shadow-[0_0_40px_rgba(251,191,36,0.3)] animate-pulse">
          BT
        </div>
        <div className="mt-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold tracking-tighter text-white">Bryson Tyler</h1>
          <p className="text-[10px] text-yellow-400 font-bold tracking-[3px] mt-1">PRODUCTIONS</p>
        </div>
        <div className="mt-8 w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};