import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Progress from "./Progress.vue";

// Helper: read the indicator's transform style.
const indicatorTransform = (wrapper: ReturnType<typeof mount>): string => {
	// the inner indicator div is the second div (or the child of the track)
	const indicator = wrapper.findAll("div")[1];
	return indicator.attributes("style") ?? "";
};

describe("Progress", () => {
	it("renders with progressbar role and aria range", () => {
		const wrapper = mount(Progress, { props: { value: 50 } });
		const track = wrapper.find('[role="progressbar"]');
		expect(track.exists()).toBe(true);
		expect(track.attributes("aria-valuemin")).toBe("0");
		expect(track.attributes("aria-valuemax")).toBe("100");
		expect(track.attributes("aria-valuenow")).toBe("50");
	});

	it("translates the indicator to reflect the value", () => {
		const wrapper = mount(Progress, { props: { value: 25 } });
		// 25% → translateX(-75%)
		expect(indicatorTransform(wrapper)).toContain("translateX(-75%)");
	});

	it("shows a full bar at 100%", () => {
		const wrapper = mount(Progress, { props: { value: 100 } });
		expect(indicatorTransform(wrapper)).toContain("translateX(-0%)");
	});

	it("shows an empty bar at 0%", () => {
		const wrapper = mount(Progress, { props: { value: 0 } });
		expect(indicatorTransform(wrapper)).toContain("translateX(-100%)");
	});

	// --- custom max ---
	it("computes the percentage against a custom max", () => {
		const wrapper = mount(Progress, { props: { value: 3, max: 5 } });
		// 3/5 = 60% → translateX(-40%)
		expect(indicatorTransform(wrapper)).toContain("translateX(-40%)");
		// and aria reflects the custom max
		const track = wrapper.find('[role="progressbar"]');
		expect(track.attributes("aria-valuemax")).toBe("5");
		expect(track.attributes("aria-valuenow")).toBe("3");
	});

	// --- clamping ---
	it("clamps a value above max to 100%", () => {
		const wrapper = mount(Progress, { props: { value: 150, max: 100 } });
		expect(indicatorTransform(wrapper)).toContain("translateX(-0%)");
	});

	it("clamps a negative value to 0%", () => {
		const wrapper = mount(Progress, { props: { value: -20 } });
		expect(indicatorTransform(wrapper)).toContain("translateX(-100%)");
	});

	// --- indeterminate (no value) ---
	it("renders empty with no aria-valuenow when value is omitted", () => {
		const wrapper = mount(Progress);
		const track = wrapper.find('[role="progressbar"]');
		// no value → aria-valuenow absent
		expect(track.attributes("aria-valuenow")).toBeUndefined();
		// bar shows empty
		expect(indicatorTransform(wrapper)).toContain("translateX(-100%)");
	});

	// --- updates reactively ---
	it("updates the fill when the value changes", async () => {
		const wrapper = mount(Progress, { props: { value: 20 } });
		expect(indicatorTransform(wrapper)).toContain("translateX(-80%)");

		await wrapper.setProps({ value: 70 });
		expect(indicatorTransform(wrapper)).toContain("translateX(-30%)");
	});

	it("merges a custom class onto the track", () => {
		const wrapper = mount(Progress, { props: { value: 50, class: "h-2" } });
		const track = wrapper.find('[role="progressbar"]');
		expect(track.classes()).toContain("h-2");
		// base class still present
		expect(track.classes()).toContain("rounded-full");
	});
});