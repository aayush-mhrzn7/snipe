"use client";
import { MailIcon } from "@/assets/icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { OTPFormData, OTPSchema } from "@/utils/schema/user.schema";
import { useMutation } from "@tanstack/react-query";
import { regenrateOTP, verifyOTP } from "@/services/user.service";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

const OTPVerification = () => {
  const searchParams = useSearchParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const { mutate: verifyMutate, isPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: verifyOTP,
    onSuccess: ({ status }) => {
      if ([200, 201, 204].includes(status)) {
        toast.success("User Account Verified");
        router.push("/login");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Verification failed");
    },
  });

  const { mutate: resendMutate } = useMutation({
    mutationKey: ["regenerate-otp"],
    mutationFn: regenrateOTP,
    onSuccess: ({ status }) => {
      if ([200, 201, 204].includes(status)) {
        toast.success("New code sent successfully");
        setTimeLeft(60); // Reset timer
        setCanResend(false); // Disable resend button
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to resend code");
    },
  });

  const onSubmit = (data: OTPFormData) => {
    verifyMutate({
      ...data,
      email: searchParams.get("email") || "",
    });
  };

  const handleResendCode = () => {
    if (canResend) {
      resendMutate({ email: searchParams.get("email") || "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 py-10 rounded-lg border border-primary-border shadow-md font-satoshi"
    >
      <span
        className="flex gap-2 items-center text-[20px] font-semibold my-5 cursor-pointer"
        onClick={() => router.back()}
      >
        <ChevronLeft />
        Go Back
      </span>
      <span className="p-4 rounded-md bg-primary-foreground text-primary flex justify-center items-center w-fit">
        <MailIcon />
      </span>
      <h2 className="text-2xl my-4 font-extrabold">Email Verification Code</h2>
      <span className="text-[#808080]">
        We sent a 6-digit email verification code to your email. Enter the code
        to proceed
      </span>

      <div className="w-full">
        <div className="my-4">
          <Controller
            control={control}
            name="otp"
            render={({ field }) => (
              <InputOTP maxLength={6} className="w-full" {...field}>
                <InputOTPGroup className="gap-2 grid grid-cols-6 w-full">
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="rounded-md h-[70px] w-full"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>

        <div className="flex flex-col my-5 gap-2">
          <Button disabled={isPending} type="submit" className="my-4">
            {isPending ? "Verifying..." : "Verify"}
          </Button>
          <span className="text-[14px] text-[#808080]">
            Didn't receive a code?{" "}
            <Button
              variant="ghost"
              disabled={!canResend}
              onClick={handleResendCode}
              className="text-primary font-semibold"
            >
              {canResend ? "Resend code" : `Resend in ${timeLeft}s`}
            </Button>
          </span>
        </div>
      </div>
    </form>
  );
};

export default OTPVerification;
