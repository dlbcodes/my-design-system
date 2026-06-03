import type { InjectionKey, ComputedRef } from "vue";

/**
 * Shared field state. FieldRoot provides it; FieldLabel/Description/Error use it
 * to generate matching ids, and form controls (Input, Textarea, Checkbox, the
 * Select trigger, ...) optionally inject it to wire aria-describedby /
 * aria-invalid / id. Controls still work standalone when there's no Field.
 */
export interface FieldContext {
	/** Base id for the field; the control uses it as its element id. */
	id: ComputedRef<string>;
	/** Id of the description element (for aria-describedby). */
	descriptionId: ComputedRef<string>;
	/** Id of the error element (for aria-describedby). */
	errorId: ComputedRef<string>;
	/** Whichever message id should describe the control (error wins). */
	describedById: ComputedRef<string | undefined>;
	/** Whether the field is invalid (drives aria-invalid + data-invalid styling). */
	invalid: ComputedRef<boolean>;
	/** Whether the field is disabled. */
	disabled: ComputedRef<boolean>;
	/** Whether the field is required. */
	required: ComputedRef<boolean>;
}

export const FieldKey: InjectionKey<FieldContext> = Symbol("Field");