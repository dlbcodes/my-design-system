<script setup lang="ts">
import Popover from "../../../lib/components/form/popover/Popover.vue";
import PopoverTrigger from "../../../lib/components/form/popover/PopoverTrigger.vue";
import PopoverContent from "../../../lib/components/form/popover/PopoverContent.vue";
import Button from "../../../lib/components/primitives/Button.vue";
</script>

<template>
    <Popover>
        <PopoverTrigger>
            <Button variant="outline">Settings</Button>
        </PopoverTrigger>
        <PopoverContent size="sm">
            <template #default="{ close }">
                <div class="flex flex-col gap-2">
                    <p class="text-sm text-text-secondary">
                        Apply your changes?
                    </p>
                    <div class="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" @click="close"
                            >Cancel</Button
                        >
                        <Button size="sm" @click="close">Save</Button>
                    </div>
                </div>
            </template>
        </PopoverContent>
    </Popover>
</template>
