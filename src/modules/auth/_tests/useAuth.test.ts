import type { User } from '@prisma/client';
import { describe, it, expect, beforeEach } from 'vitest';
import type { IAuthRepository } from '../core/interfaces/IAuthRepository';
import { useRegister } from '../usecases/useRegister';
import { useLogin } from '../usecases/useLogin';

describe('Auth process', () => {
	const fakePassword = 'password';
	const fakeUsername = 'test';
	const fakeEmail = 'test@test.com';

	let fakeUsers: User[] = [];

	const repository: IAuthRepository = {
		createUser: async (email: string, passwordHash: string, username: string) => {
			const newUser = {
				id: '1',
				passwordHash,
				createdAt: new Date(),
				updatedAt: new Date(),
				email,
				username,
			};
			fakeUsers.push(newUser);
			return newUser;
		},
		signInUser: async (email: string) => {
			const user = fakeUsers.find((user) => user.email === email);
			return user || null;
		}
	};

	beforeEach(() => {
		fakeUsers = [];
	})

	it('should be able to login after registering', async () => {
		const registerResult = await useRegister(repository).launch({email: fakeEmail, password: fakePassword, username: fakeUsername});
		const loginResult = await useLogin(repository).launch({email: fakeEmail, password: fakePassword});
	


		expect(registerResult).toBeDefined();
		expect(loginResult).toBeDefined();
		expect(loginResult).toHaveProperty('token');
		expect(loginResult.token).toBeDefined();
	});

})