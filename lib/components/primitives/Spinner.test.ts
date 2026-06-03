import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Spinner from "./Spinner.vue";

describe("Spinner", () => {
	it("has role='status' on the root for assistive tech", () => {
		const wrapper = mount(Spinner);
		expect(wrapper.attributes("role")).toBe("status");
	});

	it("renders the default label in a visually-hidden span", () => {
		const wrapper = mount(Spinner);
		const srLabel = wrapper.find(".sr-only");
		expect(srLabel.exists()).toBe(true);
		expect(srLabel.text()).toBe("Loading");
	});

	it("uses a custom label when provided", () => {
		const wrapper = mount(Spinner, { props: { label: "Saving changes" } });
		expect(wrapper.find(".sr-only").text()).toBe("Saving changes");
	});

	it("hides the decorative svg from assistive tech", () => {
		const wrapper = mount(Spinner);
		expect(wrapper.find("svg").attributes("aria-hidden")).toBe("true");
	});

	it("merges a custom class onto the svg", () => {
		const wrapper = mount(Spinner, { props: { class: "size-10" } });
		expect(wrapper.find("svg").classes()).toContain("size-10");
	});
});