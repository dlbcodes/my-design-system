import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Kbd from "./Kbd.vue";

describe("Kbd", () => {
	it("renders slot content", () => {
		const wrapper = mount(Kbd, { slots: { default: "Esc" } });
		expect(wrapper.text()).toBe("Esc");
	});

	it("renders as a kbd element", () => {
		const wrapper = mount(Kbd, { slots: { default: "x" } });
		expect(wrapper.element.tagName).toBe("KBD");
	});

	it("merges a custom class onto the root", () => {
		const wrapper = mount(Kbd, {
			props: { class: "text-base" },
			slots: { default: "x" },
		});
		expect(wrapper.classes()).toContain("text-base");
	});
});