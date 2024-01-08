import { AppError } from '$lib/core/interfaces/AppError';
import type { IAppRepository } from '$lib/core/interfaces/IAppRepository';
import type { UseCase } from '$lib/core/interfaces/UseCase';
import type { User } from '@prisma/client';

export const useGetUserData = (repository: IAppRepository): UseCase<string, User> => ({
	launch: async (userId: string) => {
		const user = await repository.getUserData(userId);
		if (!user) throw new AppError('NOT_FOUND', 'User not found');
		return user;
	}
});
