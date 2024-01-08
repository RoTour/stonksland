import { AppError } from '$lib/core/interfaces/AppError';
import type { UseCase } from '$lib/core/interfaces/UseCase';
import type { Stock } from '@prisma/client';
import type { IStockRepository } from '../core/interfaces/IStockRepository';

type Output = Stock[]

export const useGetStockListing = (repository: IStockRepository): UseCase<void, Output> => ({
	launch: async () => {
		try {
			return repository.getStockListing();
		} catch (error) {
			console.error(error);
			throw new AppError('BAD_REQUEST', 'Error getting stock listing')
		}
	}
});
