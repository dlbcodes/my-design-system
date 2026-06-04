<script setup lang="ts">
import { ref } from "vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";
import FieldContent from "../../../lib/components/form/field/FieldContent.vue";
import FieldDescription from "../../../lib/components/form/field/FieldDescription.vue";
import FieldError from "../../../lib/components/form/field/FieldError.vue";
import Textarea from "../../../lib/components/primitives/Textarea.vue";

const feedback = ref("Too short");
</script>

<template>
    <Field invalid class="w-full max-w-md">
        <FieldLabel>Feedback</FieldLabel>
        <FieldContent>
            <Textarea
                v-model="feedback"
                :rows="3"
                placeholder="Share your thoughts…"
            />
            <FieldDescription>At least 20 characters.</FieldDescription>
            <FieldError>Your feedback is too short.</FieldError>
        </FieldContent>
    </Field>
</template>
