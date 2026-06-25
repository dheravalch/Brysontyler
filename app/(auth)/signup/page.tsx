/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { CreatorApplicationWizard } from "@/app/components/CreatorApplicationForm";
import { useSignUp } from "@/app/hooks/useAuth";
import { SignUpPayload } from "@/app/models/AuthModel";

const fanSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["fan", "creator"]),
});

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = (searchParams.get("role") || "fan") as "fan" | "creator";
  const { mutateAsync, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(fanSchema),
    defaultValues: {
      role: role,
    },
  });

  const onFanSubmit = async (data: SignUpPayload) => {
    await mutateAsync(data);
    router.push("/verify-email");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-center uppercase tracking-tighter">
        {role === "creator" ? "Apply as Creator" : "Join the Experience"}
      </h2>

      {role === "fan" ? (
        <form onSubmit={handleSubmit(onFanSubmit)} className="space-y-4">
          <input type="hidden" {...register("role")} />

          <Input
            {...register("name")}
            type="text"
            placeholder="Full Name"
            error={errors.name?.message as string}
          />
          <Input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            error={errors.email?.message as string}
          />
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            error={errors.password?.message as string}
          />
          <Button isLoading={isPending || isSubmitting} type="submit">
            {isSubmitting ? "CREATING..." : "CREATE ACCOUNT"}
          </Button>
        </form>
      ) : (
        <CreatorApplicationWizard/>
      )}

      <p className="text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-yellow-400 font-bold hover:text-yellow-300"
        >
          Login
        </Link>
      </p>
    </div>
  );
}