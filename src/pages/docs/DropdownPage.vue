<script setup lang="ts">
import { ref } from "vue";
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import Button from "../../../lib/components/primitives/Button.vue";
import { PhUser, PhGear, PhSignOut, PhCaretDown } from "@phosphor-icons/vue";
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
} from "../../../lib/components/form/dropdown/index.ts";

const lastAction = ref<string>("—");
const select = (action: string): void => {
    lastAction.value = action;
};

const sizes = ["full", "fit", "3xs", "2xs", "xs", "sm", "md", "lg"] as const;
</script>

<template>
    <DocPage
        name="Dropdown"
        description="A menu compound built on Headless UI's Menu + Float. Dropdown owns positioning, DropdownTrigger is any element, DropdownContent is the floating panel, DropdownItem is a slot-only row that closes the menu and emits select. Icons and labels are just children — compose whatever you want inside an item."
    >
        <DocExample
            title="Basic"
            description="Trigger exposes open via slot. Each item is pure composition: icon + text as children. Selecting an item closes the menu and fires @select."
        >
            <Dropdown>
                <DropdownTrigger v-slot="{ open }">
                    <Button variant="outline">
                        Account
                        <PhCaretDown
                            class="size-4 transition-transform"
                            :class="open && 'rotate-180'"
                        />
                    </Button>
                </DropdownTrigger>
                <DropdownContent size="full">
                    <DropdownItem @select="select('Profile')">
                        <PhUser class="size-4 shrink-0" /> Profile
                    </DropdownItem>
                    <DropdownItem @select="select('Settings')">
                        <PhGear class="size-4 shrink-0" /> Settings
                    </DropdownItem>
                    <DropdownItem @select="select('Sign out')">
                        <PhSignOut class="size-4 shrink-0" /> Sign out
                    </DropdownItem>
                </DropdownContent>
            </Dropdown>

            <p class="mt-3 text-sm text-text-secondary">
                Last action:
                <span class="font-medium text-text-primary">{{
                    lastAction
                }}</span>
            </p>
        </DocExample>

        <DocExample
            title="Sizes"
            description="size sets the panel width from the popover scale. fit hugs the items (the natural menu default); 3xs–lg are fixed widths. (full isn't meaningful for a floating panel — it has no sized parent — so it's omitted here.)"
        >
            <div class="flex flex-wrap gap-3">
                <Dropdown v-for="s in sizes" :key="s">
                    <DropdownTrigger>
                        <Button variant="outline">size="{{ s }}"</Button>
                    </DropdownTrigger>
                    <DropdownContent :size="s">
                        <DropdownItem @select="select(`${s} A`)"
                            >Item A</DropdownItem
                        >
                        <DropdownItem @select="select(`${s} B`)"
                            >Item B</DropdownItem
                        >
                        <DropdownItem @select="select(`${s} C`)"
                            >A longer item label</DropdownItem
                        >
                    </DropdownContent>
                </Dropdown>
            </div>
        </DocExample>

        <DocExample
            title="Disabled item"
            description="A disabled item can't be focused or selected and is skipped in keyboard navigation (Headless UI handles this)."
        >
            <Dropdown>
                <DropdownTrigger v-slot="{ open }">
                    <Button variant="outline">
                        Actions
                        <PhCaretDown
                            class="size-4"
                            :class="open && 'rotate-180'"
                        />
                    </Button>
                </DropdownTrigger>
                <DropdownContent size="fit">
                    <DropdownItem @select="select('Edit')">Edit</DropdownItem>
                    <DropdownItem disabled @select="select('Archive')"
                        >Archive (disabled)</DropdownItem
                    >
                    <DropdownItem @select="select('Delete')"
                        >Delete</DropdownItem
                    >
                </DropdownContent>
            </Dropdown>
        </DocExample>

        <DocExample
            title="Custom row (active state)"
            description="The default slot exposes active, so a fully custom row can react to keyboard/hover focus itself instead of relying on the built-in styling."
        >
            <Dropdown>
                <DropdownTrigger v-slot="{ open }">
                    <Button variant="outline">
                        Custom
                        <PhCaretDown
                            class="size-4"
                            :class="open && 'rotate-180'"
                        />
                    </Button>
                </DropdownTrigger>
                <DropdownContent size="fit">
                    <DropdownItem
                        v-slot="{ active }"
                        @select="select('Custom row')"
                    >
                        <span
                            class="flex w-full items-center justify-between gap-4"
                        >
                            <span :class="active && 'font-medium'"
                                >Highlight me</span
                            >
                            <span class="text-xs text-text-tertiary">{{
                                active ? "focused" : ""
                            }}</span>
                        </span>
                    </DropdownItem>
                </DropdownContent>
            </Dropdown>
        </DocExample>

        <DocExample
            title="Placement"
            description="placement and offset are forwarded to Float. flip and shift are on by default, so the panel stays in the viewport."
        >
            <div class="flex gap-3">
                <Dropdown placement="bottom-start">
                    <DropdownTrigger
                        ><Button variant="outline"
                            >bottom-start</Button
                        ></DropdownTrigger
                    >
                    <DropdownContent size="fit">
                        <DropdownItem @select="select('A')"
                            >Item A</DropdownItem
                        >
                        <DropdownItem @select="select('B')"
                            >Item B</DropdownItem
                        >
                    </DropdownContent>
                </Dropdown>

                <Dropdown placement="bottom-end">
                    <DropdownTrigger
                        ><Button variant="outline"
                            >bottom-end</Button
                        ></DropdownTrigger
                    >
                    <DropdownContent size="fit">
                        <DropdownItem @select="select('A')"
                            >Item A</DropdownItem
                        >
                        <DropdownItem @select="select('B')"
                            >Item B</DropdownItem
                        >
                    </DropdownContent>
                </Dropdown>

                <Dropdown placement="top">
                    <DropdownTrigger
                        ><Button variant="outline">top</Button></DropdownTrigger
                    >
                    <DropdownContent size="fit">
                        <DropdownItem @select="select('A')"
                            >Item A</DropdownItem
                        >
                        <DropdownItem @select="select('B')"
                            >Item B</DropdownItem
                        >
                    </DropdownContent>
                </Dropdown>
            </div>
        </DocExample>
    </DocPage>
</template>
