import { cva, type VariantProps } from "class-variance-authority";

const baseStyles = [
	"inline-flex",
	"items-center",
	"justify-center",
	"gap-1",
	"w-fit",
	"shrink-0",
	"overflow-hidden",
	"whitespace-nowrap",
	"rounded",
	"border",
	"px-2",
	"py-0.5",
	"text-[10px]",
	"font-bold",
	"uppercase",
	"tracking-tight",
	"transition-colors",
	"[&>svg]:size-3",
].join(" ");

export const badgeVariants = cva(baseStyles, {
	variants: {
		variant: {
			// Status variants → the status token triplets.
			success: "border-success-border bg-success-surface text-success-text",
			pending: "border-warning-border bg-warning-surface text-warning-text",
			info: "border-info-border bg-info-surface text-info-text",
			destructive: "border-danger-border bg-danger-surface text-danger-text",

			// Non-status variants → existing neutral / brand tokens.
			neutral: "border-border-default bg-bg-subtle text-text-secondary",
			primary: "border-brand-200 bg-brand-200 text-text-inverse",
			outline: "border-border-default bg-transparent text-text-secondary",
		},
	},
	defaultVariants: {
		variant: "neutral",
	},
});

export type BadgeProps = VariantProps<typeof badgeVariants>;