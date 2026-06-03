import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Badge from "./Badge.vue";

describe("Badge", () => {
	it("renders slot content", () => {
		const wrapper = mount(Badge, { slots: { default: "New" } });
		expect(wrapper.text()).toBe("New");
	});

	it("renders as a span", () => {
		const wrapper = mount(Badge, { slots: { default: "x" } });
		expect(wrapper.element.tagName).toBe("SPAN");
	});

	it("merges a custom class onto the root", () => {
		const wrapper = mount(Badge, {
			props: { class: "uppercase" },
			slots: { default: "x" },
		});
		expect(wrapper.classes()).toContain("uppercase");
	});

	it("applies a different variant than the default without error", () => {
		const neutral = mount(Badge, { slots: { default: "x" } });
		const success = mount(Badge, {
			props: { variant: "success" },
			slots: { default: "x" },
		});
		// The two variants should produce different class sets.
		expect(neutral.classes()).not.toEqual(success.classes());
	});
});