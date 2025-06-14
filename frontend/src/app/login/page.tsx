import { BowArrow, GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import Snipe from "@/assets/images/snipe.png";
import Image from "next/image";
export default function LoginPage() {
  return (
    <div className="grid min-h-svh font-satoshi lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <h2 className="flex justify-center gap-2 p-4 text-xl font-bold items-center">
            <BowArrow className="text-primary" />
            SNIPE
          </h2>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={Snipe}
          alt="Dashboard"
          className="absolute inset-0 h-full w-full object-cover object-left dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
