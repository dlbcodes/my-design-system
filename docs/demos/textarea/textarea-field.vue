<script setup lang="ts">
import { ref } from "vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";
import FieldContent from "../../../lib/components/form/field/FieldContent.vue";
import FieldDescription from "../../../lib/components/form/field/FieldDescription.vue";
import Textarea from "../../../lib/components/form/Textarea.vue";

const bio = ref("");
</script>

<template>
    <Field class="w-full max-w-md">
        <FieldLabel>Bio</FieldLabel>
        <FieldContent>
            <Textarea
                v-model="bio"
                :rows="4"
                placeholder="Tell us about yourself…"
            />
            <FieldDescription>
                A short description for your profile.
            </FieldDescription>
        </FieldContent>
    </Field>
</template>
