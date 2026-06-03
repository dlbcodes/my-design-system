<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "../../../lib/components/form/Checkbox.vue";
import Label from "../../../lib/components/primitives/Label.vue";

const agreed = ref(false);
</script>

<template>
    <div class="flex items-center gap-2">
        <Checkbox id="cb-invalid" v-model="agreed" invalid />
        <Label for="cb-invalid">You must accept to continue</Label>
    </div>
</template>
