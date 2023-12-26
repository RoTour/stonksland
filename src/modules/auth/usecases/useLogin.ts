import { env } from '$env/dynamic/private';
import { AppError } from '$lib/core/interfaces/AppError';
import type { UseCase } from '$lib/core/interfaces/UseCase';
import jwt from 'jsonwebtoken';
import type { IAuthRepository } from '../core/interfaces/IAuthRepository';

type Input = {
	email: string;
	password: string;
};
type Output = {
	token: string;
};

export const useLogin = (repository: IAuthRepository): UseCase<Input, Output> => ({
	launch: async (input) => {
		try {
			const user = await repository.signInUser(input.email, input.password);
			if (!user) {
				throw new AppError('BAD_REQUEST', 'User does not exist')
			}
			const token = jwt.sign({ id: user.id }, env.JWT_SECRET ?? '');
			return {
				token
			};
		} catch (error) {
			console.log("useLogin", {error});
			if (error instanceof AppError) {
				console.log("useLogin is AppError");
				throw new AppError('BAD_REQUEST', error.message);
			}
			console.log("useLogin is not AppError");
			throw new AppError('BAD_REQUEST', 'Invalid credentials');
		}

	}
});
