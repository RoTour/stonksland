import { describe, it, expect } from 'vitest';
import type { IStockRepository } from '../core/interfaces/IStockRepository';
import { useGetStockListing } from '../usecases/useGetStockListing';

describe('useGetStockListing', () => {
	it('should handle errors from repository', async () => {
		const repository: IStockRepository = {
			getStockListing: () => {
				throw new Error('Error getting stock listing');
			}
		}
		const result = useGetStockListing(repository).launch();

		expect(result).rejects.toThrow('Error getting stock listing')
	})
});