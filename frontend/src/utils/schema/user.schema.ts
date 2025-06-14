import { z } from "zod";

const passwordValidation = z
  .string()
  .min(8, {
    message: "Password must be at least 8 characters",
  })
  .refine((password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasUppercase && hasLowercase && hasNumber;
  });
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: passwordValidation,
});
const RegisterSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "Invalid email" }),
  password: passwordValidation,
});
const OTPSchema = z.object({
  otp: z.string().length(6),
  email: z.string().email({ message: "Invalid email" }),
});
type LoginFormData = z.infer<typeof LoginSchema>;
type RegisterFormData = z.infer<typeof RegisterSchema>;
type OTPFormData = z.infer<typeof OTPSchema>;
export { LoginSchema, RegisterSchema, OTPSchema };
export type { LoginFormData, RegisterFormData, OTPFormData };
