<script setup lang="ts">
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import Spinner from "../../../lib/components/primitives/Spinner.vue";
</script>

<template>
    <DocPage name="Spinner" description="An accessible loading indicator.">
        <DocExample title="Default">
            <Spinner />
        </DocExample>

        <DocExample title="Sizes" description="Size via the class prop.">
            <Spinner class="size-4" />
            <Spinner class="size-6" />
            <Spinner class="size-10" />
        </DocExample>

        <DocExample
            title="Color"
            description="Inherits currentColor — set via text-* classes."
        >
            <Spinner class="text-text-primary" />
            <Spinner class="text-accent-100" />
            <Spinner class="text-danger-100" />
        </DocExample>

        <DocExample
            title="Accessible label"
            description="The label prop sets the screen-reader text (default 'Loading')."
        >
            <Spinner label="Saving changes" />
        </DocExample>
    </DocPage>
</template>
