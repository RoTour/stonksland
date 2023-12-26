import { AppError } from '$lib/core/interfaces/AppError';
import { t } from '$lib/trpc/t';
import { loginDtoSchema, registerDtoSchema } from '../../core/entities/auth.dto';
import { useLogin } from '../../usecases/useLogin';
import { useRegister } from '../../usecases/useRegister';
import { authRepository } from '../repositories/auth.repository';

export const authController = t.router({
	login: t.procedure.input(loginDtoSchema).mutation(async ({ input }) => {
		try {
			const { token } = await useLogin(authRepository()).launch(input);
			return {
				token
			};
		} catch (error) {
			console.log("authController", error);
			if (error instanceof AppError) {
				console.log("authController is AppError");
				throw new AppError('BAD_REQUEST', error.message);
			}
			console.log("authController is not AppError");
			throw new AppError('BAD_REQUEST', 'Invalid credentials');
		}
	}),
	register: t.procedure.input(registerDtoSchema).mutation(async ({ input }) => {
		if (input.password !== input.confirmPassword) {
			throw new AppError('BAD_REQUEST', 'Passwords do not match');
		}
		const user = await useRegister(authRepository()).launch(input);
		return user;
	})
});
