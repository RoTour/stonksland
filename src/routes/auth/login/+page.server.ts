import { env } from '$env/dynamic/private';
import { AppError, getStatusCodeFromKey } from '$lib/core/interfaces/AppError';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import { COOKEYS } from '$lib/utils/cookies.helper';
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';
import { TRPCClientError } from '@trpc/client';

const login: Action = async (event) => {
	const form = await event.request.formData();
	const email: string = form.get('email') as string;
	const password: string = form.get('password') as string;
	console.log({ env: env.JWT_SECRET, email, password });

	try {
		const { token } = await router.createCaller(await createContext(event)).auth.login({
			email,
			password
		});
		if (!token || token === '') return fail(401, { message: 'Invalid credentials' });
		event.cookies.set(COOKEYS.authToken, token, { path: '/' });
		event.locals.authToken = token;
	} catch (error) {
		if (error instanceof AppError) {
			console.error('APP ERROR');
			return fail(getStatusCodeFromKey(error.code), { message: error.message });
		}
		if (error instanceof TRPCClientError) {
			console.error('TRPC ERROR');
			return fail(error.data.code, { message: error.data.message });
		}
		if (error instanceof Error) {
			console.error('ERROR');
			return fail(500, { message: error.message });
		}
		console.error("NOT APP OR TRPC ERROR", error);
		return fail(401, { message: 'Invalid credentials' });
	}

	throw redirect(303, '/');
};

export const actions: Actions = {
	login
};
