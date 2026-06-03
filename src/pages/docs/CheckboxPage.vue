<script setup lang="ts">
import { ref } from "vue";
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import Checkbox from "../../../lib/components/form/Checkbox.vue";
import Label from "../../../lib/components/primitives/Label.vue";

const a = ref(true);
const b = ref(false);
const terms = ref(false);
const visualOn = ref(true);
</script>

<template>
    <DocPage
        name="Checkbox"
        description="A bare checkbox — pair it with a Label. Use visual mode for an indicator inside another control."
    >
        <DocExample title="States" description="Checked and unchecked.">
            <Checkbox v-model="a" aria-label="Checked example" />
            <Checkbox v-model="b" aria-label="Unchecked example" />
        </DocExample>

        <DocExample title="With a label" description="Associate via id / for.">
            <div class="flex items-center gap-x-2">
                <Checkbox id="terms" v-model="terms" />
                <Label for="terms">I agree to the terms</Label>
            </div>
        </DocExample>

        <DocExample title="Disabled">
            <Checkbox
                :model-value="true"
                disabled
                aria-label="Disabled checked"
            />
            <Checkbox
                :model-value="false"
                disabled
                aria-label="Disabled unchecked"
            />
        </DocExample>

        <DocExample
            title="Invalid"
            description="Error styling via the invalid prop."
        >
            <Checkbox
                :model-value="false"
                invalid
                aria-label="Invalid checkbox"
            />
        </DocExample>

        <DocExample
            title="Visual mode"
            description="Box only — for use inside another interactive element. Driven by model-value."
        >
            <Checkbox :model-value="visualOn" visual />
            <Checkbox :model-value="false" visual />
        </DocExample>
    </DocPage>
</template>
