import { BowArrow, GalleryVerticalEnd } from "lucide-react";
import { RegisterForm } from "./component/register-form";

export default function LoginPage() {
  return (
    <div className="bg-muted font-satoshi flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h2 className="flex justify-center gap-2 p-4 text-xl font-bold items-center">
          <BowArrow className="text-primary" />
          SNIPE
        </h2>

        <RegisterForm />
      </div>
    </div>
  );
}
