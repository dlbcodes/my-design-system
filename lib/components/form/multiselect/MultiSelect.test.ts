import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, ref, nextTick } from "vue";
import MultiSelect from "./MultiSelect.vue";
import MultiSelectTrigger from "./MultiSelectTrigger.vue";
import MultiSelectContent from "./MultiSelectContent.vue";
import MultiSelectItem from "./MultiSelectItem.vue";
import MultiSelectSearch from "./MultiSelectSearch.vue";
import Field from "../field/Field.vue";
import FieldLabel from "../field/FieldLabel.vue";

const options = [
	{ value: "eng", label: "Engineering" },
	{ value: "design", label: "Design" },
	{ value: "product", label: "Product" },
];

const makeMultiSelect = (props: Record<string, unknown> = {}) =>
	defineComponent({
		components: { MultiSelect, MultiSelectTrigger, MultiSelectContent, MultiSelectItem, MultiSelectSearch },
		setup() {
			const model = ref((props.modelValue as string[]) ?? []);
			return { model, props, options };
		},
		template: `
            <MultiSelect v-model="model" :options="options" v-bind="props">
                <template #default="{ label, empty, toggleAll, allSelected }">
                    <MultiSelectTrigger :label="label" :empty="empty" />
                    <MultiSelectContent>
                        <MultiSelectSearch v-if="props.searchable" />
                        <button type="button" class="select-all" @click="toggleAll">
                            {{ allSelected ? 'Deselect all' : 'Select all' }}
                        </button>
                        <MultiSelectItem
                            v-for="o in options"
                            :key="o.value"
                            :value="o.value"
                            :label="o.label"
                        />
                    </MultiSelectContent>
                </template>
            </MultiSelect>
        `,
	});

// The trigger is the first button; item buttons carry aria-pressed.
const trigger = (wrapper: ReturnType<typeof mount>) => wrapper.find("button");
const openAndGetItems = async (wrapper: ReturnType<typeof mount>) => {
	await trigger(wrapper).trigger("click");
	await nextTick();
	return wrapper.findAll("button[aria-pressed]");
};

describe("MultiSelect", () => {
	it("shows the placeholder when nothing is selected", () => {
		const wrapper = mount(makeMultiSelect({ placeholder: "Select teams" }));
		expect(trigger(wrapper).text()).toContain("Select teams");
	});

	it("renders all items when open", async () => {
		const wrapper = mount(makeMultiSelect());
		const items = await openAndGetItems(wrapper);
		const text = items.map((o) => o.text()).join(" ");
		expect(text).toContain("Engineering");
		expect(text).toContain("Design");
		expect(text).toContain("Product");
	});

	it("toggles a value on item click (adds to the array)", async () => {
		const wrapper = mount(makeMultiSelect());
		const items = await openAndGetItems(wrapper);
		const eng = items.find((o) => o.text().includes("Engineering"));
		await eng!.trigger("click");
		await nextTick();
		expect((wrapper.vm as any).model).toContain("eng");
	});

	it("removes a value when an already-selected item is clicked", async () => {
		const wrapper = mount(makeMultiSelect({ modelValue: ["eng"] }));
		const items = await openAndGetItems(wrapper);
		const eng = items.find((o) => o.text().includes("Engineering"));
		await eng!.trigger("click");
		await nextTick();
		expect((wrapper.vm as any).model).not.toContain("eng");
	});

	it("summarizes the count when multiple are selected", () => {
		const wrapper = mount(makeMultiSelect({ modelValue: ["eng", "design"] }));
		expect(trigger(wrapper).text()).toContain("2 selected");
	});

	it("shows the single option's label when exactly one is selected", () => {
		const wrapper = mount(makeMultiSelect({ modelValue: ["eng"] }));
		expect(trigger(wrapper).text()).toContain("Engineering");
	});

	it("marks selected items with aria-pressed", async () => {
		const wrapper = mount(makeMultiSelect({ modelValue: ["eng"] }));
		const items = await openAndGetItems(wrapper);
		const eng = items.find((o) => o.text().includes("Engineering"));
		expect(eng?.attributes("aria-pressed")).toBe("true");
	});

	it("selects all visible options with toggleAll", async () => {
		const wrapper = mount(makeMultiSelect());
		await trigger(wrapper).trigger("click");
		await nextTick();
		await wrapper.find(".select-all").trigger("click");
		await nextTick();
		expect((wrapper.vm as any).model).toEqual(
			expect.arrayContaining(["eng", "design", "product"]),
		);
	});

	it("renders the search input only when searchable", async () => {
		const plain = mount(makeMultiSelect());
		await trigger(plain).trigger("click");
		await nextTick();
		expect(plain.find('input[type="text"]').exists()).toBe(false);

		const searchable = mount(makeMultiSelect({ searchable: true }));
		await trigger(searchable).trigger("click");
		await nextTick();
		expect(searchable.find('input[type="text"]').exists()).toBe(true);
	});

	it("filters items by the search query", async () => {
		const wrapper = mount(makeMultiSelect({ searchable: true }));
		await trigger(wrapper).trigger("click");
		await nextTick();
		await wrapper.find('input[type="text"]').setValue("des");
		await nextTick();

		const items = wrapper.findAll("button[aria-pressed]");
		const design = items.find((o) => o.text().includes("Design"));
		const eng = items.find((o) => o.text().includes("Engineering"));
		// matching visible, non-matching hidden via v-show (display: none)
		expect(design?.attributes("style") ?? "").not.toContain("display: none");
		expect(eng?.attributes("style") ?? "").toContain("display: none");
	});

	it("throws if a part is used outside MultiSelect", () => {
		expect(() => mount(MultiSelectSearch)).toThrow();
	});
});

describe("MultiSelect + Field integration", () => {
	const makeFieldMultiSelect = (invalid = false) =>
		defineComponent({
			components: { Field, FieldLabel, MultiSelect, MultiSelectTrigger, MultiSelectContent, MultiSelectItem },
			setup() {
				const model = ref<string[]>([]);
				return { model, options, invalid };
			},
			template: `
                <Field :invalid="invalid">
                    <FieldLabel>Teams</FieldLabel>
                    <MultiSelect v-model="model" :options="options">
                        <template #default="{ label, empty }">
                            <MultiSelectTrigger :label="label" :empty="empty" />
                            <MultiSelectContent>
                                <MultiSelectItem
                                    v-for="o in options"
                                    :key="o.value"
                                    :value="o.value"
                                    :label="o.label"
                                />
                            </MultiSelectContent>
                        </template>
                    </MultiSelect>
                </Field>
            `,
		});

	it("adopts the Field's id on the trigger so the label targets it", () => {
		const wrapper = mount(makeFieldMultiSelect());
		const label = wrapper.find("label");
		const button = wrapper.find("button");

		const forId = label.attributes("for");
		expect(forId).toBeTruthy();
		expect(button.attributes("id")).toBe(forId);
	});

	it("wires aria-invalid from the Field when invalid", () => {
		const wrapper = mount(makeFieldMultiSelect(true));
		expect(wrapper.find("button").attributes("aria-invalid")).toBe("true");
	});

	it("works standalone without a Field", () => {
		const wrapper = mount(makeMultiSelect({ placeholder: "Select teams" }));
		const button = wrapper.find("button");
		expect(button.exists()).toBe(true);
		expect(button.text()).toContain("Select teams");
	});
});