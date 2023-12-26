import type { UseCase } from '$lib/core/interfaces/UseCase';
import type { User } from '@prisma/client';
import type { IAuthRepository } from '../core/interfaces/IAuthRepository';

type RegisterInput = {
	email: string;
	password: string;
	username: string;
};
type RegisterOutput = User | null;

export const useRegister = (
	repository: IAuthRepository
): UseCase<RegisterInput, RegisterOutput> => ({
	launch: async (input: RegisterInput) => {
		try {
			const user = await repository.signInUser(input.email, input.password);
			if (user) return user;
			throw new Error('user not found');
		} catch (error) {
			const newUser = await repository.createUser(input.email, input.password, input.username);
			return newUser;
		}
	}
});
