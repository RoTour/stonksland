import { AppError, getStatusCodeFromKey } from '$lib/core/interfaces/AppError';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { User } from '@prisma/client';
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';
import { TRPCClientError } from '@trpc/client';

const register: Action = async (event) => {
	const form = await event.request.formData();
	const email = form.get('email') as string;
	const password = form.get('password') as string;
	const username = form.get('username') as string;
	const confirmPassword = form.get('confirmPassword') as string;

	let user: User | null = null;
	try {
		user = await router.createCaller(await createContext(event)).auth.register({
			email,
			password,
			username,
			confirmPassword
		});
		console.log(user);
		if (!user) throw new Error('User not created');
	} catch (error) {
		if (error instanceof TRPCClientError) {
			console.error('TRPC ERROR');
			return fail(error.data.code, { message: error.data.message });
		}
		if (error instanceof AppError) {
			console.error('APP ERROR');
			return fail(getStatusCodeFromKey(error.code), { message: error.message });
		}
		console.error('NOT TRPC ERROR', error);
		return fail(500, { message: 'Internal server error' });
	}

	throw redirect(303, '/');
};

export const actions: Actions = {
	register
};
