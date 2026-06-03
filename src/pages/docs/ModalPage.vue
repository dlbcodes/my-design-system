<script setup lang="ts">
import { ref } from "vue";
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import Button from "../../../lib/components/primitives/Button.vue";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
    ModalClose,
} from "../../../lib/components/overlays/modal/index.ts";

const basicOpen = ref(false);
const deleteOpen = ref(false);
const largeOpen = ref(false);

// Demonstrates the real pattern: do the work, THEN close.
// Note close() comes from the slot, not the ref — the modal owns its own dismissal.
const handleDelete = (close: () => void): void => {
    // …real delete call would go here…
    close();
};
</script>

<template>
    <DocPage
        name="Modal"
        description="A focus-trapped, scroll-locking dialog. Controlled with v-model. Compose ModalHeader / ModalTitle / ModalContent / ModalFooter / ModalClose inside it; the default slot also exposes a `close` for custom footer actions."
    >
        <DocExample
            title="Basic"
            description="Title labels the dialog (aria-labelledby), ModalClose sits in the header, the default slot's `close` drives the footer buttons."
        >
            <Button @click="basicOpen = true">Open modal</Button>
            <Modal v-model="basicOpen" v-slot="{ close }" size="xl">
                <ModalHeader>
                    <ModalTitle>Edit profile</ModalTitle>
                    <ModalDescription>
                        Update your account details. Changes save immediately.
                    </ModalDescription>
                    <ModalClose />
                </ModalHeader>
                <ModalContent>
                    Make changes to your profile here. Clicking the backdrop or
                    pressing Escape closes it.
                </ModalContent>
                <ModalFooter>
                    <Button @click="close" variant="secondary">Cancel</Button>
                    <Button @click="close">Save</Button>
                </ModalFooter>
            </Modal>
        </DocExample>

        <DocExample
            title="Destructive confirm"
            description="A delete flow: persistent (no backdrop/Escape escape hatch) and no ModalClose, so the user must consciously choose Cancel or Delete. The destructive action lives in the footer."
        >
            <Button @click="deleteOpen = true">Delete project…</Button>
            <Modal v-model="deleteOpen" size="xl" persistent v-slot="{ close }">
                <ModalHeader>
                    <ModalTitle>Delete project?</ModalTitle>
                </ModalHeader>
                <ModalContent>
                    This permanently deletes
                    <span class="font-medium text-text-primary">
                        "Your project"
                    </span>
                    and all of its data. This action cannot be undone.
                </ModalContent>
                <ModalFooter>
                    <Button @click="close" variant="secondary">Cancel</Button>
                    <!-- if Button has no destructive variant yet, this is the gap to fill -->
                    <Button variant="destructive" @click="handleDelete(close)">
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        </DocExample>

        <DocExample
            title="Size"
            description="size scales the max-width (sm–5xl, full)."
        >
            <Button @click="largeOpen = true">Open large</Button>
            <Modal v-model="largeOpen" size="2xl">
                <ModalHeader>
                    <ModalTitle>Wide dialog</ModalTitle>
                    <ModalClose />
                </ModalHeader>
                <ModalContent>
                    A roomier modal at the 2xl breakpoint.
                </ModalContent>
            </Modal>
        </DocExample>
    </DocPage>
</template>
