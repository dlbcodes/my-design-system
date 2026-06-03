import { describe, it, expect } from "vitest";
import { computed } from "vue";
import { mount } from "@vue/test-utils";
import Switch from "./Switch.vue";
import { FieldKey } from "../../core/field-context";

const fakeField = (over: Partial<Record<string, unknown>> = {}) => ({
	id: computed(() => over.id ?? "field-id"),
	descriptionId: computed(() => "desc-id"),
	errorId: computed(() => "err-id"),
	describedById: computed(() => over.describedById ?? "desc-id"),
	invalid: computed(() => over.invalid ?? false),
	disabled: computed(() => over.disabled ?? false),
	required: computed(() => over.required ?? false),
});

describe("Switch", () => {
	describe("rendering & a11y", () => {
		it("renders a checkbox input with role='switch'", () => {
			const wrapper = mount(Switch, { props: { modelValue: false } });
			const input = wrapper.find("input");
			expect(input.exists()).toBe(true);
			expect(input.attributes("type")).toBe("checkbox");
			expect(input.attributes("role")).toBe("switch");
		});

		it("reflects modelValue as checked and aria-checked", () => {
			const on = mount(Switch, { props: { modelValue: true } });
			const off = mount(Switch, { props: { modelValue: false } });
			expect((on.find("input").element as HTMLInputElement).checked).toBe(true);
			expect(on.find("input").attributes("aria-checked")).toBe("true");
			expect(off.find("input").attributes("aria-checked")).toBe("false");
		});

		it("sets aria-label when provided", () => {
			const wrapper = mount(Switch, {
				props: { modelValue: false, ariaLabel: "Enable notifications" },
			});
			expect(wrapper.find("input").attributes("aria-label")).toBe("Enable notifications");
		});
	});

	describe("v-model", () => {
		it("emits update:modelValue=true when turned on", async () => {
			const wrapper = mount(Switch, { props: { modelValue: false } });
			const input = wrapper.find("input");
			(input.element as HTMLInputElement).checked = true;
			await input.trigger("change");
			expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]);
		});

		it("emits update:modelValue=false when turned off", async () => {
			const wrapper = mount(Switch, { props: { modelValue: true } });
			const input = wrapper.find("input");
			(input.element as HTMLInputElement).checked = false;
			await input.trigger("change");
			expect(wrapper.emitted("update:modelValue")![0]).toEqual([false]);
		});
	});

	describe("Field injection", () => {
		it("inherits id, disabled, and describedby from Field", () => {
			const wrapper = mount(Switch, {
				props: { modelValue: false },
				global: {
					provide: {
						[FieldKey as symbol]: fakeField({
							disabled: true,
							describedById: "err-id",
						}),
					},
				},
			});
			const input = wrapper.find("input");
			expect(input.attributes("id")).toBe("field-id");
			expect(input.attributes("disabled")).toBeDefined();
			expect(input.attributes("aria-describedby")).toBe("err-id");
		});

		it("works standalone with no Field", () => {
			const wrapper = mount(Switch, { props: { modelValue: false } });
			const input = wrapper.find("input");
			expect(input.attributes("disabled")).toBeUndefined();
			expect(input.attributes("aria-describedby")).toBeUndefined();
		});

		it("disabled is true if either own prop or Field is disabled (OR precedence)", () => {
			const wrapper = mount(Switch, {
				props: { modelValue: false, disabled: true },
				global: { provide: { [FieldKey as symbol]: fakeField({ disabled: false }) } },
			});
			expect(wrapper.find("input").attributes("disabled")).toBeDefined();
		});
	});
});