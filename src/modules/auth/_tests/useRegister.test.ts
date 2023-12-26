import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import bcrypt from 'bcrypt';
import type { User } from '@prisma/client';
import { useRegister } from '../usecases/useRegister';
import crypto from 'crypto';
import type { IAuthRepository } from '../core/interfaces/IAuthRepository';

describe('useRegister', () => {
	const fakePassword = 'password';
	const fakeUser = {
		id: '1',
		passwordHash: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		email: 'test@test.com',
		username: 'test'
	};
	let users: User[] = [];
	const repository: IAuthRepository = {
		createUser: async (email: string, passwordHash: string, username: string) => {
			const newUser = {
				id: crypto.randomUUID(),
				passwordHash: '',
				createdAt: new Date(),
				updatedAt: new Date(),
				email,
				username
			};
			users.push(newUser);
			return newUser;
		},
		signInUser: async (email: string) => {
			const user = users.find((user) => user.email === email);
			return user || null;
		}
	};

	beforeAll(() => {
		fakeUser.passwordHash = bcrypt.hashSync(fakePassword, 10);
	});

	beforeEach(() => {
		users = [];
	});

	it('should register a user', async () => {
		const result = await useRegister(repository).launch({
			email: fakeUser.email,
			password: fakePassword,
			username: fakeUser.username
		});

		expect(result).toBeDefined();
		expect(result).toHaveProperty('id');
	});

	it('should throw an error if the email is already taken', async () => {
		users.push(fakeUser);
		const localRepository: IAuthRepository = {
			createUser: async () => {
				throw new Error('This user already exists');
			},
			signInUser: async () => {
				throw new Error();
			}
		};
		const result = useRegister(localRepository).launch({
			email: fakeUser.email,
			password: fakePassword,
			username: fakeUser.username
		});

		await expect(result).rejects.toThrow('This user already exists');
	});
});
