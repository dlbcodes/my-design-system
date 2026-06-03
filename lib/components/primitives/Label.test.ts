import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Label from "./Label.vue";

describe("Label", () => {
	it("renders slot content", () => {
		const wrapper = mount(Label, { slots: { default: "Email" } });
		expect(wrapper.text()).toBe("Email");
	});

	it("renders as a label element", () => {
		const wrapper = mount(Label, { slots: { default: "x" } });
		expect(wrapper.element.tagName).toBe("LABEL");
	});

	it("sets the for attribute when provided", () => {
		const wrapper = mount(Label, {
			props: { for: "email-input" },
			slots: { default: "x" },
		});
		expect(wrapper.attributes("for")).toBe("email-input");
	});

	it("omits the for attribute when not provided", () => {
		const wrapper = mount(Label, { slots: { default: "x" } });
		expect(wrapper.attributes("for")).toBeUndefined();
	});

	it("merges a custom class onto the root", () => {
		const wrapper = mount(Label, {
			props: { class: "text-base" },
			slots: { default: "x" },
		});
		expect(wrapper.classes()).toContain("text-base");
	});
});