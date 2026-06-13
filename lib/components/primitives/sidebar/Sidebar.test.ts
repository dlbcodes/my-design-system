import { describe, it, expect, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { defineComponent, h, ref, type Ref, markRaw } from "vue";
import Sidebar from "./Sidebar.vue";
import SidebarGroup from "./SidebarGroup.vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarTrigger from "./SidebarTrigger.vue";
import { SidebarContextKey, type SidebarContext } from "./context";

// Controllable mock context — lets us flip isMobile/mobileOpen/collapsed
// without depending on window size or useMediaQuery.
const makeCtx = (overrides: Partial<SidebarContext> = {}): SidebarContext => ({
	isMobile: ref(false) as Ref<boolean>,
	mobileOpen: ref(false) as Ref<boolean>,
	collapsed: ref(false) as Ref<boolean>,
	open: vi.fn(),
	close: vi.fn(),
	toggle: vi.fn(),
	...overrides,
});

// Mount with the mock sidebar context provided.
const withCtx = (
	component: unknown,
	ctx: SidebarContext,
	options: Record<string, unknown> = {},
): VueWrapper =>
	mount(component as never, {
		global: { provide: { [SidebarContextKey as symbol]: ctx } },
		...options,
	}) as VueWrapper;

describe("SidebarGroup", () => {
	it("renders a label when provided", () => {
		const wrapper = mount(SidebarGroup, {
			props: { label: "Workspace" },
			slots: { default: "items" },
		});
		expect(wrapper.text()).toContain("Workspace");
		expect(wrapper.text()).toContain("items");
	});

	it("renders no heading when label is omitted", () => {
		const wrapper = mount(SidebarGroup, { slots: { default: "items" } });
		expect(wrapper.find("p").exists()).toBe(false);
		expect(wrapper.text()).toContain("items");
	});
});

describe("SidebarItem", () => {
	it("renders as an <a> by default", () => {
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, { slots: { default: "Home" } });
		expect(wrapper.element.tagName).toBe("A");
		expect(wrapper.text()).toContain("Home");
	});

	it("renders as a button when as='button'", () => {
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { as: "button" },
			slots: { default: "Click" },
		});
		expect(wrapper.element.tagName).toBe("BUTTON");
	});

	it("renders as an arbitrary component passed to `as` and forwards attrs", () => {
		const FakeLink = markRaw(defineComponent({
			name: "FakeLink",
			props: { to: { type: String, default: "" } },
			setup(props, { slots }) {
				return () => h("a", { "data-to": props.to, "data-fake-link": "" }, slots.default?.());
			},
		}));
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { as: FakeLink, to: "/dashboard" },
			slots: { default: "Dashboard" },
		});
		expect(wrapper.find("[data-fake-link]").exists()).toBe(true);
		expect(wrapper.find("[data-to='/dashboard']").exists()).toBe(true);
		expect(wrapper.text()).toContain("Dashboard");
	});

	it("applies inactive styling by default", () => {
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, { slots: { default: "x" } });
		const cls = wrapper.classes();
		expect(cls).toContain("text-text-secondary");
		expect(cls).not.toContain("bg-bg-subtle");
	});

	it("applies active styling when active", () => {
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { active: true },
			slots: { default: "x" },
		});
		const cls = wrapper.classes();
		expect(cls).toContain("bg-bg-subtle");
		expect(cls).toContain("text-text-primary");
	});

	it("closes the drawer on click when mobile", async () => {
		const ctx = makeCtx({ isMobile: ref(true) as Ref<boolean> });
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { as: "button" },
			slots: { default: "Go" },
		});
		await wrapper.trigger("click");
		expect(ctx.close).toHaveBeenCalledOnce();
	});

	it("does NOT close on click when desktop", async () => {
		const ctx = makeCtx({ isMobile: ref(false) as Ref<boolean> });
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { as: "button" },
			slots: { default: "Go" },
		});
		await wrapper.trigger("click");
		expect(ctx.close).not.toHaveBeenCalled();
	});

	it("merges a custom class", () => {
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { class: "font-bold" },
			slots: { default: "x" },
		});
		expect(wrapper.classes()).toContain("font-bold");
	});
});

describe("SidebarTrigger", () => {
	it("renders and toggles on mobile", async () => {
		const ctx = makeCtx({ isMobile: ref(true) as Ref<boolean> });
		const wrapper = withCtx(SidebarTrigger, ctx);
		const btn = wrapper.find("button");
		expect(btn.exists()).toBe(true);
		await btn.trigger("click");
		expect(ctx.toggle).toHaveBeenCalledOnce();
	});

	it("renders and toggles on desktop too", async () => {
		// The trigger is now always rendered; on desktop it collapses the sidebar.
		const ctx = makeCtx({ isMobile: ref(false) as Ref<boolean> });
		const wrapper = withCtx(SidebarTrigger, ctx);
		const btn = wrapper.find("button");
		expect(btn.exists()).toBe(true);
		await btn.trigger("click");
		expect(ctx.toggle).toHaveBeenCalledOnce();
	});
});

describe("Sidebar", () => {
	it("renders an inline aside on desktop when not collapsed", () => {
		const ctx = makeCtx({ isMobile: ref(false) as Ref<boolean> });
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		expect(wrapper.find("aside").exists()).toBe(true);
		expect(wrapper.text()).toContain("nav");
	});

	it("hides the sidebar on desktop when collapsed", () => {
		const ctx = makeCtx({
			isMobile: ref(false) as Ref<boolean>,
			collapsed: ref(true) as Ref<boolean>,
		});
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		expect(wrapper.find("aside").exists()).toBe(false);
	});

	it("does not show the drawer on mobile when closed", () => {
		const ctx = makeCtx({
			isMobile: ref(true) as Ref<boolean>,
			mobileOpen: ref(false) as Ref<boolean>,
		});
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		expect(wrapper.find("aside").exists()).toBe(false);
	});

	it("shows the drawer on mobile when open", () => {
		const ctx = makeCtx({
			isMobile: ref(true) as Ref<boolean>,
			mobileOpen: ref(true) as Ref<boolean>,
		});
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		expect(wrapper.find("aside").exists()).toBe(true);
		expect(wrapper.text()).toContain("nav");
	});

	it("is not affected by collapsed state on mobile", () => {
		// collapsed is a desktop concept; on mobile the drawer still works.
		const ctx = makeCtx({
			isMobile: ref(true) as Ref<boolean>,
			mobileOpen: ref(true) as Ref<boolean>,
			collapsed: ref(true) as Ref<boolean>,
		});
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		// drawer still shows because collapsed only governs desktop
		expect(wrapper.find("aside").exists()).toBe(true);
	});

	it("closes the drawer when the backdrop is clicked", async () => {
		const ctx = makeCtx({
			isMobile: ref(true) as Ref<boolean>,
			mobileOpen: ref(true) as Ref<boolean>,
		});
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		const backdrop = wrapper.find(".fixed.inset-0");
		expect(backdrop.exists()).toBe(true);
		await backdrop.trigger("click");
		expect(ctx.close).toHaveBeenCalled();
	});
});