import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

export default function Profile() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black">Profile Settings</h2>
        <p className="text-zinc-400 text-sm mt-1">Manage your public information and account identity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Display Name</label>
          <Input
            placeholder="Bryson Prod" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
           <Input
            placeholder="Bryson Prod" 
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-black hover:bg-yellow-400 transition-all">
          SAVE CHANGES
        </Button>
        <button  className="px-8 py-3 rounded-xl font-bold text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
          CANCEL
        </button>
      </div>
    </div>
  );
}