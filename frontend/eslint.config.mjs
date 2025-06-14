import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Resolve the current file and directory names
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up the compatibility wrapper
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Combine extends configurations
const eslintConfig = [
  // Extending core Next.js and TypeScript configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Optionally add any additional custom rules or overrides here
  {
    rules: {
      // For example, disable the 'any' rule (optional)
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off", // If you want to allow unused variables
    },
  },
];

export default eslintConfig;
