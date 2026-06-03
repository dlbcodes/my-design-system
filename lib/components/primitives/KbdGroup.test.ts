import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import KbdGroup from "./KbdGroup.vue";

describe("KbdGroup", () => {
	it("renders slot content", () => {
		const wrapper = mount(KbdGroup, { slots: { default: "⌘K" } });
		expect(wrapper.text()).toBe("⌘K");
	});

	it("renders as a div", () => {
		const wrapper = mount(KbdGroup, { slots: { default: "x" } });
		expect(wrapper.element.tagName).toBe("DIV");
	});

	it("sets aria-label and role='group' when ariaLabel is provided", () => {
		const wrapper = mount(KbdGroup, {
			props: { ariaLabel: "Command K" },
			slots: { default: "x" },
		});
		expect(wrapper.attributes("aria-label")).toBe("Command K");
		expect(wrapper.attributes("role")).toBe("group");
	});

	it("omits aria-label and role when ariaLabel is absent", () => {
		const wrapper = mount(KbdGroup, { slots: { default: "x" } });
		expect(wrapper.attributes("aria-label")).toBeUndefined();
		expect(wrapper.attributes("role")).toBeUndefined();
	});

	it("merges a custom class onto the root", () => {
		const wrapper = mount(KbdGroup, {
			props: { class: "gap-2" },
			slots: { default: "x" },
		});
		expect(wrapper.classes()).toContain("gap-2");
	});
});