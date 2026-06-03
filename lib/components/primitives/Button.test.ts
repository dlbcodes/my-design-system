import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

// A lightweight stand-in for RouterLink so we don't need a real router.
// It renders an <a> and exposes the `to` it received.
const RouterLinkStub = {
	name: "RouterLink",
	props: ["to"],
	template: "<a :href=\"to\"><slot /></a>",
};

const mountButton = (options = {}) =>
	mount(Button, {
		global: { stubs: { RouterLink: RouterLinkStub } },
		...options,
	});

describe("Button", () => {
	it("renders a <button> by default", () => {
		const wrapper = mountButton({ slots: { default: "Click" } });
		expect(wrapper.element.tagName).toBe("BUTTON");
		expect(wrapper.text()).toBe("Click");
	});

	it("uses type='button' by default", () => {
		const wrapper = mountButton({ slots: { default: "x" } });
		expect(wrapper.attributes("type")).toBe("button");
	});

	it("renders a link when `to` is set", () => {
		const wrapper = mountButton({
			props: { to: "/home" },
			slots: { default: "Home" },
		});
		const a = wrapper.find("a");
		expect(a.exists()).toBe(true);
		expect(a.attributes("href")).toBe("/home");
	});

	it("does not set type or disabled attributes when rendered as a link", () => {
		const wrapper = mountButton({ props: { to: "/home" }, slots: { default: "x" } });
		expect(wrapper.attributes("type")).toBeUndefined();
		expect(wrapper.attributes("disabled")).toBeUndefined();
	});

	it("disables the native button when disabled", () => {
		const wrapper = mountButton({ props: { disabled: true }, slots: { default: "x" } });
		expect(wrapper.attributes("disabled")).toBeDefined();
		expect(wrapper.attributes("aria-disabled")).toBe("true");
	});

	it("is disabled and aria-busy while loading", () => {
		const wrapper = mountButton({ props: { loading: true }, slots: { default: "x" } });
		expect(wrapper.attributes("disabled")).toBeDefined();
		expect(wrapper.attributes("aria-busy")).toBe("true");
	});

	it("shows loading text and hides the slot while loading", () => {
		const wrapper = mountButton({
			props: { loading: true, loadingText: "Saving…" },
			slots: { default: "Save" },
		});
		expect(wrapper.text()).toContain("Saving…");
		expect(wrapper.text()).not.toContain("Save");
	});

	it("strips `to` from a link when disabled so it isn't navigable", () => {
		const wrapper = mountButton({
			props: { to: "/home", disabled: true },
			slots: { default: "x" },
		});
		// component is RouterLink (stubbed as <a>), but `to` should be undefined
		expect(wrapper.find("a").attributes("href")).toBeUndefined();
	});

	it("merges a custom class", () => {
		const wrapper = mountButton({ props: { class: "w-full" }, slots: { default: "x" } });
		expect(wrapper.classes()).toContain("w-full");
	});
});