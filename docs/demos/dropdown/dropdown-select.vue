<script setup lang="ts">
import { ref } from "vue";
import Dropdown from "../../../lib/components/form/dropdown/Dropdown.vue";
import DropdownTrigger from "../../../lib/components/form/dropdown/DropdownTrigger.vue";
import DropdownContent from "../../../lib/components/form/dropdown/DropdownContent.vue";
import DropdownItem from "../../../lib/components/form/dropdown/DropdownItem.vue";
import Button from "../../../lib/components/primitives/Button.vue";

const chosen = ref("none");
</script>

<template>
    <div class="flex flex-col items-start gap-2">
        <Dropdown>
            <DropdownTrigger>
                <Button variant="outline">Sort by…</Button>
            </DropdownTrigger>
            <DropdownContent size="sm">
                <DropdownItem @select="chosen = 'Newest'">Newest</DropdownItem>
                <DropdownItem @select="chosen = 'Oldest'">Oldest</DropdownItem>
                <DropdownItem @select="chosen = 'Popular'">
                    Popular
                </DropdownItem>
            </DropdownContent>
        </Dropdown>
        <p class="text-sm text-text-secondary">Selected: {{ chosen }}</p>
    </div>
</template>
