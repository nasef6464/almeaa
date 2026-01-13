import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated artifacts and tooling helpers
    "app/generated/**",
    "prisma/migrations/**",
    "scripts/setup-env.js",
    // Legacy prototype workspace not part of Next app lint scope
    "almeaago/**",
    // Old test playground page
    "app/test/**",
  ]),
]);

export default eslintConfig;
