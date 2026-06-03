import type { InjectionKey, Ref, ComputedRef } from "vue";

export interface MultiSelectOption {
	label: string;
	value: string;
}

export interface MultiSelectContext {
	isSelected: (value: string) => boolean;
	toggle: (value: string) => void;
	query: Ref<string>;
	searchable: ComputedRef<boolean>;
	matchesQuery: (label: string) => boolean;
}

export const MultiSelectKey: InjectionKey<MultiSelectContext> =
	Symbol("MultiSelect");