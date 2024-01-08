import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import { COOKEYS } from '$lib/utils/cookies.helper';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';

export const handleToken: Handle = async ({ resolve, event }) => {
	const token = event.locals.authToken;
	if (token) event.cookies.set(COOKEYS.authToken, token, { path: '/' });
	return resolve(event);
};

const handleCors: Handle = async ({ event, resolve }) => {
	if (event.request.method !== 'OPTIONS') return await resolve(event);
	return new Response(new Blob(), { status: 200 });
};

const handleAuthPages: Handle = async ({ event, resolve }) => {
	const url = new URL(event.request.url);
	if (url.pathname.startsWith('/auth')) {
		console.log('auth page');
		return await resolve(event);
	} else {
		console.log('not auth page', );
	}
	if (event.cookies.get(COOKEYS.authToken)) return await resolve(event);
	return new Response(new Blob(), { status: 302, headers: { location: '/auth/login' } });
};

export const handle = sequence(
	handleCors,
	handleToken,
	handleAuthPages,
	createTRPCHandle({ router, createContext })
);
