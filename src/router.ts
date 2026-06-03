import { createRouter, createWebHistory } from "vue-router";
import { components } from "./registry";

const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("./pages/HomePage.vue"),
	},
	{
		path: "/components",
		name: "components",
		component: () => import("./pages/ComponentsIndex.vue"),
	},
	// One route per registered component.
	...components.map((c) => ({
		path: `/components/${c.slug}`,
		name: c.slug,
		component: c.page,
	})),
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});