<script setup lang="ts">
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import Button from "../../../lib/components/primitives/Button.vue";
import { PhInfo, PhDotsThree, PhCaretDown } from "@phosphor-icons/vue";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "../../../lib/components/form/popover/index.ts";

const sizes = ["sm", "sm", "md", "lg", "2xs"] as const;
</script>

<template>
    <DocPage
        name="Popover"
        description="A floating panel anchored to a trigger, built on Headless UI's Popover + Float (composable mode). Unlike a Dropdown, a Popover holds arbitrary content, not a menu. size sets the panel width; placement and offset position it. The Content slot exposes close so content can dismiss the popover itself."
    >
        <DocExample
            title="Size"
            description="size drives the panel width (xs–lg, plus fit/full). Each opens a panel at its named width — the panel is NOT tied to the trigger's width."
        >
            <div class="flex flex-wrap gap-3">
                <Popover v-for="s in sizes" :key="s">
                    <PopoverTrigger>
                        <Button variant="outline">size="{{ s }}"</Button>
                    </PopoverTrigger>
                    <PopoverContent :size="s">
                        <p class="text-sm text-text-primary">
                            This panel is width
                            <span class="font-medium">{{ s }}</span
                            >, independent of the trigger button's width.
                        </p>
                    </PopoverContent>
                </Popover>
            </div>
        </DocExample>

        <DocExample
            title="Basic"
            description="Trigger exposes open via slot; Content exposes close. Here a button inside the panel dismisses it via the slot's close."
        >
            <Popover>
                <PopoverTrigger v-slot="{ open }">
                    <Button variant="outline">
                        <PhInfo class="size-4" />
                        Details
                        <PhCaretDown :class="open ? 'rotate-180' : ''" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent v-slot="{ close }" size="full">
                    <div class="space-y-2">
                        <p class="text-sm font-medium text-text-primary">
                            Quick info
                        </p>
                        <p class="text-sm text-text-secondary">
                            Popovers can hold any content — text, forms,
                            actions.
                        </p>
                        <Button size="sm" variant="ghost" @click="close">
                            Dismiss
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </DocExample>

        <DocExample
            title="Placement"
            description="placement is forwarded to Float; flip keeps the panel in view if there's no room. offset sets the gap from the trigger."
        >
            <div class="flex flex-wrap gap-3">
                <Popover placement="bottom-start">
                    <PopoverTrigger>
                        <Button variant="outline">bottom-start</Button>
                    </PopoverTrigger>
                    <PopoverContent size="xs">
                        <p class="text-sm text-text-primary">
                            Opens below, aligned left.
                        </p>
                    </PopoverContent>
                </Popover>

                <Popover placement="top">
                    <PopoverTrigger>
                        <Button variant="outline">top</Button>
                    </PopoverTrigger>
                    <PopoverContent size="xs">
                        <p class="text-sm text-text-primary">
                            Opens above, centered.
                        </p>
                    </PopoverContent>
                </Popover>

                <Popover placement="right" :offset="16">
                    <PopoverTrigger>
                        <Button variant="outline">right, offset 16</Button>
                    </PopoverTrigger>
                    <PopoverContent size="xs">
                        <p class="text-sm text-text-primary">
                            Opens to the right, wider gap.
                        </p>
                    </PopoverContent>
                </Popover>
            </div>
        </DocExample>

        <DocExample
            title="Icon trigger"
            description="The trigger is any element — here an icon button. Content composes freely."
        >
            <Popover placement="bottom-end">
                <PopoverTrigger>
                    <Button
                        variant="icon"
                        size="icon"
                        aria-label="More options"
                    >
                        <PhDotsThree class="size-5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent v-slot="{ close }" size="fit">
                    <div class="flex flex-col gap-1">
                        <button
                            type="button"
                            class="rounded-lg px-2 py-1.5 text-left text-sm text-text-primary hover:bg-bg-subtle"
                            @click="close"
                        >
                            Rename
                        </button>
                        <button
                            type="button"
                            class="rounded-lg px-2 py-1.5 text-left text-sm text-text-primary hover:bg-bg-subtle"
                            @click="close"
                        >
                            Duplicate
                        </button>
                    </div>
                </PopoverContent>
            </Popover>
        </DocExample>
    </DocPage>
</template>
