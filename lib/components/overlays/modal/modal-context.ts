import { inject, provide, type InjectionKey, type Ref } from "vue";

export interface ModalContext {
	close: () => void;
	labelId: Ref<string | undefined>;
	setLabelId: (id: string | undefined) => void;
	descriptionId: Ref<string | undefined>;
	setDescriptionId: (id: string | undefined) => void;
}

const ModalContextKey: InjectionKey<ModalContext> = Symbol("ModalContext");

export const provideModalContext = (ctx: ModalContext): void =>
	provide(ModalContextKey, ctx);

export const useModalContext = (): ModalContext => {
	const ctx = inject(ModalContextKey, null);
	if (!ctx) throw new Error("Modal parts must be used inside <Modal>.");
	return ctx;
};