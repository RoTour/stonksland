import { authProcedure } from '$lib/trpc/auth.procedure';
import { t } from '$lib/trpc/t';
import { useGetUserData } from '$lib/usecases/useGetUserData.usecase';
import { AppRepository } from '../repositories/App.repository';

export const appController = t.router({
	getUserData: authProcedure.mutation(async ({ ctx }) => {
		const repository = AppRepository(ctx.prisma);
		return useGetUserData(repository).launch(ctx.userId);
	})
});
