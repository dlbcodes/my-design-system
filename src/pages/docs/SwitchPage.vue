<script setup lang="ts">
import { ref } from "vue";
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import Switch from "../../../lib/components/form/Switch.vue";
import Label from "../../../lib/components/primitives/Label.vue";

const a = ref(true);
const b = ref(false);
const notifications = ref(true);
</script>

<template>
    <DocPage
        name="Switch"
        description="An on/off toggle. Label-less by design — pair it with a Label, or pass ariaLabel when standalone."
    >
        <DocExample title="States" description="On and off.">
            <Switch v-model="a" aria-label="Example on" />
            <Switch v-model="b" aria-label="Example off" />
        </DocExample>

        <DocExample
            title="With a label"
            description="Associate via matching id / for."
        >
            <div class="flex items-center gap-x-3">
                <Switch id="notifications" v-model="notifications" />
                <Label for="notifications">Enable notifications</Label>
            </div>
        </DocExample>

        <DocExample title="Disabled">
            <Switch :model-value="true" disabled aria-label="Disabled on" />
            <Switch :model-value="false" disabled aria-label="Disabled off" />
        </DocExample>

        <DocExample
            title="Keyboard focus"
            description="Tab to it — the focus ring shows for keyboard users only."
        >
            <Switch v-model="a" aria-label="Focusable" />
        </DocExample>
    </DocPage>
</template>
