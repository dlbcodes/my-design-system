import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
	"relative flex w-full gap-3 rounded-xl border px-4 py-3 text-sm",
	{
		variants: {
			variant: {
				neutral: "bg-bg-surface border-border-default text-text-primary",
				info: "bg-info-surface border-info-border text-info-text",
				success: "bg-success-surface border-success-border text-success-text",
				warning: "bg-warning-surface border-warning-border text-warning-text",
				danger: "bg-danger-surface border-danger-border text-danger-text",
			},
		},
		defaultVariants: {
			variant: "neutral",
		},
	},
);

export type AlertVariantsProps = VariantProps<typeof alertVariants>;