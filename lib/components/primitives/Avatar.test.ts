import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Avatar from "./Avatar.vue";

describe("Avatar", () => {
	it("renders the image when src is provided", () => {
		const wrapper = mount(Avatar, {
			props: { src: "/me.jpg", name: "Ana Silva" },
		});
		const img = wrapper.find("img");
		expect(img.exists()).toBe(true);
		expect(img.attributes("src")).toBe("/me.jpg");
	});

	it("uses the name as alt text when an image is shown", () => {
		const wrapper = mount(Avatar, {
			props: { src: "/me.jpg", name: "Ana Silva" },
		});
		expect(wrapper.find("img").attributes("alt")).toBe("Ana Silva");
	});

	it("falls back to the name's first initial when there is no src", () => {
		const wrapper = mount(Avatar, { props: { name: "bruno costa" } });
		expect(wrapper.find("img").exists()).toBe(false);
		expect(wrapper.text()).toBe("B");
	});

	it("shows '?' when there is neither src nor name", () => {
		const wrapper = mount(Avatar, {});
		expect(wrapper.text()).toBe("?");
	});

	it("gives a decorative (empty) alt when src exists but name does not", () => {
		const wrapper = mount(Avatar, { props: { src: "/me.jpg" } });
		expect(wrapper.find("img").attributes("alt")).toBe("");
	});

	it("merges a custom class onto the root", () => {
		const wrapper = mount(Avatar, { props: { class: "ring-2" } });
		expect(wrapper.classes()).toContain("ring-2");
	});
});