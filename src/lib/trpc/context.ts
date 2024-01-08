import { env } from '$env/dynamic/private';
import { prisma } from '$lib/db/client';
import { supabase } from '$lib/supabase/client';
import { COOKEYS } from '$lib/utils/cookies.helper';
import type { User } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export async function createContext(event: RequestEvent) {
	const supabaseUser: User | undefined = undefined;
	try {
		const userToken = event.cookies.get(COOKEYS.authToken) ?? event.locals.authToken ?? '';
		const verifiedToken = jwt.verify(userToken, env.JWT_SECRET) as { userId: string };
		return { event, prisma, supabase, userToken, userId: verifiedToken.userId, supabaseUser};
	} catch {
		return { event, prisma, supabase, userToken: '', userId: '', supabaseUser };
	}
}

export type Context = {
	prisma: typeof prisma;
	supabase: typeof supabase;
	event: RequestEvent;
	userToken: string;
	userId: string;
	supabaseUser: User | undefined;
}
