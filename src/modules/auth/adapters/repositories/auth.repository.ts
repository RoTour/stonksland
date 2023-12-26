import { supabase } from '$lib/supabase/client';
import { AuthError } from '@supabase/supabase-js';
import type { IAuthRepository } from '../../core/interfaces/IAuthRepository';
import { AppError } from '$lib/core/interfaces/AppError';

export const authRepository = (): IAuthRepository => ({
	signInUser: async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({ 
			email,
			password,
		 });
		if (error) {
			throw new AppError('BAD_REQUEST', error.message);
		}
		if (!data || !data.user) {
			throw new AppError('BAD_REQUEST', 'No data');
		}
		return {
			...data.user,
			email: data.user.email ?? '',
			createdAt: new Date(data.user.created_at),
			updatedAt: new Date(data.user.updated_at ?? data.user.created_at),
			passwordHash: "",
			username: data.user.user_metadata?.username ?? '',
		}
	},
	createUser: async (email: string, passwordHash: string, username: string) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: email,
				password: passwordHash,
				options: {
					emailRedirectTo: 'https//investors.rotour.dev',
					data: {
						username
					}
				}
			});
			if (error) {
				throw new Error(error.message);
			}
			if (!data || !data.user) {
				throw new Error('No data');
			}
			return {
				...data.user,
				email: data.user.email ?? '',
				createdAt: new Date(data.user.created_at),
				updatedAt: new Date(data.user.updated_at ?? data.user.created_at),
				passwordHash: "",
				username,
			}
		} catch (error) {
			if (error instanceof AuthError) {
				throw new Error(error.message);
			}
			throw error;
		}
	}
});
