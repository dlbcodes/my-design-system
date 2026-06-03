<script setup lang="ts">
import Dropdown from "../../../lib/components/form/dropdown/Dropdown.vue";
import DropdownTrigger from "../../../lib/components/form/dropdown/DropdownTrigger.vue";
import DropdownContent from "../../../lib/components/form/dropdown/DropdownContent.vue";
import DropdownItem from "../../../lib/components/form/dropdown/DropdownItem.vue";
import Button from "../../../lib/components/primitives/Button.vue";
import { PhUser, PhGear, PhSignOut } from "@phosphor-icons/vue";
</script>

<template>
    <Dropdown>
        <DropdownTrigger>
            <Button variant="outline">Account</Button>
        </DropdownTrigger>
        <DropdownContent size="sm">
            <DropdownItem><PhUser class="size-4" /> Profile</DropdownItem>
            <DropdownItem><PhGear class="size-4" /> Settings</DropdownItem>
            <DropdownItem><PhSignOut class="size-4" /> Sign out</DropdownItem>
        </DropdownContent>
    </Dropdown>
</template>
