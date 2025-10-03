import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	// Override or add custom rules here
	{
		rules: {
			"react/no-escaped-entities": "off",
		},
	},
	{
		files: ["**/*.js"],
		rules: {
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-var-requires": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/*": "off", // catch-all safety
		},
	},
];

export default eslintConfig;
