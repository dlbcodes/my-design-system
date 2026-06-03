import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import Modal from "./Modal.vue";
import ModalTitle from "./ModalTitle.vue";
import ModalDescription from "./ModalDescription.vue";
import ModalClose from "./ModalClose.vue";

// Teleported content lands in document.body; clean it between tests.
afterEach(() => {
	document.body.innerHTML = "";
});

const dialog = () => document.body.querySelector("[role='dialog']");

describe("Modal", () => {
	it("renders nothing when closed", () => {
		mount(Modal, {
			props: { modelValue: false },
			slots: { default: "Body" },
			attachTo: document.body,
		});
		expect(dialog()).toBe(null);
	});

	it("renders the dialog with slot content when open", () => {
		mount(Modal, {
			props: { modelValue: true },
			slots: { default: "<p>Body content</p>" },
			attachTo: document.body,
		});
		const d = dialog();
		expect(d).not.toBe(null);
		expect(d!.getAttribute("aria-modal")).toBe("true");
		expect(d!.textContent).toContain("Body content");
	});

	it("ModalTitle wires aria-labelledby to the title id", async () => {
		mount(Modal, {
			props: { modelValue: true },
			slots: { default: () => h(ModalTitle, {}, () => "Edit profile") },
			attachTo: document.body,
		});
		await nextTick();
		const d = dialog()!;
		const title = document.body.querySelector("h2")!;
		expect(title.textContent).toBe("Edit profile");
		expect(d.getAttribute("aria-labelledby")).toBe(title.id);
	});

	it("ModalDescription wires aria-describedby to the description id", async () => {
		mount(Modal, {
			props: { modelValue: true },
			slots: { default: () => h(ModalDescription, {}, () => "Helper") },
			attachTo: document.body,
		});
		await nextTick();
		const d = dialog()!;
		const desc = document.body.querySelector("p")!;
		expect(d.getAttribute("aria-describedby")).toBe(desc.id);
	});

	it("ModalClose emits update:modelValue=false and close", async () => {
		const Harness = defineComponent({
			components: { Modal, ModalClose },
			emits: ["update:modelValue", "close"],
			template: `
                <Modal :model-value="true" @update:model-value="$emit('update:modelValue', $event)" @close="$emit('close')">
                    <ModalClose />
                </Modal>
            `,
		});
		const wrapper = mount(Harness, { attachTo: document.body });
		const closeBtn = document.body.querySelector("button[aria-label='Close']") as HTMLButtonElement;
		expect(closeBtn).not.toBe(null);
		closeBtn.click();
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("update:modelValue")![0]).toEqual([false]);
		expect(wrapper.emitted("close")).toBeTruthy();
	});

	it("backdrop click closes when not persistent", async () => {
		const wrapper = mount(Modal, {
			props: { modelValue: true },
			slots: { default: "Body" },
			attachTo: document.body,
		});
		const backdrop = document.body.querySelector(".fixed.inset-0") as HTMLElement;
		backdrop.click();
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
	});

	it("backdrop click does NOT close when persistent", async () => {
		const wrapper = mount(Modal, {
			props: { modelValue: true, persistent: true },
			slots: { default: "Body" },
			attachTo: document.body,
		});
		const backdrop = dialog()!.parentElement as HTMLElement;
		backdrop.click();
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("update:modelValue")).toBeFalsy();
	});
});