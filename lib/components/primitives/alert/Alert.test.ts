import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import Alert from "./Alert.vue";
import AlertTitle from "./AlertTitle.vue";
import AlertDescription from "./AlertDescription.vue";

describe("Alert", () => {
	it("renders with role='alert'", () => {
		const wrapper = mount(Alert);
		expect(wrapper.find('[role="alert"]').exists()).toBe(true);
	});

	it("renders default slot content (title and description)", () => {
		const wrapper = mount(Alert, {
			slots: {
				default: [
					h(AlertTitle, () => "Saved"),
					h(AlertDescription, () => "Your changes were saved."),
				],
			},
		});
		expect(wrapper.text()).toContain("Saved");
		expect(wrapper.text()).toContain("Your changes were saved.");
	});

	// --- variants ---
	it("applies the neutral variant by default", () => {
		const wrapper = mount(Alert);
		const el = wrapper.find('[role="alert"]');
		expect(el.classes()).toContain("bg-bg-surface");
		expect(el.classes()).toContain("border-border-default");
	});

	it("applies status variant classes", () => {
		const cases: { variant: "info" | "success" | "warning" | "danger"; surface: string; text: string }[] = [
			{ variant: "info", surface: "bg-info-surface", text: "text-info-text" },
			{ variant: "success", surface: "bg-success-surface", text: "text-success-text" },
			{ variant: "warning", surface: "bg-warning-surface", text: "text-warning-text" },
			{ variant: "danger", surface: "bg-danger-surface", text: "text-danger-text" },
		];
		for (const c of cases) {
			const wrapper = mount(Alert, { props: { variant: c.variant } });
			const el = wrapper.find('[role="alert"]');
			expect(el.classes()).toContain(c.surface);
			expect(el.classes()).toContain(c.text);
		}
	});

	// --- icon slot ---
	it("does not render the icon wrapper when no icon slot is provided", () => {
		const wrapper = mount(Alert, {
			slots: { default: () => h(AlertTitle, () => "Title") },
		});
		// no icon slot → the icon span shouldn't be present
		// (query for an svg; there should be none from the component itself)
		expect(wrapper.find("svg").exists()).toBe(false);
	});

	it("renders the icon slot when provided", () => {
		const wrapper = mount(Alert, {
			slots: {
				icon: () => h("svg", { "data-test": "icon" }),
				default: () => h(AlertTitle, () => "Title"),
			},
		});
		expect(wrapper.find('[data-test="icon"]').exists()).toBe(true);
	});

	// --- action slot ---
	it("renders the action slot when provided", () => {
		const wrapper = mount(Alert, {
			slots: {
				default: () => h(AlertTitle, () => "Title"),
				action: () => h("button", { "data-test": "action" }, "Do it"),
			},
		});
		expect(wrapper.find('[data-test="action"]').exists()).toBe(true);
	});

	it("does not render the action wrapper when no action slot is provided", () => {
		const wrapper = mount(Alert, {
			slots: { default: () => h(AlertTitle, () => "Title") },
		});
		expect(wrapper.find('[data-test="action"]').exists()).toBe(false);
	});

	// --- class merge ---
	it("merges a custom class onto the container", () => {
		const wrapper = mount(Alert, { props: { class: "mt-8" } });
		const el = wrapper.find('[role="alert"]');
		expect(el.classes()).toContain("mt-8");
		// base class still present
		expect(el.classes()).toContain("rounded-xl");
	});
});

describe("AlertTitle / AlertDescription", () => {
	it("AlertTitle renders its slot with emphasis", () => {
		const wrapper = mount(AlertTitle, { slots: { default: () => "My title" } });
		expect(wrapper.text()).toBe("My title");
		expect(wrapper.find("div").classes()).toContain("font-medium");
	});

	it("AlertDescription renders its slot", () => {
		const wrapper = mount(AlertDescription, { slots: { default: () => "Some detail" } });
		expect(wrapper.text()).toBe("Some detail");
	});

	it("AlertTitle merges a custom class", () => {
		const wrapper = mount(AlertTitle, {
			props: { class: "text-lg" },
			slots: { default: () => "T" },
		});
		expect(wrapper.find("div").classes()).toContain("text-lg");
		expect(wrapper.find("div").classes()).toContain("font-medium");
	});
});