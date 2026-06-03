import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { Field, FieldLabel, FieldDescription, FieldError } from "./index";
import Input from "../Input.vue";

describe("Field family", () => {
	describe("FieldLabel", () => {
		it("its `for` matches the id the Field gives the control", () => {
			const wrapper = mount({
				components: { Field, FieldLabel, Input },
				template: `
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input />
                    </Field>
                `,
			});
			const labelFor = wrapper.find("label").attributes("for");
			const inputId = wrapper.find("input").attributes("id");
			expect(labelFor).toBeTruthy();
			expect(labelFor).toBe(inputId); // clicking the label focuses the input
		});

		it("an explicit `for` overrides the Field id", () => {
			const wrapper = mount({
				components: { Field, FieldLabel },
				template: `<Field><FieldLabel for="custom">X</FieldLabel></Field>`,
			});
			expect(wrapper.find("label").attributes("for")).toBe("custom");
		});

		it("applies the required-asterisk class when the Field is required", () => {
			const wrapper = mount({
				components: { Field, FieldLabel },
				template: `<Field :required="true"><FieldLabel>X</FieldLabel></Field>`,
			});
			// jsdom can't see ::after content, so assert the class that drives it.
			const cls = wrapper.find("label").classes().join(" ");
			expect(cls).toContain("after:content-['*']");
		});

		it("does NOT apply the asterisk class when not required", () => {
			const wrapper = mount({
				components: { Field, FieldLabel },
				template: `<Field><FieldLabel>X</FieldLabel></Field>`,
			});
			const cls = wrapper.find("label").classes().join(" ");
			expect(cls).not.toContain("after:content-['*']");
		});
	});

	describe("FieldDescription", () => {
		it("renders with the Field's description id", () => {
			const wrapper = mount({
				components: { Field, FieldDescription },
				template: `<Field><FieldDescription>Helper</FieldDescription></Field>`,
			});
			const p = wrapper.find("p");
			expect(p.text()).toBe("Helper");
			expect(p.attributes("id")).toMatch(/-description$/);
		});

		it("closes the aria loop: the control's aria-describedby includes the description's id", () => {
			const wrapper = mount({
				components: { Field, FieldDescription, Input },
				template: `
                    <Field>
                        <Input />
                        <FieldDescription>Helper text</FieldDescription>
                    </Field>
                `,
			});
			const describedBy = wrapper.find("input").attributes("aria-describedby");
			const descId = wrapper.find("p").attributes("id");
			expect(describedBy).toContain(descId);
		});
	});

	describe("FieldError", () => {
		it("renders with role='alert' and the Field's error id", () => {
			const wrapper = mount({
				components: { Field, FieldError },
				template: `<Field :invalid="true"><FieldError>Bad</FieldError></Field>`,
			});
			const p = wrapper.find("p");
			expect(p.attributes("role")).toBe("alert");
			expect(p.attributes("id")).toMatch(/-error$/);
		});

		it("when invalid, the control's aria-describedby includes the error id", () => {
			const wrapper = mount({
				components: { Field, FieldError, Input },
				template: `
                    <Field :invalid="true">
                        <Input />
                        <FieldError>Required</FieldError>
                    </Field>
                `,
			});
			const describedBy = wrapper.find("input").attributes("aria-describedby");
			const errId = wrapper.find("p").attributes("id");
			expect(describedBy).toContain(errId);
		});
	});
});