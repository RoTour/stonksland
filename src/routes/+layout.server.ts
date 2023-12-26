import { env } from '$env/dynamic/private';
import { COOKEYS } from '$lib/utils/cookies.helper';
import type { LayoutServerLoad } from './$types';
import jwt from 'jsonwebtoken';


export const load: LayoutServerLoad = async (event) => {
	let user = null;
	try {
		user = jwt.verify(event.cookies.get(COOKEYS.authToken) || '', env.JWT_SECRET);
	} catch (error) {
		user = ""
	}

	return {
		user
	}
}