<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from "vue";
import DocPage from "../layout/DocPage.vue";
import DocExample from "../layout/DocExample.vue";
import Input from "../../../lib/components/form/Input.vue";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldContent,
} from "../../lib/components/form/field/index.ts";

const email = ref("");
const emailValid = computed(() =>
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value),
);
// Validate once the user has typed something (no @blur dependency).
const emailInvalid = computed(
    () => email.value.length > 0 && !emailValid.value,
);

const standalone = ref("");

const inspectRef = ref<HTMLElement | null>(null);
const attrs = ref<Record<string, string | null>>({});
const readAttrs = (): void => {
    const el = inspectRef.value?.querySelector("input");
    if (!el) return;
    attrs.value = {
        id: el.id || null,
        "aria-invalid": el.getAttribute("aria-invalid"),
        "aria-required": el.getAttribute("aria-required"),
        "aria-describedby": el.getAttribute("aria-describedby"),
        "data-invalid": el.getAttribute("data-invalid"),
    };
};
onMounted(readAttrs);
watch(email, () => nextTick(readAttrs));
</script>

<template>
    <DocPage
        name="Field"
        description="A form-field wrapper. Field provides id / invalid / disabled / required through context; Label, Description, and Error read it to wire htmlFor and aria-* automatically. Controls (Input, Select, …) inject the same context — props always win, and every control still works with no Field around it."
    >
        <DocExample
            title="Basic"
            description="Label's htmlFor and Description's id are generated from the field id — no manual wiring. The control inherits id and aria-describedby by injection."
        >
            <Field class="w-full max-w-sm">
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="you@example.com" />
                <FieldDescription>
                    We'll only use this to send receipts.
                </FieldDescription>
            </Field>
        </DocExample>

        <DocExample
            title="Required"
            description="required adds the asterisk on the Label (via CSS ::after) and sets aria-required on the control through context."
        >
            <Field required class="w-full max-w-sm">
                <FieldLabel>Full name</FieldLabel>
                <Input placeholder="Ada Lovelace" />
            </Field>
        </DocExample>

        <DocExample
            title="Live validation"
            description="Type an invalid email. The inspector shows aria-invalid flip to true, the error id append to aria-describedby, and data-invalid appear — all driven by Field's invalid prop and applied by the control via injection."
        >
            <div ref="inspectRef" class="w-full max-w-sm">
                <Field :invalid="emailInvalid">
                    <FieldLabel>Email</FieldLabel>
                    <Input
                        v-model="email"
                        type="email"
                        placeholder="you@example.com"
                    />
                    <FieldDescription>
                        Enter a valid email address.
                    </FieldDescription>
                    <FieldError v-if="emailInvalid">
                        That doesn't look like a valid email.
                    </FieldError>
                </Field>
            </div>

            <dl
                class="mt-4 w-full max-w-sm space-y-1 rounded-xl border border-border-default bg-bg-base p-3 font-mono text-xs text-text-secondary"
            >
                <div
                    v-for="(value, key) in attrs"
                    :key="key"
                    class="flex justify-between gap-4"
                >
                    <dt class="text-text-tertiary">{{ key }}</dt>
                    <dd class="truncate text-text-primary">
                        {{ value ?? "—" }}
                    </dd>
                </div>
            </dl>
        </DocExample>

        <DocExample
            title="Horizontal"
            description="orientation='horizontal' puts the label beside the control. FieldContent groups the control + messages so the label aligns to the top of the stack."
        >
            <Field orientation="horizontal" class="w-full max-w-md">
                <FieldLabel>Username</FieldLabel>
                <FieldContent>
                    <Input placeholder="ada" />
                    <FieldDescription>Your public handle.</FieldDescription>
                </FieldContent>
            </Field>
        </DocExample>

        <DocExample
            title="Standalone (no Field)"
            description="The same Input with no Field around it. Every field?. injection is null, so it falls back to its own props and works normally — this is the composition contract."
        >
            <Input
                v-model="standalone"
                placeholder="No field context here"
                class="w-full max-w-sm"
            />
        </DocExample>
    </DocPage>
</template>
