import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, ref, nextTick } from "vue";
import Tabs from "./Tabs.vue";
import TabsList from "./TabsList.vue";
import TabsTrigger from "./TabsTrigger.vue";
import TabsPanels from "./TabsPanels.vue";
import TabsContent from "./TabsContent.vue";

// Harness: the parts only work together (Headless UI pairs triggers/panels by
// position), so we mount a real composed Tabs.
const makeTabs = (props: Record<string, unknown> = {}) =>
	defineComponent({
		components: { Tabs, TabsList, TabsTrigger, TabsPanels, TabsContent },
		setup() {
			return { props };
		},
		template: `
            <Tabs v-bind="props">
                <TabsList>
                    <TabsTrigger>Account</TabsTrigger>
                    <TabsTrigger>Password</TabsTrigger>
                    <TabsTrigger :disabled="true">Billing</TabsTrigger>
                </TabsList>
                <TabsPanels>
                    <TabsContent>Account panel</TabsContent>
                    <TabsContent>Password panel</TabsContent>
                    <TabsContent>Billing panel</TabsContent>
                </TabsPanels>
            </Tabs>
        `,
	});

describe("Tabs", () => {
	it("renders all triggers", () => {
		const wrapper = mount(makeTabs());
		const tabs = wrapper.findAll('[role="tab"]');
		expect(tabs.length).toBe(3);
		expect(tabs.map((t) => t.text())).toEqual(["Account", "Password", "Billing"]);
	});

	it("renders the triggers as real buttons (as=template forwards to a button)", () => {
		const wrapper = mount(makeTabs());
		// The as="template" + single <button> child pattern should yield buttons.
		const buttons = wrapper.findAll("button");
		expect(buttons.length).toBeGreaterThanOrEqual(3);
	});

	it("selects the first tab by default and shows its panel", () => {
		const wrapper = mount(makeTabs());
		const tabs = wrapper.findAll('[role="tab"]');
		// first tab is selected
		expect(tabs[0].attributes("aria-selected")).toBe("true");
		expect(tabs[1].attributes("aria-selected")).toBe("false");
		// only the first panel's content is visible
		expect(wrapper.text()).toContain("Account panel");
	});

	it("respects defaultIndex", () => {
		const wrapper = mount(makeTabs({ defaultIndex: 1 }));
		const tabs = wrapper.findAll('[role="tab"]');
		expect(tabs[1].attributes("aria-selected")).toBe("true");
		expect(tabs[0].attributes("aria-selected")).toBe("false");
	});

	it("switches the selected tab and panel on click", async () => {
		const wrapper = mount(makeTabs());
		const tabs = wrapper.findAll('[role="tab"]');

		await tabs[1].trigger("click");
		await nextTick();

		expect(tabs[1].attributes("aria-selected")).toBe("true");
		expect(tabs[0].attributes("aria-selected")).toBe("false");
	});

	it("applies the selected styling via the variant", async () => {
		const wrapper = mount(makeTabs());
		const tabs = wrapper.findAll('[role="tab"]');
		// selected tab gets the raised/shadow classes from tabVariants
		expect(tabs[0].attributes("class")).toContain("bg-bg-raised");
		// unselected tab gets the secondary text class
		expect(tabs[1].attributes("class")).toContain("text-text-secondary");
	});

	it("marks a disabled tab and doesn't select it on click", async () => {
		const wrapper = mount(makeTabs());
		const tabs = wrapper.findAll('[role="tab"]');
		const disabled = tabs[2];

		// native disabled attribute on the button
		expect(disabled.attributes("disabled")).toBeDefined();

		await disabled.trigger("click");
		await nextTick();
		expect(disabled.attributes("aria-selected")).toBe("false");
	});

	it("emits change with the new index", async () => {
		const wrapper = mount(makeTabs());
		const tabs = wrapper.findAll('[role="tab"]');

		await tabs[1].trigger("click");
		await nextTick();

		// the harness's Tabs emits "change" — find it on the Tabs component
		const tabsComponent = wrapper.findComponent(Tabs);
		const changeEvents = tabsComponent.emitted("change");
		expect(changeEvents).toBeTruthy();
		expect(changeEvents!.at(-1)).toEqual([1]);
	});

	it("supports controlled selectedIndex", async () => {
		const wrapper = mount(
			defineComponent({
				components: { Tabs, TabsList, TabsTrigger, TabsPanels, TabsContent },
				setup() {
					const active = ref(0);
					return { active };
				},
				template: `
                    <Tabs :selected-index="active" @change="active = $event">
                        <TabsList>
                            <TabsTrigger>One</TabsTrigger>
                            <TabsTrigger>Two</TabsTrigger>
                        </TabsList>
                        <TabsPanels>
                            <TabsContent>Panel one</TabsContent>
                            <TabsContent>Panel two</TabsContent>
                        </TabsPanels>
                    </Tabs>
                `,
			}),
		);
		const tabs = wrapper.findAll('[role="tab"]');
		await tabs[1].trigger("click");
		await nextTick();
		// controlled: clicking emits change, parent updates active, second tab selected
		expect(tabs[1].attributes("aria-selected")).toBe("true");
	});
});