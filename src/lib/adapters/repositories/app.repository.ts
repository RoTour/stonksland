import type { IAppRepository } from '$lib/core/interfaces/IAppRepository';
import type { PrismaClient } from '@prisma/client';

export const AppRepository = (prisma: PrismaClient): IAppRepository => {
	return {
		getUserData: async (userId) => {
			const transaction = await prisma.$transaction(async () => {
				let user = await prisma.user.findUnique({
					where: { id: userId }
				});
				if (!user) user = await prisma.user.create({ data: { id: userId } });
				return user;
			});
			return transaction;
		}
	};
};
