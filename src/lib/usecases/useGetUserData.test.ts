import { describe, expect, it } from 'vitest';

describe('getUserData', () => {
	it("should throw if user doesn't exist", async () => {
		const repository = {
			getUserData: async () => null
		};
		const { useGetUserData: getUserData } = await import('./useGetUserData.usecase');
		const usecase = getUserData(repository);

		const result = usecase.launch('userId');

		expect(result).rejects.toThrowError('User not found');
		expect(result).rejects.toHaveProperty('code', 'NOT_FOUND');
	})
});