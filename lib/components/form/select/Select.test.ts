import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, ref, nextTick } from "vue";
import Select from "./Select.vue";
import SelectTrigger from "./SelectTrigger.vue";
import SelectContent from "./SelectContent.vue";
import SelectItem from "./SelectItem.vue";
import SelectSearch from "./SelectSearch.vue";

// Harness: a real composed Select, since the parts only work together via the
// provided context. Label is now slot content (<SelectItem value="x">X</SelectItem>).
const makeSelect = (props: Record<string, unknown> = {}) =>
	defineComponent({
		components: { Select, SelectTrigger, SelectContent, SelectItem, SelectSearch },
		setup() {
			const model = ref((props.modelValue as string) ?? "");
			return { model, props };
		},
		template: `
            <Select v-model="model" v-bind="props">
                <SelectTrigger placeholder="Pick one" />
                <SelectContent>
                    <SelectSearch v-if="props.searchable" />
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                </SelectContent>
            </Select>
        `,
	});

// Helper: open the listbox and return the option elements.
const open = async (wrapper: ReturnType<typeof mount>) => {
	await wrapper.find("button").trigger("click");
	await nextTick();
	return wrapper.findAll('[role="option"]');
};

describe("Select", () => {
	it("shows the placeholder when nothing is selected", () => {
		const wrapper = mount(makeSelect());
		expect(wrapper.find("button").text()).toContain("Pick one");
	});

	it("renders all items when open", async () => {
		const wrapper = mount(makeSelect());
		const options = await open(wrapper);
		const text = options.map((o) => o.text()).join(" ");
		expect(text).toContain("Vue");
		expect(text).toContain("React");
		expect(text).toContain("Svelte");
	});

	it("emits update:modelValue with the value when an item is clicked", async () => {
		const wrapper = mount(makeSelect());
		const options = await open(wrapper);
		const vue = options.find((o) => o.text().includes("Vue"));
		await vue!.trigger("click");
		await nextTick();
		expect((wrapper.vm as any).model).toBe("vue");
	});

	// --- label capture on selection (the slot-content design) ---
	it("captures the clicked item's label and shows it in the trigger", async () => {
		const wrapper = mount(makeSelect());
		const options = await open(wrapper);
		const vue = options.find((o) => o.text().includes("Vue"));
		await vue!.trigger("click");
		await nextTick();
		// trigger should now show the captured label "Vue", not the value "vue"
		expect(wrapper.find("button").text()).toContain("Vue");
		expect(wrapper.find("button").text()).not.toContain("Pick one");
	});

	it("falls back to the raw value for a pre-filled selection (no label captured yet)", async () => {
		// modelValue is set, but no item was clicked, so no label is captured.
		const wrapper = mount(makeSelect({ modelValue: "vue" }));
		await nextTick();
		// Documented limitation: shows the raw value until the user picks.
		expect(wrapper.find("button").text()).toContain("vue");
	});

	// --- search (matches against the item's slot text) ---
	it("renders the search input only when searchable", async () => {
		const plain = mount(makeSelect());
		await open(plain);
		expect(plain.find('input[type="text"]').exists()).toBe(false);

		const searchable = mount(makeSelect({ searchable: true }));
		await open(searchable);
		expect(searchable.find('input[type="text"]').exists()).toBe(true);
	});

	it("filters items by the search query", async () => {
		const wrapper = mount(makeSelect({ searchable: true }));
		await open(wrapper);
		await wrapper.find('input[type="text"]').setValue("re");
		await nextTick();

		const options = wrapper.findAll('[role="option"]');
		const react = options.find((o) => o.text().includes("React"));
		const vue = options.find((o) => o.text().includes("Vue"));
		// matching item visible, non-matching hidden via v-show (display: none)
		expect(react?.attributes("style") ?? "").not.toContain("display: none");
		expect(vue?.attributes("style") ?? "").toContain("display: none");
	});

	// --- disabled item ---
	it("marks a disabled item as disabled and doesn't select it on click", async () => {
		const wrapper = mount(
			defineComponent({
				components: { Select, SelectTrigger, SelectContent, SelectItem },
				setup() {
					const model = ref("");
					return { model };
				},
				template: `
                    <Select v-model="model">
                        <SelectTrigger placeholder="Plan" />
                        <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="ent" disabled>Enterprise</SelectItem>
                        </SelectContent>
                    </Select>
                `,
			}),
		);
		const options = await open(wrapper);
		const ent = options.find((o) => o.text().includes("Enterprise"));
		expect(ent?.attributes("aria-disabled")).toBe("true");

		await ent!.trigger("click");
		await nextTick();
		// disabled item shouldn't change the model
		expect((wrapper.vm as any).model).toBe("");
	});

	// --- selected item shows the check ---
	it("marks the selected item as selected", async () => {
		const wrapper = mount(makeSelect());
		let options = await open(wrapper);
		const vue = options.find((o) => o.text().includes("Vue"));
		await vue!.trigger("click");
		await nextTick();

		// reopen and check the Vue option is now selected (aria-selected)
		options = await open(wrapper);
		const vueAgain = options.find((o) => o.text().includes("Vue"));
		expect(vueAgain?.attributes("aria-selected")).toBe("true");
	});

	// --- context guard ---
	it("throws if a part is used outside Select", () => {
		expect(() => mount(SelectTrigger)).toThrow();
	});
});