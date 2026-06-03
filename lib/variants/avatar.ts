import { cva, type VariantProps } from "class-variance-authority";

const baseStyles = [
	"flex",
	"flex-col",
	"items-center",
	"justify-center",
	"w-full",
	"uppercase",
	"text-text-primary",
	"bg-bg-surface",
	"border",
	"border-border-default",
	"overflow-hidden",
].join(" ");

const innerStyles = [
	"*:overflow-hidden",
	"*:bg-white",
	"*:shadow-xs",
	"*:rounded-2xl",
	"*:dark:bg-dark-950",
	"*:dark:border",
	"*:dark:border-black",
	"*:dark:shadow-[inset_-1px_1px_2px_0px_rgba(71,71,71,0.56)]",
].join(" ");

export const avatarVariants = cva([baseStyles, innerStyles].join(" "), {
	variants: {
		size: {
			"10xl": "text-3xl size-30 xl:size-40 p-1 rounded-3xl *:rounded-[20px]",
			"9xl": "text-3xl size-30 p-1 rounded-3xl *:rounded-[20px]",
			"8xl": "text-3xl size-28 p-1 rounded-3xl *:rounded-[20px]",
			"7xl": "text-3xl size-26 p-1 rounded-3xl *:rounded-[20px]",
			"6xl": "text-3xl size-24 p-1 rounded-3xl *:rounded-[20px]",
			"5xl": "text-3xl size-22 p-1 rounded-3xl *:rounded-[20px]",
			"4xl": "text-4xl size-20 p-1 rounded-3xl *:rounded-[20px]",
			"3xl": "text-xl size-18 p-1 rounded-2xl *:rounded-xl",
			"2xl": "size-16",
			xl: "size-14 rounded-xl *:rounded-[10px]",
			lg: "size-12 p-0.5 rounded-xl *:rounded-[10px]",
			base: "size-10 rounded-xl *:rounded-[10px]",
			sm: "size-8 rounded-xl *:rounded-[10px]",
			xs: "size-6 rounded-md",
		},
	},

	defaultVariants: {
		size: "base",
	},
});

export type AvatarProps = VariantProps<typeof avatarVariants>;