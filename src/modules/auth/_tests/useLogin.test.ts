import { describe, it, expect, beforeAll } from 'vitest';
import bcrypt from 'bcrypt';
import type { IAuthRepository } from '../core/interfaces/IAuthRepository';
import { useLogin } from '../usecases/useLogin';

describe('useLogin', () => {
	const fakePassword = 'password';
	const fakeUser = {
		id: '1',
		passwordHash: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		email: 'test@test.com',
		username: 'test'
	};
	beforeAll(() => {
		fakeUser.passwordHash = bcrypt.hashSync(fakePassword, 10);
	});
	it('should return a token', async () => {
		const repository: IAuthRepository = {
			createUser: () => Promise.resolve(fakeUser),
			signInUser: () => Promise.resolve(fakeUser)
		};

		const result = await useLogin(repository).launch({
			email: fakeUser.email,
			password: fakePassword
		});

		expect(result).toHaveProperty('token');
		expect(result.token).toBeDefined();
		expect(typeof result.token).toBe('string');
		expect(result.token.length).toBeGreaterThan(0);
	});

	it('should throw an error if the email is not found', async () => {
		const repository: IAuthRepository = {
			createUser: () => Promise.resolve(fakeUser),
			signInUser: () => Promise.resolve(null)
		};

		const result = useLogin(repository).launch({ email: fakeUser.email, password: fakePassword });

		await expect(result).rejects.toThrow('User does not exist');
	});

	it('should throw an error if the password is not correct', async () => {
		const repository: IAuthRepository = {
			createUser: () => Promise.resolve(fakeUser),
			signInUser: () => {
				throw new Error();
			}
		};

		const result = useLogin(repository).launch({
			email: fakeUser.email,
			password: 'wrong password'
		});

		await expect(result).rejects.toThrow('Invalid credentials');
	});
});
