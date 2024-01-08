import { TRPCError } from '@trpc/server';
import { t } from './t';

const authMiddleware = t.middleware(async ({ ctx, next }) => {
	if (!ctx.userToken) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
	if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
	const { data, error } = await ctx.supabase.auth.getUser();
	if (error || !data.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
	}

	ctx.supabaseUser = data.user;
	return next();
});

export const authProcedure = t.procedure.use(authMiddleware);
