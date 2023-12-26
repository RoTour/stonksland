import { applyAction } from '$app/forms';
import { loadingState } from '$lib/adapters/stores/loading.store';
import type { ActionResult } from '@sveltejs/kit';

export const handleSubmit = async (actions?: { onStart?: () => void; onDone?: () => void }) => {
	loadingState.set(true);
	actions?.onStart?.();
	return async ({ result }: { result: ActionResult }) => {
		await applyAction(result);
		actions?.onDone?.();
		loadingState.set(false);
	};
};