import { cva, type VariantProps } from "class-variance-authority";

const baseStyles = [
	"group",
	"flex",
	"items-center",
	"gap-x-2",
	"w-full",
	"transition-colors",
	"duration-100",
	"ease-linear",
	"disabled:pointer-events-none",
	"disabled:opacity-50",
].join(" ");

export const inputVariants = cva(baseStyles, {
	variants: {
		variant: {
			primary: [
				"bg-bg-surface",
				"border",
				"border-border-default",
				"text-text-primary",
				"font-medium",
				"hover:border-border-strong",
				"focus-within:border-bg-inverse",
			].join(" "),

			contrast: [
				"bg-white",
				"border-2",
				"border-border-default",
				"text-text-primary",
				"font-medium",
				"hover:border-border-strong",
				"focus-within:border-bg-inverse",
			].join(" "),

			secondary: "",
			outline: "",
		},

		size: {
			xl: "",
			lg: "",
			base: "h-12 rounded-xl px-3.5",
			sm: "h-9 rounded-lg px-2 text-sm",
			xs: "",
			icon: "",
			none: "",
			checkbox: "h-6 w-6",
		},

		invalid: {
			true: [
				"border-red-500",
				"bg-red-50",
				"hover:border-red-600",
				"focus-within:border-red-600",
			].join(" "),

			false: "",
		},
	},

	defaultVariants: {
		variant: "primary",
		size: "base",
		invalid: false,
	},
});

export type InputProps =
	VariantProps<typeof inputVariants>;