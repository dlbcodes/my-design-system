import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";
// ⚠️ ADJUST to your real export — one of these is correct:
// import { Field } from "./field";
import Field from "./field/Field.vue";
// import Field from "./field/FieldRoot.vue";

describe("Input", () => {
	describe("rendering & model", () => {
		it("renders an input element", () => {
			const wrapper = mount(Input);
			expect(wrapper.find("input").exists()).toBe(true);
		});

		it("works with no v-model (uncontrolled, no throw)", () => {
			const wrapper = mount(Input);
			expect((wrapper.find("input").element as HTMLInputElement).value).toBe("");
		});

		it("displays the bound model value", () => {
			const wrapper = mount(Input, { props: { modelValue: "hello" } });
			expect((wrapper.find("input").element as HTMLInputElement).value).toBe("hello");
		});

		it("coerces null model to an empty string on the input", () => {
			const wrapper = mount(Input, { props: { modelValue: null } });
			expect((wrapper.find("input").element as HTMLInputElement).value).toBe("");
		});

		it("emits update:modelValue with the typed value", async () => {
			const wrapper = mount(Input, { props: { modelValue: "" } });
			const input = wrapper.find("input");
			(input.element as HTMLInputElement).value = "abc";
			await input.trigger("input");
			expect(wrapper.emitted("update:modelValue")![0]).toEqual(["abc"]);
		});

		it("forwards the type prop", () => {
			const wrapper = mount(Input, { props: { type: "email" } });
			expect(wrapper.find("input").attributes("type")).toBe("email");
		});
	});

	describe("own props", () => {
		it("sets disabled, required, aria-invalid from its own props", () => {
			const wrapper = mount(Input, {
				props: { disabled: true, required: true, invalid: true },
			});
			const input = wrapper.find("input");
			expect((input.element as HTMLInputElement).disabled).toBe(true);
			expect(input.attributes("aria-required")).toBe("true");
			expect(input.attributes("aria-invalid")).toBe("true");
		});

		it("puts data-invalid on the input element when invalid", () => {
			const wrapper = mount(Input, { props: { invalid: true } });
			expect(wrapper.find("input").attributes("data-invalid")).toBe("true");
		});
	});

	describe("Field injection (real Field)", () => {
		it("inherits disabled, required, invalid, and an id from a real Field", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field :invalid="true" :disabled="true" :required="true"><Input /></Field>`,
			});
			const input = wrapper.find("input");
			expect(input.attributes("id")).toBeTruthy();
			expect((input.element as HTMLInputElement).disabled).toBe(true);
			expect(input.attributes("aria-required")).toBe("true");
			expect(input.attributes("aria-invalid")).toBe("true");
		});

		it("works standalone with no Field", () => {
			const wrapper = mount(Input);
			const input = wrapper.find("input");
			expect(input.attributes("aria-invalid")).toBeUndefined();
			expect((input.element as HTMLInputElement).disabled).toBe(false);
			expect(input.attributes("aria-describedby")).toBeUndefined();
		});

		it("props WIN: explicit invalid=false overrides an invalid Field", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field :invalid="true"><Input :invalid="false" /></Field>`,
			});
			expect(wrapper.find("input").attributes("aria-invalid")).toBeUndefined();
		});

		it("props WIN: explicit disabled=false overrides a disabled Field", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field :disabled="true"><Input :disabled="false" /></Field>`,
			});
			expect((wrapper.find("input").element as HTMLInputElement).disabled).toBe(false);
		});
	});

	describe("class merging", () => {
		it("merges a custom class onto the wrapper", () => {
			const wrapper = mount(Input, { props: { class: "w-full" } });
			expect(wrapper.classes()).toContain("w-full");
		});
	});
});