<script setup lang="ts">
import { ref } from "vue";
import Select from "../../../lib/components/form/select/Select.vue";
import SelectTrigger from "../../../lib/components/form/select/SelectTrigger.vue";
import SelectContent from "../../../lib/components/form/select/SelectContent.vue";
import SelectItem from "../../../lib/components/form/select/SelectItem.vue";

const value = ref("");
</script>

<template>
    <div class="w-full max-w-xs">
        <Select v-model="value">
            <SelectTrigger placeholder="Choose a plan" />
            <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise" disabled>
                    Enterprise (contact sales)
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
