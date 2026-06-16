import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "./ui/Button";
import Input from "./ui/Input";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
const creatorSchema = z.object({
  legalName: z.string().min(2, "Legal name is required"),
  idDocument: z
    .any()
    .refine((files) => files?.length > 0, "ID Document is required")
    .refine((files) => files?.[0]?.size <= 5000000, "Max file size is 5MB")
    .refine(
      (files) => ["image/jpeg", "image/png", "application/pdf"].includes(files?.[0]?.type),
      "Only JPG, PNG, or PDF allowed"
    ),
});

export const CreatorApplicationForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(creatorSchema),
  });

  const onSubmit = () => {
    toast.success("Application submitted! We'll review your documents.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-in fade-in duration-300">
      <Input
        {...register("legalName")} 
        placeholder="Legal Name" 
        error={errors.legalName?.message as string}
      />
      
      <div className="flex flex-col gap-2">
        <div className={`border border-dashed p-4 rounded-xl text-center ${errors.idDocument ? 'border-red-500' : 'border-white/10 bg-zinc-950'}`}>
          <p className="text-zinc-500 text-sm mb-2">Government Issued ID</p>
          <input 
            type="file" 
            {...register("idDocument")}
            className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-white" 
          />
        </div>
        {errors.idDocument && (
          <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{String(errors.idDocument.message)}</p>
        )}
      </div>
      
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "SUBMITTING..." : "SAVE AND SUBMIT APPLICATION"}
      </Button>
    </form>
  );
};