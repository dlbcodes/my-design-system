<script setup lang="ts">
import { ref } from "vue";
import Select from "../../../lib/components/form/select/Select.vue";
import SelectTrigger from "../../../lib/components/form/select/SelectTrigger.vue";
import SelectContent from "../../../lib/components/form/select/SelectContent.vue";
import SelectItem from "../../../lib/components/form/select/SelectItem.vue";
import { PhCircle } from "@phosphor-icons/vue";

const value = ref("");
</script>

<template>
    <div class="w-full max-w-xs">
        <Select v-model="value">
            <SelectTrigger placeholder="Set status" />
            <SelectContent>
                <SelectItem value="active">
                    <span class="flex items-center gap-2">
                        <PhCircle
                            class="size-3 text-success-text"
                            weight="fill"
                        />
                        Active
                    </span>
                </SelectItem>
                <SelectItem value="away">
                    <span class="flex items-center gap-2">
                        <PhCircle
                            class="size-3 text-warning-text"
                            weight="fill"
                        />
                        Away
                    </span>
                </SelectItem>
                <SelectItem value="offline">
                    <span class="flex items-center gap-2">
                        <PhCircle
                            class="size-3 text-text-tertiary"
                            weight="fill"
                        />
                        Offline
                    </span>
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
