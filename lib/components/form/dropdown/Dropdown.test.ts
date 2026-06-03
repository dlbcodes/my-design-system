import { describe, it, expect, vi } from "vitest";
import { defineComponent } from "vue";
import { mount } from "@vue/test-utils";
import {
	Dropdown,
	DropdownTrigger,
	DropdownContent,
	DropdownItem,
} from "./index";

describe("Dropdown", () => {
	it("renders the trigger and exposes `open` (closed initially)", () => {
		const wrapper = mount({
			components: { Dropdown, DropdownTrigger },
			template: `
                <Dropdown>
                    <DropdownTrigger v-slot="{ open }">
                        <span>{{ open ? 'OPEN' : 'CLOSED' }}</span>
                    </DropdownTrigger>
                </Dropdown>
            `,
		});
		expect(wrapper.text()).toContain("CLOSED");
	});

	it("renders items as menuitem buttons when opened", async () => {
		const wrapper = mount({
			components: { Dropdown, DropdownTrigger, DropdownContent, DropdownItem },
			template: `
                <Dropdown>
                    <DropdownTrigger><span>Menu</span></DropdownTrigger>
                    <DropdownContent>
                        <DropdownItem>Profile</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                    </DropdownContent>
                </Dropdown>
            `,
		});
		await wrapper.find("button").trigger("click");

		const items = wrapper.findAll("[role='menuitem']");
		expect(items).toHaveLength(2);
		expect(items[0].text()).toBe("Profile");
		expect(items[1].text()).toBe("Settings");
	});

	it("emits select when an item is clicked", async () => {
		const onSelect = vi.fn();
		const Harness = defineComponent({
			components: { Dropdown, DropdownTrigger, DropdownContent, DropdownItem },
			setup() {
				return { onSelect };
			},
			template: `
                <Dropdown>
                    <DropdownTrigger><span>Menu</span></DropdownTrigger>
                    <DropdownContent>
                        <DropdownItem @select="onSelect">Profile</DropdownItem>
                    </DropdownContent>
                </Dropdown>
            `,
		});
		const wrapper = mount(Harness);
		await wrapper.find("button").trigger("click");

		const item = wrapper.find("[role='menuitem']");
		await item.trigger("click");
		expect(onSelect).toHaveBeenCalledTimes(1);
	});

	it("does not emit select when a disabled item is clicked", async () => {
		const onSelect = vi.fn();
		const Harness = defineComponent({
			components: { Dropdown, DropdownTrigger, DropdownContent, DropdownItem },
			setup() {
				return { onSelect };
			},
			template: `
                <Dropdown>
                    <DropdownTrigger><span>Menu</span></DropdownTrigger>
                    <DropdownContent>
                        <DropdownItem disabled @select="onSelect">Archive</DropdownItem>
                    </DropdownContent>
                </Dropdown>
            `,
		});
		const wrapper = mount(Harness);
		await wrapper.find("button").trigger("click");

		const item = wrapper.find("[role='menuitem']");
		expect((item.element as HTMLButtonElement).disabled).toBe(true);
		await item.trigger("click");
		expect(onSelect).not.toHaveBeenCalled();
	});

	it("exposes the `active` slot prop on items", async () => {
		const wrapper = mount({
			components: { Dropdown, DropdownTrigger, DropdownContent, DropdownItem },
			template: `
                <Dropdown>
                    <DropdownTrigger><span>Menu</span></DropdownTrigger>
                    <DropdownContent>
                        <DropdownItem v-slot="{ active }">
                            <span>{{ active ? 'ACTIVE' : 'IDLE' }}</span>
                        </DropdownItem>
                    </DropdownContent>
                </Dropdown>
            `,
		});
		await wrapper.find("button").trigger("click");
		// The slot receives `active` — initially false, so renders IDLE.
		expect(wrapper.find("[role='menuitem']").text()).toContain("IDLE");
	});
});