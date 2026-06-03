import { createRouter, createWebHistory } from "vue-router";
import { components } from "./registry";
import DocsLayout from "./components/DocsLayout.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("./pages/HomePage.vue"), // no sidebar
	},
	{
		path: "/components",
		name: "components",
		component: () => import("./pages/ComponentsIndex.vue"), // no sidebar — the index/grid
	},
	{
		// ONLY individual component pages get the sidebar.
		path: "/components",
		component: DocsLayout,
		children: [
			...components.map((c) => ({
				path: c.slug, // → /components/avatar, /components/button, ...
				name: c.slug,
				component: c.page,
			})),
		],
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});