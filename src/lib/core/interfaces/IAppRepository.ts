import type { User } from '@prisma/client';

export interface IAppRepository {
	getUserData: (userId: string) => Promise<User | null>;
}