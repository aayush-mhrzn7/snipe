import { MailIcon } from "@/assets/icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
const index = () => {
  return (
    <div className="p-5 py-10 rounded-lg border border-primary-border shadow-md font-satoshi">
      <span className="p-4 rounded-md bg-primary-foreground text-primary  flex justify-center items-center w-fit">
        <MailIcon />
      </span>
      <h2 className="text-2xl my-4 font-extrabold">Email Verification Code</h2>
      <span className="text-[#808080]">
        We sent a 6-digit email verification code to your email. Enter the code
        to proceed
      </span>
      <div className="w-full ">
        <div className="my-4">
          <InputOTP maxLength={6} className="w-full ">
            <InputOTPGroup className="gap-2  grid grid-cols-6  w-full">
              <InputOTPSlot index={0} className="rounded-md h-[70px] w-full " />
              <InputOTPSlot index={1} className="rounded-md h-[70px] w-full " />
              <InputOTPSlot index={2} className="rounded-md h-[70px] w-full " />
              <InputOTPSlot index={3} className="rounded-md h-[70px] w-full " />
              <InputOTPSlot index={4} className="rounded-md h-[70px] w-full " />
              <InputOTPSlot index={5} className="rounded-md h-[70px] w-full " />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex flex-col my-5 gap-2">
          <Button className="my-4">Submit</Button>
          <span className="text-[14px] text-[#808080] ">
            Didn&apos;t received a code?{" "}
            <span className="text-primary font-semibold">
              Resend code in 50s
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default index;
