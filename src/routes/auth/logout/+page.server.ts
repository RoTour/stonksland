import { COOKEYS } from '$lib/utils/cookies.helper';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	console.log("handleLogout server");
	const url = new URL(event.request.url);
	const actionParam = url.searchParams.get('action');
	console.log({actionParam});
	if (url.searchParams.has('action') && url.searchParams.get('action') === 'logout') {
		console.log("handleLogout server logout");
		event.cookies.delete(COOKEYS.authToken, { path: '/' });
		event.locals.authToken = undefined;
	}
	throw redirect(303, '/auth/login');
}