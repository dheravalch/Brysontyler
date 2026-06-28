/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { useCompleteProfile } from "@/app/hooks/useAuth";
import PhoneNumberField from "@/app/components/ui/PhoneInput";
import LocationSelect from "@/app/components/ui/LocationSelect";
import { Country, State } from "country-state-city";
import TextArea from "@/app/components/ui/TextArea";
const personalDetailsSchema = z.object({
  phoneNumber: z.string().min(10, "Invalid phone number"),
  dateOfBirth: z.string().refine(
    (val) => {
      const dob = new Date(val);
      const today = new Date("2026-06-28");
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      return age >= 18;
    },
    { message: "You must be at least 18 years old" },
  ),
  country: z.string().min(2, "Required"),
  state: z.string().min(2, "Required"),
  city: z.string().min(2, "Required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

interface PersonalDetailsProps {
  onNext: () => void;
}

export default function PersonalDetails({ onNext }: PersonalDetailsProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalDetailsSchema),
  });
  const selectedCountryName = watch("country");
  const selectedStateName = watch("state");

  const countryData = Country.getAllCountries().find(
    (c) => c.name === selectedCountryName,
  );
  const stateData = State.getStatesOfCountry(countryData?.isoCode || "").find(
    (s) => s.name === selectedStateName,
  );
  const { mutate, isPending } = useCompleteProfile(onNext);
  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid grid-cols-2 gap-6">
        <PhoneNumberField
          name="phoneNumber"
          label="Primary Mobile Number"
          control={control}
          error={errors.phoneNumber?.message as string}
        />
        <Input
          {...register("dateOfBirth")}
          label="Date of Birth"
          type="date"
          error={errors.dateOfBirth?.message as string}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <LocationSelect
          name="country"
          label="Country"
          type="country"
          control={control}
          error={errors.country?.message as string}
        />
        <LocationSelect
          name="state"
          label="State"
          type="state"
          countryCode={countryData?.isoCode}
          control={control}
          error={errors.state?.message as string}
        />
        <LocationSelect
          name="city"
          label="City"
          type="city"
          countryCode={countryData?.isoCode}
          stateCode={stateData?.isoCode}
          control={control}
          error={errors.city?.message as string}
        />
      </div>
      <TextArea
        {...register("bio")}
        label="Professional Bio"
        placeholder="Fashion creator and model..."
        error={errors.bio?.message as string}
      />

      <Button isLoading={isPending} disabled={isPending} type="submit">
        Save & Continue <ArrowRight size={14} />
      </Button>
    </motion.form>
  );
}
