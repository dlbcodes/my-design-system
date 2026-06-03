// Single source of truth for the docs: add a component here and it shows up
// in the /components index AND gets its own route.
export interface ComponentEntry {
	/** URL slug: /components/<slug> */
	slug: string;
	/** Display name */
	name: string;
	/** One-line description for the index list */
	description: string;
	/** Lazy-loaded page component */
	page: () => Promise<typeof import("*.vue")>;
}

export const components: ComponentEntry[] = [
	{
		slug: "spinner",
		name: "Spinner",
		description: "An accessible loading indicator.",
		page: () => import("./pages/docs/SpinnerPage.vue"),
	},
	{
		slug: "kbd",
		name: "Kbd",
		description: "Keyboard key hint.",
		page: () => import("./pages/docs/KbdPage.vue"),
	},
	{
		slug: "switch",
		name: "Switch",
		description: "An on/off toggle.",
		page: () => import("./pages/docs/SwitchPage.vue"),
	},
	{
		slug: "checkbox",
		name: "Checkbox",
		description: "A checkbox with an optional indicator-only mode.",
		page: () => import("./pages/docs/CheckboxPage.vue"),
	},
	{
		slug: "avatar",
		name: "Avatar",
		description: "A user avatar with image and initial fallbacks.",
		page: () => import("./pages/docs/AvatarPage.vue"),
	},
	{
		slug: "badge",
		name: "Badge",
		description: "A small status / label chip.",
		page: () => import("./pages/docs/BadgePage.vue"),
	},
	{
		slug: "button",
		name: "Button",
		description: "A flat, tokenized button with loading and link support.",
		page: () => import("./pages/docs/ButtonPage.vue"),
	},
	{
		slug: "panel",
		name: "Panel",
		description: "A rounded surface container with optional header and footer.",
		page: () => import("./pages/docs/PanelPage.vue"),
	},
	{
		slug: "modal",
		name: "Modal",
		description: "A focus-trapped dialog with composable header, body, and footer.",
		page: () => import("./pages/docs/ModalPage.vue"),
	},
	{
		slug: "field",
		name: "Field",
		description: "A form-field wrapper that wires label, description, and error.",
		page: () => import("./pages/docs/FieldPage.vue"),
	},
	{
		slug: "dropdown",
		name: "Dropdown",
		description: "A menu compound with composable, slot-only items.",
		page: () => import("./pages/docs/DropdownPage.vue"),
	},
	{
		slug: "popover",
		name: "Popover",
		description: "A floating panel for arbitrary content, anchored to a trigger.",
		page: () => import("./pages/docs/PopoverPage.vue"),
	},
	{
		slug: "multiselect",
		name: "MultiSelect",
		description: "A searchable multi-select with checkbox rows and select-all.",
		page: () => import("./pages/docs/MultiSelectPage.vue"),
	},
];