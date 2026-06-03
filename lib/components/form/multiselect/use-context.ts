import { inject } from "vue";
import { MultiSelectKey, type MultiSelectContext } from "./context";

export const useMultiSelectContext = (part: string): MultiSelectContext => {
	const ctx = inject(MultiSelectKey, null);
	if (!ctx) throw new Error(`${part} must be used inside <MultiSelect>.`);
	return ctx;
};