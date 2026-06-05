<script setup lang="ts">
import { ref } from "vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";
import FieldContent from "../../../lib/components/form/field/FieldContent.vue";
import FieldDescription from "../../../lib/components/form/field/FieldDescription.vue";
import Select from "../../../lib/components/form/select/Select.vue";
import SelectTrigger from "../../../lib/components/form/select/SelectTrigger.vue";
import SelectContent from "../../../lib/components/form/select/SelectContent.vue";
import SelectItem from "../../../lib/components/form/select/SelectItem.vue";

const role = ref("");
</script>

<template>
    <Field class="w-full max-w-xs">
        <FieldLabel>Role</FieldLabel>
        <FieldContent>
            <Select v-model="role">
                <SelectTrigger placeholder="Assign a role" />
                <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
            </Select>
            <FieldDescription
                >Controls what this member can do.</FieldDescription
            >
        </FieldContent>
    </Field>
</template>
