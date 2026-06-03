<script setup lang="ts">
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import Kbd from "../../../lib/components/primitives/Kbd.vue";
import KbdGroup from "../../../lib/components/primitives/KbdGroup.vue";
</script>

<template>
    <DocPage
        name="Kbd"
        description="A keyboard key hint. Uses the semantic <kbd> element, so it needs no extra ARIA. Group keys with KbdGroup."
    >
        <DocExample title="Single keys">
            <Kbd>K</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Enter</Kbd>
        </DocExample>

        <DocExample title="Symbols">
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>⌃</Kbd>
        </DocExample>

        <DocExample
            title="KbdGroup"
            description="Lays out a multi-key combo with consistent spacing. Pass aria-label for symbol combos so screen readers announce them clearly."
        >
            <KbdGroup aria-label="Command K">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
            </KbdGroup>
            <KbdGroup aria-label="Shift Enter">
                <Kbd>⇧</Kbd>
                <Kbd>Enter</Kbd>
            </KbdGroup>
        </DocExample>

        <DocExample title="In context" description="Inline within text.">
            <p class="text-sm text-text-secondary">
                Press
                <KbdGroup aria-label="Command K">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </KbdGroup>
                to open the command menu, or <Kbd>Esc</Kbd> to close.
            </p>
        </DocExample>
    </DocPage>
</template>
